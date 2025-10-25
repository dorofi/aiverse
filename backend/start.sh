#!/bin/bash

echo "Starting application..."

# Wait for database to be ready
until python -c "import psycopg2; psycopg2.connect('${DATABASE_URL}')" 2>/dev/null; do
  echo "Waiting for database..."
  sleep 2
done

echo "Database is ready, initializing tables..."

# Initialize database tables
python init_db.py

echo "Starting FastAPI server..."

# Start the application
uvicorn app.main:app --host 0.0.0.0 --port 8000
