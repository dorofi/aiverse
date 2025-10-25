#!/bin/bash

echo "Starting application..."
echo "DATABASE_URL: ${DATABASE_URL:0:50}..." # Show first 50 chars for debugging

# Initialize database tables
echo "Initializing database tables..."
python init_db.py

if [ $? -eq 0 ]; then
    echo "Database initialized successfully!"
else
    echo "Warning: Database initialization failed, but continuing..."
fi

echo "Starting FastAPI server..."

# Start the application
uvicorn app.main:app --host 0.0.0.0 --port 8000
