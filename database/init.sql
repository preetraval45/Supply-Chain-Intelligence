-- Global Supply Chain Intelligence Network Database Schema
-- PostgreSQL initialization script

-- Enable PostGIS for geographic data (if available)
-- CREATE EXTENSION IF NOT EXISTS postgis;  -- Commented out - not needed for JSON-based locations

-- Supply chain routes table
CREATE TABLE IF NOT EXISTS routes (
    id SERIAL PRIMARY KEY,
    origin_port VARCHAR(100) NOT NULL,
    destination_port VARCHAR(100) NOT NULL,
    current_status VARCHAR(50) DEFAULT 'normal',
    estimated_delay_hours INT DEFAULT 0,
    risk_score DECIMAL(3,2) DEFAULT 0.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on status for faster queries
CREATE INDEX idx_routes_status ON routes(current_status);
CREATE INDEX idx_routes_risk ON routes(risk_score DESC);

-- Disruption predictions table
CREATE TABLE IF NOT EXISTS predictions (
    id SERIAL PRIMARY KEY,
    prediction_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    disruption_type VARCHAR(100) NOT NULL,
    location JSON NOT NULL,  -- Store {lng, lat, name}
    severity VARCHAR(20) NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
    confidence_score DECIMAL(3,2) NOT NULL CHECK (confidence_score >= 0 AND confidence_score <= 1),
    affected_routes INT DEFAULT 0,
    description TEXT,
    actual_outcome VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX idx_predictions_time ON predictions(prediction_time DESC);
CREATE INDEX idx_predictions_severity ON predictions(severity);
CREATE INDEX idx_predictions_confidence ON predictions(confidence_score DESC);

-- IoT sensor readings table (time-series data)
CREATE TABLE IF NOT EXISTS sensor_readings (
    id SERIAL PRIMARY KEY,
    sensor_id VARCHAR(50) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    location JSON NOT NULL,  -- Store {lng, lat}
    temperature DECIMAL(5,2),
    delay_minutes INT,
    sensor_metadata JSON,  -- Additional sensor data
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for time-series queries
CREATE INDEX idx_sensor_readings_sensor ON sensor_readings(sensor_id);
CREATE INDEX idx_sensor_readings_time ON sensor_readings(timestamp DESC);

-- Agent activity log table
CREATE TABLE IF NOT EXISTS agent_activity (
    id SERIAL PRIMARY KEY,
    agent_name VARCHAR(50) NOT NULL,
    activity_type VARCHAR(50) NOT NULL,
    description TEXT,
    metadata JSON,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_agent_activity_agent ON agent_activity(agent_name);
CREATE INDEX idx_agent_activity_time ON agent_activity(timestamp DESC);

-- Insert sample data for demonstration
INSERT INTO routes (origin_port, destination_port, current_status, estimated_delay_hours, risk_score) VALUES
('Shanghai', 'Los Angeles', 'normal', 0, 0.15),
('Rotterdam', 'New York', 'warning', 12, 0.67),
('Singapore', 'Dubai', 'normal', 0, 0.22),
('Hong Kong', 'Vancouver', 'normal', 4, 0.35),
('Antwerp', 'Miami', 'critical', 48, 0.92);

INSERT INTO predictions (disruption_type, location, severity, confidence_score, affected_routes, description) VALUES
('Port Congestion', '{"lng": 121.47, "lat": 31.23, "name": "Shanghai"}', 'high', 0.87, 12, 'High congestion detected at Shanghai port'),
('Severe Weather', '{"lng": 4.47, "lat": 51.92, "name": "Rotterdam"}', 'critical', 0.94, 8, 'Storm system approaching Rotterdam'),
('Infrastructure Failure', '{"lng": 103.85, "lat": 1.29, "name": "Singapore"}', 'medium', 0.78, 5, 'Port equipment maintenance required');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for routes table
CREATE TRIGGER update_routes_updated_at BEFORE UPDATE ON routes
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions (adjust as needed for your setup)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_user;
