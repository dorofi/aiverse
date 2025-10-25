from app.database import create_tables
import sys
import traceback

if __name__ == "__main__":
    try:
        create_tables()
        print("Database tables created successfully!")
    except Exception as e:
        print(f"Error creating tables: {e}")
        traceback.print_exc()
        # Don't exit - let the app start anyway
        print("Continuing despite database error...")
