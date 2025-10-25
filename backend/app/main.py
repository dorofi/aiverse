from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.database import create_tables
from app.routes import auth, posts, users

# Создаем таблицы при запуске, если их нет
create_tables()

app = FastAPI(
    title="AIverse API",
    description="API для социальной сети AI-генерируемого контента",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost",
        "http://localhost:3000",
        "http://127.0.0.1",
        "http://127.0.0.1:3000",
        "http://frontend:3000",  # Docker service name
        "http://nginx:80",       # Docker service name
        "http://172.20.10.8",    # Your local network IP
        "http://172.20.10.8:3000",
        "http://172.20.10.8:80",
        "https://aiverse-1-yz9e.onrender.com",  # Render production URL
        "http://aiverse-1-yz9e.onrender.com",   # Render production URL (HTTP)
        "https://aiverse-frontend.onrender.com",  # Render frontend URL
        "http://aiverse-frontend.onrender.com",   # Render frontend URL (HTTP)
    ],
    allow_origin_regex=r"(http://172\.\d+\.\d+\.\d+(:\d+)?|https?://.*\.onrender\.com)",  # Lightweight pattern matching - allows any Render domain
    allow_credentials=True,
    allow_methods=["*"],  # Разрешает все методы (GET, POST, и т.д.)
    allow_headers=["*"],  # Разрешает все заголовки
)

# Include routers
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(posts.router, prefix="/api/posts", tags=["Posts"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])

# Mount static files for uploads
if os.path.exists("uploads"):
    app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Health check endpoint
@app.get("/")
def read_root():
    return {"message": "AIverse API is running!"}

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "message": "API is working correctly"}
