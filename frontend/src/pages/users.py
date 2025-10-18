from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models import User, Post
from app.schemas import PostResponse
from app.utils import get_posts_with_details # Импортируем из нового файла utils

router = APIRouter()

@router.get("/{user_id}/posts", response_model=List[PostResponse])
def get_user_posts(user_id: int, db: Session = Depends(get_db)):
    """
    Get all posts for a specific user.
    """
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    posts = db.query(Post).filter(Post.author_id == user_id).order_by(Post.created_at.desc()).all()
    
    # Используем общую логику для обогащения данных поста
    return get_posts_with_details(posts, db, current_user=None)