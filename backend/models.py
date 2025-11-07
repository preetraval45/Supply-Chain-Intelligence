"""
SQLAlchemy models for database tables
"""

from sqlalchemy import Column, Integer, String, Float, DateTime, ARRAY, JSON
from sqlalchemy.sql import func
from database import Base

class Route(Base):
    """Supply chain routes table"""
    __tablename__ = "routes"

    id = Column(Integer, primary_key=True, index=True)
    origin_port = Column(String(100), nullable=False)
    destination_port = Column(String(100), nullable=False)
    current_status = Column(String(50), default="normal")
    estimated_delay_hours = Column(Integer, default=0)
    risk_score = Column(Float, default=0.0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Disruption(Base):
    """Disruption predictions table"""
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    prediction_time = Column(DateTime(timezone=True), server_default=func.now())
    disruption_type = Column(String(100), nullable=False)
    location = Column(JSON, nullable=False)  # Store [lng, lat] as JSON
    severity = Column(String(20), nullable=False)
    confidence_score = Column(Float, nullable=False)
    affected_routes = Column(Integer, default=0)
    description = Column(String(500))
    actual_outcome = Column(String(50))  # For tracking accuracy

class SensorReading(Base):
    """IoT sensor readings table (time-series data)"""
    __tablename__ = "sensor_readings"

    id = Column(Integer, primary_key=True, index=True)
    sensor_id = Column(String(50), nullable=False, index=True)
    timestamp = Column(DateTime(timezone=True), server_default=func.now(), index=True)
    location = Column(JSON, nullable=False)  # Store [lng, lat] as JSON
    temperature = Column(Float)
    delay_minutes = Column(Integer)
    sensor_metadata = Column(JSON)  # Additional sensor data (renamed from 'metadata' to avoid SQLAlchemy conflict)
