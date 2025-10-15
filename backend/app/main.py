from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import Optional
import os

from app.database import get_db
from app.models import User, Post, Like, Comment
from app.schemas import UserCreate, UserLogin, PostCreate, PostResponse, UserResponse
from app.routes import auth, posts

app = FastAPI(title="AIverse API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(posts.router, prefix="/api/posts", tags=["posts"])

@app.get("/")
async def root():
    return {"message": "AIverse API is running!"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.utcnow()}
