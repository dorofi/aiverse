from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from typing import List, Optional
import os
import shutil
from datetime import datetime
from PIL import Image
import io

from app.models import User, Post, Like, Comment
from app.schemas import PostCreate, PostResponse, CommentCreate, CommentResponse 
from app.database import get_db
from app.routes.auth import get_current_user, get_current_user_optional
from app.utils import get_posts_with_details

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.get("/", response_model=List[PostResponse])
def get_posts(
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    posts = db.query(Post).order_by(Post.created_at.desc()).offset(skip).limit(limit).all()
    
    posts_with_details = get_posts_with_details(posts, db, current_user)
    return [PostResponse(**p) for p in posts_with_details]

@router.post("/", response_model=PostResponse)
def create_post(
    post: PostCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    db_post = Post(
        title=post.title,
        content=post.content,
        image_url=post.image_url,
        video_url=post.video_url,
        author_id=current_user.id
    )
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    
    # Return with author info
    post_dict = {
        "id": db_post.id,
        "title": db_post.title,
        "content": db_post.content,
        "image_url": db_post.image_url,
        "video_url": db_post.video_url,
        "author_id": db_post.author_id,
        "created_at": db_post.created_at,
        "updated_at": db_post.updated_at,
        "author": db_post.author,
        "likes_count": 0,
        "comments_count": 0,
        "is_liked": False
    }
    return PostResponse(**post_dict)

@router.get("/{post_id}", response_model=PostResponse)
def get_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: Optional[User] = Depends(get_current_user_optional)
):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    post_with_details = get_posts_with_details([post], db, current_user)[0]
    return PostResponse(**post_with_details)

@router.post("/{post_id}/like")
def toggle_like(
    post_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    # Check if already liked
    existing_like = db.query(Like).filter(
        Like.post_id == post_id,
        Like.user_id == current_user.id
    ).first()
    
    if existing_like:
        # Unlike
        db.delete(existing_like)
        db.commit()
        return {"message": "Post unliked", "liked": False}
    else:
        # Like
        new_like = Like(post_id=post_id, user_id=current_user.id)
        db.add(new_like)
        db.commit()
        return {"message": "Post liked", "liked": True}

@router.post("/{post_id}/comments", response_model=CommentResponse)
def create_comment(
    post_id: int,
    comment: CommentCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    db_comment = Comment(
        content=comment.content,
        post_id=post_id,
        user_id=current_user.id
    )
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    
    return db_comment

@router.get("/{post_id}/comments", response_model=List[CommentResponse])
def get_comments(post_id: int, db: Session = Depends(get_db)):
    comments = db.query(Comment).filter(Comment.post_id == post_id).all()
    return comments

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")
    
    # Check if file is an image
    if not file.content_type or not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="Only image files are allowed")
    
    # Generate unique filename with safe characters only
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    file_extension = os.path.splitext(file.filename)[1] if '.' in file.filename else '.jpg'
    safe_filename = f"{timestamp}_upload{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, safe_filename)
    
    try:
        # Read file content
        file_content = await file.read()
        
        # Process image with PIL
        image = Image.open(io.BytesIO(file_content))
        
        # Convert to RGB if necessary (for JPEG)
        if image.mode in ('RGBA', 'LA', 'P'):
            image = image.convert('RGB')
        
        # Instagram-like square crop (1:1 aspect ratio)
        width, height = image.size
        
        # Determine the size for square crop
        size = min(width, height)
        
        # Calculate crop coordinates for center crop
        left = (width - size) // 2
        top = (height - size) // 2
        right = left + size
        bottom = top + size
        
        # Crop to square
        cropped_image = image.crop((left, top, right, bottom))
        
        # Resize to standard Instagram size (1080x1080 for high quality)
        final_size = 1080
        resized_image = cropped_image.resize((final_size, final_size), Image.Resampling.LANCZOS)
        
        # Save processed image
        resized_image.save(file_path, 'JPEG', quality=85, optimize=True)
        
        return {"filename": safe_filename, "url": f"/uploads/{safe_filename}"}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")
