-- Comprehensive Seed Data for Supply Chain Intelligence Network
-- This populates the database with realistic supply chain data

-- Clear existing data
TRUNCATE TABLE routes, predictions, sensor_readings, agent_activity RESTART IDENTITY CASCADE;

-- ============================================================================
-- ROUTES DATA (50 major global supply chain routes)
-- ============================================================================

INSERT INTO routes (origin_port, destination_port, current_status, estimated_delay_hours, risk_score) VALUES
-- Asia to North America
('Shanghai, China', 'Los Angeles, USA', 'normal', 0, 0.15),
('Shanghai, China', 'Long Beach, USA', 'normal', 2, 0.22),
('Shenzhen, China', 'Seattle, USA', 'warning', 8, 0.58),
('Hong Kong, China', 'Vancouver, Canada', 'normal', 4, 0.35),
('Busan, South Korea', 'Los Angeles, USA', 'normal', 0, 0.18),
('Tokyo, Japan', 'San Francisco, USA', 'normal', 0, 0.12),
('Singapore', 'Oakland, USA', 'normal', 0, 0.20),

-- Asia to Europe
('Shanghai, China', 'Rotterdam, Netherlands', 'critical', 36, 0.89),
('Hong Kong, China', 'Hamburg, Germany', 'warning', 18, 0.67),
('Singapore', 'Antwerp, Belgium', 'normal', 6, 0.42),
('Busan, South Korea', 'Felixstowe, UK', 'normal', 0, 0.25),
('Port Klang, Malaysia', 'Rotterdam, Netherlands', 'normal', 0, 0.19),
('Mumbai, India', 'Marseille, France', 'warning', 12, 0.55),

-- Europe to North America
('Rotterdam, Netherlands', 'New York, USA', 'warning', 12, 0.67),
('Hamburg, Germany', 'Norfolk, USA', 'normal', 4, 0.38),
('Antwerp, Belgium', 'Miami, USA', 'critical', 48, 0.92),
('Felixstowe, UK', 'Savannah, USA', 'normal', 0, 0.21),
('Le Havre, France', 'Charleston, USA', 'normal', 0, 0.17),
('Barcelona, Spain', 'Houston, USA', 'normal', 2, 0.29),

-- Middle East Routes
('Dubai, UAE', 'New York, USA', 'normal', 0, 0.24),
('Jebel Ali, UAE', 'Los Angeles, USA', 'normal', 0, 0.19),
('Singapore', 'Dubai, UAE', 'normal', 0, 0.22),
('Mumbai, India', 'Dubai, UAE', 'normal', 0, 0.16),

-- South America Routes
('Santos, Brazil', 'Rotterdam, Netherlands', 'normal', 0, 0.27),
('Buenos Aires, Argentina', 'Hamburg, Germany', 'normal', 2, 0.31),
('Callao, Peru', 'Los Angeles, USA', 'warning', 10, 0.52),
('Cartagena, Colombia', 'Miami, USA', 'normal', 0, 0.18),

-- Africa Routes
('Durban, South Africa', 'Rotterdam, Netherlands', 'normal', 4, 0.36),
('Lagos, Nigeria', 'Antwerp, Belgium', 'warning', 14, 0.61),
('Mombasa, Kenya', 'Jebel Ali, UAE', 'normal', 0, 0.23),

-- Australia Routes
('Sydney, Australia', 'Los Angeles, USA', 'normal', 0, 0.20),
('Melbourne, Australia', 'Singapore', 'normal', 0, 0.15),
('Brisbane, Australia', 'Auckland, New Zealand', 'normal', 0, 0.12),

-- Intra-Asia Routes
('Singapore', 'Hong Kong, China', 'normal', 0, 0.14),
('Shanghai, China', 'Tokyo, Japan', 'normal', 0, 0.13),
('Busan, South Korea', 'Shanghai, China', 'normal', 2, 0.19),
('Bangkok, Thailand', 'Singapore', 'normal', 0, 0.16),
('Ho Chi Minh, Vietnam', 'Singapore', 'normal', 0, 0.17),

-- Intra-Europe Routes
('Rotterdam, Netherlands', 'Hamburg, Germany', 'normal', 0, 0.11),
('Antwerp, Belgium', 'Felixstowe, UK', 'normal', 0, 0.13),
('Marseille, France', 'Barcelona, Spain', 'normal', 0, 0.15),

-- Panama Canal Routes
('Los Angeles, USA', 'New York, USA', 'normal', 0, 0.22),
('Balboa, Panama', 'Cartagena, Colombia', 'normal', 0, 0.19),

-- Suez Canal Routes
('Singapore', 'Rotterdam, Netherlands', 'warning', 24, 0.74),
('Jebel Ali, UAE', 'Hamburg, Germany', 'warning', 18, 0.68),
('Mumbai, India', 'Antwerp, Belgium', 'warning', 22, 0.71),

