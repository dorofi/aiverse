#!/bin/bash

# Wait for database to be ready
echo "Waiting for database..."
while ! pg_isready -h postgres -p 5432 -U aiverse_user; do
  sleep 1
done

echo "Database is ready!"

# Initialize database tables
python init_db.py

# Start the application
uvicorn app.main:app --host 0.0.0.0 --port 8000
