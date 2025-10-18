from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, HTTPException
from typing import List

from app.models import User, Post
from app.schemas import UserResponse, PostResponse
from app.database import get_db
from app.routes.auth import get_current_user

router = APIRouter()

@router.get("/me", response_model=UserResponse)
def get_current_user_info(current_user: User = Depends(get_current_user)):
    """Get current user information"""
    return current_user

@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    """Get user by ID"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.get("/{user_id}/posts", response_model=List[PostResponse])
def get_user_posts(user_id: int, db: Session = Depends(get_db)):
    """Get posts by user ID"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    posts = db.query(Post).filter(Post.author_id == user_id).order_by(Post.created_at.desc()).all()
    
    # Use the utility function to enrich posts with details
    from app.utils import get_posts_with_details
    posts_with_details = get_posts_with_details(posts, db, None)
    return [PostResponse(**p) for p in posts_with_details]
