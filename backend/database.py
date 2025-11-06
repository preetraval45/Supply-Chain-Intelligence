"""
Database configuration and session management
PostgreSQL with async support using SQLAlchemy
"""

import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from sqlalchemy.pool import NullPool

# Database configuration
DATABASE_USER = os.getenv("POSTGRES_USER", "postgres")
DATABASE_PASSWORD = os.getenv("POSTGRES_PASSWORD", "postgres")
DATABASE_HOST = os.getenv("POSTGRES_HOST", "localhost")
DATABASE_PORT = os.getenv("POSTGRES_PORT", "5432")
DATABASE_NAME = os.getenv("POSTGRES_DB", "supply_chain")

# Create async database URL
DATABASE_URL = f"postgresql+asyncpg://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST}:{DATABASE_PORT}/{DATABASE_NAME}"

# Create async engine
engine = create_async_engine(
    DATABASE_URL,
    poolclass=NullPool,  # Use NullPool for Cloud Run (no connection pooling)
    echo=True,  # Log SQL queries (disable in production)
)

# Create async session factory
async_session_maker = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

# Create declarative base for models
Base = declarative_base()

async def get_db():
    """Dependency for getting database sessions"""
    async with async_session_maker() as session:
        try:
            yield session
        finally:
            await session.close()