-- Additional Strategic Routes
('Vancouver, Canada', 'Shanghai, China', 'normal', 0, 0.18),
('Seattle, USA', 'Tokyo, Japan', 'normal', 0, 0.16),
('Long Beach, USA', 'Busan, South Korea', 'normal', 2, 0.24);

-- ============================================================================
-- DISRUPTION PREDICTIONS (Last 7 days of predictions)
-- ============================================================================

INSERT INTO predictions (disruption_type, location, severity, confidence_score, affected_routes, description, prediction_time, actual_outcome) VALUES
-- Recent Critical Predictions
('Port Congestion', '{"lng": 121.47, "lat": 31.23, "name": "Shanghai"}', 'critical', 0.94, 15, 'Severe congestion detected at Shanghai port due to increased container volume. Average wait time: 8 days.', NOW() - INTERVAL '2 hours', NULL),
('Severe Weather', '{"lng": 4.47, "lat": 51.92, "name": "Rotterdam"}', 'critical', 0.91, 12, 'Category 3 storm system approaching Rotterdam. Expected landfall in 36 hours.', NOW() - INTERVAL '4 hours', NULL),
('Infrastructure Failure', '{"lng": -118.27, "lat": 33.75, "name": "Los Angeles"}', 'high', 0.87, 18, 'Crane malfunction at Terminal 4. Estimated repair time: 72 hours.', NOW() - INTERVAL '6 hours', NULL),

-- Yesterday
('Labor Strike', '{"lng": 13.38, "lat": 52.52, "name": "Hamburg"}', 'high', 0.88, 9, 'Port workers union announced 48-hour strike starting tomorrow.', NOW() - INTERVAL '1 day', 'confirmed'),
('Cyber Security Threat', '{"lng": 103.85, "lat": 1.29, "name": "Singapore"}', 'medium', 0.76, 6, 'Ransomware attack detected on port management systems. Systems offline.', NOW() - INTERVAL '1 day 3 hours', 'confirmed'),
('Port Congestion', '{"lng": -118.27, "lat": 33.75, "name": "Long Beach"}', 'high', 0.83, 11, 'Backlog of 45 vessels waiting to dock. Average wait: 5 days.', NOW() - INTERVAL '1 day 8 hours', 'confirmed'),

-- 2 Days Ago
('Geopolitical Event', '{"lng": 32.35, "lat": 30.05, "name": "Suez Canal"}', 'critical', 0.96, 28, 'Political tensions affecting Suez Canal traffic. Potential closure risk.', NOW() - INTERVAL '2 days', 'false_positive'),
('Severe Weather', '{"lng": -95.36, "lat": 29.76, "name": "Houston"}', 'high', 0.85, 7, 'Hurricane warning issued. Port closure expected within 24 hours.', NOW() - INTERVAL '2 days 5 hours', 'confirmed'),
('Infrastructure Failure', '{"lng": 126.97, "lat": 37.49, "name": "Busan"}', 'medium', 0.72, 5, 'Electrical grid instability affecting automated systems.', NOW() - INTERVAL '2 days 12 hours', 'resolved'),

-- 3 Days Ago
('Natural Disaster', '{"lng": 139.77, "lat": 35.68, "name": "Tokyo"}', 'high', 0.89, 13, 'Earthquake magnitude 6.8 detected. Port operations suspended for inspection.', NOW() - INTERVAL '3 days', 'confirmed'),
('Port Congestion', '{"lng": -3.70, "lat": 40.42, "name": "Valencia"}', 'medium', 0.68, 4, 'Increased traffic from rerouted vessels. Capacity at 95%.', NOW() - INTERVAL '3 days 6 hours', 'confirmed'),
('Equipment Shortage', '{"lng": -0.13, "lat": 51.97, "name": "Felixstowe"}', 'medium', 0.74, 6, 'Container chassis shortage affecting loading operations.', NOW() - INTERVAL '3 days 10 hours', 'resolved'),

-- 4 Days Ago
('Labor Strike', '{"lng": -122.32, "lat": 47.60, "name": "Seattle"}', 'high', 0.81, 8, 'Truck drivers strike affecting port-to-warehouse deliveries.', NOW() - INTERVAL '4 days', 'resolved'),
('Severe Weather', '{"lng": 55.27, "lat": 25.20, "name": "Dubai"}', 'low', 0.65, 3, 'Sandstorm warning. Low visibility expected for 12 hours.', NOW() - INTERVAL '4 days 4 hours', 'confirmed'),
('Port Congestion', '{"lng": -46.63, "lat": -23.96, "name": "Santos"}', 'medium', 0.71, 5, 'Coffee export season causing increased volume.', NOW() - INTERVAL '4 days 9 hours', 'confirmed'),

