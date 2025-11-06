"""
GPU-Powered Satellite Image Processor
Cloud Run Job with NVIDIA L4 GPU for analyzing satellite imagery
"""

import os
import sys
import time
import numpy as np
import cv2
from PIL import Image
import tensorflow as tf
from google.cloud import storage, pubsub_v1
import json
from typing import Dict, List, Any
from datetime import datetime

class SatelliteImageProcessor:
    """
    GPU-accelerated processor for satellite imagery analysis
    Detects port congestion, weather patterns, and infrastructure issues
    """

    def __init__(self):
        self.batch_size = 10
        self.image_size = (512, 512)

        # Check GPU availability
        gpus = tf.config.list_physical_devices('GPU')
        if gpus:
            print(f"✓ GPU detected: {gpus}")
            try:
                # Enable memory growth to avoid OOM
                for gpu in gpus:
                    tf.config.experimental.set_memory_growth(gpu, True)
                print("✓ GPU memory growth enabled")
            except RuntimeError as e:
                print(f"GPU configuration error: {e}")
        else:
            print("⚠ No GPU detected - using CPU (slower)")

        # Initialize Cloud Storage client
        self.storage_client = storage.Client()
        self.bucket_name = os.getenv("GCS_BUCKET", "supply-chain-satellite-images")

        # Initialize Pub/Sub client for publishing results
        self.publisher = pubsub_v1.PublisherClient()
        self.topic_path = self.publisher.topic_path(
            os.getenv("GCP_PROJECT_ID", "my-project"),
            "satellite-analysis-results"
        )

        # Load or create model
        self.model = self.load_model()

    def load_model(self) -> tf.keras.Model:
        """
        Load pre-trained model or create a simple CNN for demo
        In production, this would be a trained model for port congestion detection
        """
        model_path = os.getenv("MODEL_PATH", "port_congestion_model")

        if os.path.exists(model_path):
            print(f"Loading model from {model_path}")
            return tf.keras.models.load_model(model_path)
        else:
            print("Creating demo model (replace with trained model in production)")
            return self.create_demo_model()

    def create_demo_model(self) -> tf.keras.Model:
        """
        Create a simple CNN for demonstration
        In production, use a trained model (e.g., ResNet, EfficientNet)
        """
        model = tf.keras.Sequential([
            tf.keras.layers.Conv2D(32, (3, 3), activation='relu', input_shape=(512, 512, 3)),
            tf.keras.layers.MaxPooling2D((2, 2)),
            tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),
            tf.keras.layers.MaxPooling2D((2, 2)),
            tf.keras.layers.Conv2D(64, (3, 3), activation='relu'),
            tf.keras.layers.Flatten(),
            tf.keras.layers.Dense(64, activation='relu'),
            tf.keras.layers.Dense(4, activation='softmax')  # 4 classes: low, medium, high, critical
        ])

        model.compile(
            optimizer='adam',
            loss='categorical_crossentropy',
            metrics=['accuracy']
        )

        return model

    def preprocess_image(self, image_path: str) -> np.ndarray:
        """
        Preprocess satellite image for model input
        """
        # Load image
        img = cv2.imread(image_path)
        if img is None:
            raise ValueError(f"Failed to load image: {image_path}")

        # Resize to model input size
        img = cv2.resize(img, self.image_size)

        # Normalize pixel values
        img = img.astype(np.float32) / 255.0

        return img

    def process_batch(self, image_paths: List[str]) -> List[Dict[str, Any]]:
        """
        Process a batch of images using GPU
        """
        print(f"Processing batch of {len(image_paths)} images on GPU...")

        # Preprocess images
        images = []
        for path in image_paths:
            try:
                img = self.preprocess_image(path)
                images.append(img)
            except Exception as e:
                print(f"Error preprocessing {path}: {e}")
                continue

        if not images:
            return []

        # Convert to batch
        batch = np.array(images)

        # Run inference on GPU
        start_time = time.time()

        with tf.device('/GPU:0' if tf.config.list_physical_devices('GPU') else '/CPU:0'):
            predictions = self.model.predict(batch, batch_size=self.batch_size)

        processing_time = time.time() - start_time
        print(f"✓ Processed {len(images)} images in {processing_time:.2f}s ({len(images)/processing_time:.1f} imgs/s)")

        # Parse results
        results = []
        for i, pred in enumerate(predictions):
            congestion_level = ['low', 'medium', 'high', 'critical'][np.argmax(pred)]
            confidence = float(np.max(pred))

            results.append({
                "image_path": image_paths[i],
                "congestion_level": congestion_level,
                "confidence": confidence,
                "risk_score": float(np.mean(pred[2:])),  # Average of high/critical probabilities
                "timestamp": datetime.utcnow().isoformat()
            })

        return results

    def download_images_from_gcs(self, prefix: str = "") -> List[str]:
        """
        Download satellite images from Cloud Storage
        """
        print(f"Downloading images from gs://{self.bucket_name}/{prefix}")

        local_paths = []
        try:
            bucket = self.storage_client.bucket(self.bucket_name)
            blobs = bucket.list_blobs(prefix=prefix)

            os.makedirs("./temp_images", exist_ok=True)

            for blob in blobs:
                if blob.name.endswith(('.jpg', '.jpeg', '.png')):
                    local_path = f"./temp_images/{os.path.basename(blob.name)}"
                    blob.download_to_filename(local_path)
                    local_paths.append(local_path)
                    print(f"  Downloaded: {blob.name}")

        except Exception as e:
            print(f"Error downloading from GCS: {e}")

        return local_paths

    def publish_results(self, results: List[Dict[str, Any]]):
        """
        Publish analysis results to Pub/Sub
        """
        try:
            message_data = json.dumps({
                "results": results,
                "processed_at": datetime.utcnow().isoformat(),
                "gpu_used": len(tf.config.list_physical_devices('GPU')) > 0
            }).encode("utf-8")

            future = self.publisher.publish(self.topic_path, message_data)
            message_id = future.result()
            print(f"✓ Published results to Pub/Sub (message ID: {message_id})")

        except Exception as e:
            print(f"Error publishing to Pub/Sub: {e}")

    def run(self):
        """
        Main processing loop
        """
        print("=" * 60)
        print("GPU-Powered Satellite Image Processor")
        print("=" * 60)

        # Check if running as Cloud Run Job
        if os.getenv("CLOUD_RUN_JOB"):
            print("Running as Cloud Run Job")

        # Download images
        image_paths = self.download_images_from_gcs()

        if not image_paths:
            print("⚠ No images found - generating synthetic data for demo")
            # In demo mode, create synthetic images
            image_paths = self.generate_synthetic_images(5)

        # Process in batches
        all_results = []
        for i in range(0, len(image_paths), self.batch_size):
            batch = image_paths[i:i + self.batch_size]
            results = self.process_batch(batch)
            all_results.extend(results)

        # Publish results
        if all_results:
            self.publish_results(all_results)
            print(f"\n✓ Processed {len(all_results)} images total")
        else:
            print("\n⚠ No results to publish")

        print("=" * 60)

    def generate_synthetic_images(self, count: int) -> List[str]:
        """
        Generate synthetic satellite images for demo
        """
        os.makedirs("./temp_images", exist_ok=True)
        paths = []

        for i in range(count):
            # Create synthetic image
            img = np.random.randint(0, 255, (512, 512, 3), dtype=np.uint8)
            path = f"./temp_images/synthetic_{i}.jpg"
            cv2.imwrite(path, img)
            paths.append(path)

        print(f"Generated {count} synthetic images for demo")
        return paths

if __name__ == "__main__":
    processor = SatelliteImageProcessor()
    processor.run()
