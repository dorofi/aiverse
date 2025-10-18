from typing import List, Optional
from sqlalchemy.orm import Session

from app.models import Post, Like, Comment, User

def get_posts_with_details(posts: List[Post], db: Session, current_user: Optional[User] = None) -> List[dict]:
    """Helper function to enrich post data with likes, comments, etc."""
    result = []
    for post in posts:
        likes_count = db.query(Like).filter(Like.post_id == post.id).count()
        comments_count = db.query(Comment).filter(Comment.post_id == post.id).count()
        is_liked = False
        if current_user:
            is_liked = db.query(Like).filter(Like.post_id == post.id, Like.user_id == current_user.id).first() is not None
        
        post_dict = {
            "id": post.id,
            "title": post.title,
            "content": post.content,
            "image_url": post.image_url,
            "video_url": post.video_url,
            "author_id": post.author_id,
            "created_at": post.created_at,
            "updated_at": post.updated_at,
            "author": post.author,
            "likes_count": likes_count,
            "comments_count": comments_count,
            "is_liked": is_liked
        }
        result.append(post_dict)
    return result