-- 5 Days Ago
('Cyber Security Threat', '{"lng": 4.42, "lat": 51.23, "name": "Antwerp"}', 'high', 0.84, 10, 'DDoS attack on port scheduling system detected.', NOW() - INTERVAL '5 days', 'confirmed'),
('Infrastructure Failure', '{"lng": 153.03, "lat": -27.47, "name": "Brisbane"}', 'low', 0.63, 2, 'Minor power outage affecting one terminal.', NOW() - INTERVAL '5 days 7 hours', 'resolved'),
('Geopolitical Event', '{"lng": 3.21, "lat": 6.45, "name": "Lagos"}', 'medium', 0.77, 4, 'Customs regulation changes causing processing delays.', NOW() - INTERVAL '5 days 14 hours', 'confirmed'),

-- 6 Days Ago
('Port Congestion', '{"lng": 101.69, "lat": 3.02, "name": "Port Klang"}', 'medium', 0.70, 6, 'Transshipment hub experiencing higher than normal volume.', NOW() - INTERVAL '6 days', 'resolved'),
('Severe Weather', '{"lng": -77.04, "lat": 38.91, "name": "Norfolk"}', 'low', 0.64, 3, 'Heavy fog causing reduced visibility. Slow operations expected.', NOW() - INTERVAL '6 days 5 hours', 'confirmed'),
('Natural Disaster', '{"lng": -71.28, "lat": -29.95, "name": "Coquimbo"}', 'high', 0.86, 7, 'Tsunami warning issued following offshore earthquake.', NOW() - INTERVAL '6 days 11 hours', 'false_positive'),

-- 7 Days Ago
('Equipment Shortage', '{"lng": 139.72, "lat": 35.45, "name": "Yokohama"}', 'low', 0.61, 2, 'Temporary shortage of refrigerated containers.', NOW() - INTERVAL '7 days', 'resolved'),
('Labor Strike', '{"lng": 2.35, "lat": 48.86, "name": "Le Havre"}', 'medium', 0.75, 5, 'Customs officers work-to-rule action causing delays.', NOW() - INTERVAL '7 days 3 hours', 'resolved'),
('Port Congestion', '{"lng": -80.04, "lat": 32.08, "name": "Savannah"}', 'high', 0.82, 9, 'Record-breaking import volume straining capacity.', NOW() - INTERVAL '7 days 8 hours', 'confirmed'),
('Cyber Security Threat', '{"lng": 31.03, "lat": -29.88, "name": "Durban"}', 'medium', 0.73, 4, 'Phishing attack targeting port staff detected and contained.', NOW() - INTERVAL '7 days 13 hours', 'resolved');

-- ============================================================================
-- IOT SENSOR READINGS (Last 24 hours of data)
-- ============================================================================

-- Function to generate sensor readings
DO $$
DECLARE
    i INTEGER;
    sensor_locations JSON[] := ARRAY[
        '{"lng": 121.47, "lat": 31.23}'::json,
        '{"lng": 4.47, "lat": 51.92}'::json,
        '{"lng": -118.27, "lat": 33.75}'::json,
        '{"lng": 103.85, "lat": 1.29}'::json,
        '{"lng": 55.27, "lat": 25.20}'::json,
        '{"lng": 139.77, "lat": 35.68}'::json,
        '{"lng": -122.32, "lat": 47.60}'::json,
        '{"lng": 13.38, "lat": 52.52}'::json,
        '{"lng": 126.97, "lat": 37.49}'::json,
        '{"lng": -80.19, "lat": 25.77}'::json
    ];
    sensor_id_prefix TEXT[] := ARRAY['SHA', 'RTM', 'LAX', 'SIN', 'DXB', 'TYO', 'SEA', 'HAM', 'PUS', 'MIA'];
BEGIN
    FOR i IN 1..1000 LOOP
        INSERT INTO sensor_readings (
            sensor_id,
            timestamp,
            location,
            temperature,
            delay_minutes,
            metadata
        ) VALUES (
            sensor_id_prefix[1 + (i % 10)] || '-SENSOR-' || LPAD((i % 50)::TEXT, 3, '0'),
            NOW() - (INTERVAL '1 minute' * (1000 - i)),
            sensor_locations[1 + (i % 10)],
            15.0 + (RANDOM() * 25.0),  -- Temperature between 15-40°C
            (RANDOM() * 120)::INTEGER,  -- Delay 0-120 minutes
            json_build_object(
                'container_count', (RANDOM() * 1000)::INTEGER,
                'crane_utilization', (RANDOM() * 100)::NUMERIC(5,2),
                'vessel_waiting', (RANDOM() * 30)::INTEGER,
                'weather_condition', (ARRAY['clear', 'cloudy', 'rain', 'fog'])[1 + (RANDOM() * 3)::INTEGER]
            )
        );
    END LOOP;
END $$;

