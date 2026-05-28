import sqlite3


# Database file location
DATABASE_PATH = "app/data/decoda.db"


def get_db_connection():
    print("SQLite DB path:", DATABASE_PATH)

    # Create connection to SQLite database
    connection = sqlite3.connect(DATABASE_PATH)

    # Return rows like dictionaries instead of tuples
    connection.row_factory = sqlite3.Row

    return connection


def create_documents_table():
    print("create_documents_table called")

    # Open database connection
    connection = get_db_connection()

    # Create cursor object
    cursor = connection.cursor()

    # Create documents table if it does not exist
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS documents (
            document_id TEXT PRIMARY KEY,
            filename TEXT NOT NULL,
            uploaded_at TEXT NOT NULL,
            chunk_count INTEGER NOT NULL,
            file_size INTEGER NOT NULL
        )
    """)

    # Save changes
    connection.commit()

    # Close connection
    connection.close()


def insert_document(
    document_id,
    filename,
    uploaded_at,
    chunk_count,
    file_size
):
    # Open database connection
    connection = get_db_connection()

    # Create cursor object
    cursor = connection.cursor()

    # Insert document metadata into table
    cursor.execute("""
        INSERT INTO documents (
            document_id,
            filename,
            uploaded_at,
            chunk_count,
            file_size
        )
        VALUES (?, ?, ?, ?, ?)
    """, (
        document_id,
        filename,
        uploaded_at,
        chunk_count,
        file_size
    ))

    # Save changes
    connection.commit()

    # Close connection
    connection.close()


def get_all_documents():
    # Open database connection
    connection = get_db_connection()

    # Create cursor object
    cursor = connection.cursor()

    # Fetch all document rows
    cursor.execute("""
        SELECT *
        FROM documents
        ORDER BY uploaded_at DESC
    """)

    # Convert rows into dictionaries
    documents = [
        dict(row)
        for row in cursor.fetchall()
    ]

    # Close connection
    connection.close()

    return documents

def delete_document(document_id):
    # Open database connection
    connection = get_db_connection()

    # Create cursor object
    cursor = connection.cursor()

    # Delete document metadata
    cursor.execute("""
        DELETE FROM documents
        WHERE document_id = ?
    """, (document_id,))

    # Save changes
    connection.commit()

    # Close connection
    connection.close()