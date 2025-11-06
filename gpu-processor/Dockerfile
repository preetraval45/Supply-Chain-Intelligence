FROM tensorflow/tensorflow:2.15.0-gpu

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3-opencv \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create directory for temporary images
RUN mkdir -p /app/temp_images

# Environment variables for GPU
ENV NVIDIA_VISIBLE_DEVICES all
ENV NVIDIA_DRIVER_CAPABILITIES compute,utility
ENV TF_FORCE_GPU_ALLOW_GROWTH true

# Run the processor
CMD ["python", "process_images.py"]