-- ============================================================================
-- AGENT ACTIVITY LOG (Last 24 hours)
-- ============================================================================

INSERT INTO agent_activity (agent_name, activity_type, description, metadata, timestamp) VALUES
-- Prediction Agent Activities
('prediction_agent', 'analysis_complete', 'Analyzed 150 satellite images from Shanghai port', '{"images_processed": 150, "anomalies_detected": 12}', NOW() - INTERVAL '30 minutes'),
('prediction_agent', 'disruption_predicted', 'Port congestion predicted at Rotterdam with 94% confidence', '{"confidence": 0.94, "affected_routes": 12}', NOW() - INTERVAL '45 minutes'),
('prediction_agent', 'iot_analysis', 'Processed 500 IoT sensor readings', '{"sensors": 50, "anomalies": 3}', NOW() - INTERVAL '1 hour'),
('prediction_agent', 'gemini_analysis', 'Completed multimodal analysis using Gemini', '{"sources": ["satellite", "iot", "news"], "duration_ms": 2340}', NOW() - INTERVAL '2 hours'),
('prediction_agent', 'analysis_complete', 'Weather pattern analysis for Pacific routes', '{"routes_analyzed": 25, "warnings": 2}', NOW() - INTERVAL '3 hours'),

-- Optimization Agent Activities
('optimization_agent', 'route_optimized', 'Calculated alternative routes for Shanghai congestion', '{"alternatives": 5, "cost_savings": 450000}', NOW() - INTERVAL '35 minutes'),
('optimization_agent', 'inventory_rebalanced', 'Rebalanced inventory across West Coast warehouses', '{"warehouses": 8, "units_moved": 15000}', NOW() - INTERVAL '1 hour 15 minutes'),
('optimization_agent', 'cost_analysis', 'Completed cost-benefit analysis for route changes', '{"routes": 12, "estimated_savings": 2400000}', NOW() - INTERVAL '2 hours 30 minutes'),
('optimization_agent', 'route_optimized', 'Optimized European distribution network', '{"nodes": 15, "efficiency_gain": "23%"}', NOW() - INTERVAL '4 hours'),
('optimization_agent', 'simulation_complete', 'Ran Monte Carlo simulation for risk assessment', '{"iterations": 10000, "confidence": 0.95}', NOW() - INTERVAL '5 hours'),

-- Alert Agent Activities
('alert_agent', 'alert_generated', 'Critical alert generated for Rotterdam storm', '{"severity": "critical", "stakeholders": 15}', NOW() - INTERVAL '40 minutes'),
('alert_agent', 'notification_sent', 'Sent email notifications to 15 stakeholders', '{"channel": "email", "delivered": 15}', NOW() - INTERVAL '42 minutes'),
('alert_agent', 'notification_sent', 'Sent SMS alerts to operations team', '{"channel": "sms", "delivered": 8}', NOW() - INTERVAL '43 minutes'),
('alert_agent', 'alert_resolved', 'Resolved minor equipment failure alert', '{"alert_id": "ALT-1234", "resolution_time_hours": 4}', NOW() - INTERVAL '2 hours'),
('alert_agent', 'stakeholder_response', 'Received acknowledgment from logistics manager', '{"alert_id": "ALT-5678", "response_time_minutes": 12}', NOW() - INTERVAL '3 hours'),

-- More Historical Activities
('prediction_agent', 'training_complete', 'Retrained congestion detection model', '{"accuracy": 0.987, "samples": 50000}', NOW() - INTERVAL '12 hours'),
('optimization_agent', 'benchmark_complete', 'Performance benchmark completed', '{"throughput": "1500 routes/sec", "latency_ms": 45}', NOW() - INTERVAL '18 hours'),
('alert_agent', 'audit_complete', 'Completed weekly alert audit', '{"total_alerts": 156, "false_positives": 8, "accuracy": "94.9%"}', NOW() - INTERVAL '20 hours');

-- ============================================================================
-- ANALYTICS & SUMMARY
-- ============================================================================

-- Display summary
DO $$
DECLARE
    route_count INTEGER;
    prediction_count INTEGER;
    sensor_count INTEGER;
    activity_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO route_count FROM routes;
    SELECT COUNT(*) INTO prediction_count FROM predictions;
    SELECT COUNT(*) INTO sensor_count FROM sensor_readings;
    SELECT COUNT(*) INTO activity_count FROM agent_activity;

    RAISE NOTICE '========================================';
    RAISE NOTICE 'Database Seeding Complete!';
    RAISE NOTICE '========================================';
    RAISE NOTICE 'Routes: %', route_count;
    RAISE NOTICE 'Predictions: %', prediction_count;
    RAISE NOTICE 'Sensor Readings: %', sensor_count;
    RAISE NOTICE 'Agent Activities: %', activity_count;
    RAISE NOTICE '========================================';
END $$;
