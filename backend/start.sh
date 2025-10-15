#!/bin/bash

echo "Database is ready, starting application..."

# Initialize database tables
python init_db.py

# Start the application
uvicorn app.main:app --host 0.0.0.0 --port 8000
