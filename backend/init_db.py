from app.database import create_tables
import sys

if __name__ == "__main__":
    try:
        create_tables()
        print("Database tables created successfully!")
    except Exception as e:
        print(f"Error creating tables: {e}")
        sys.exit(1)
