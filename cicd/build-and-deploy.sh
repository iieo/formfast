#!/bin/bash

# Retrieve the last commit hash
COMMIT_HASH=$(git rev-parse HEAD)
export COMMIT_HASH=$(git rev-parse HEAD)

docker compose up postgres -d

# Name for your Docker container
CONTAINER_NAME="formfast"
IMAGE_NAME="iieo/formfast"

# Build your Docker image and tag it with the commit hash
docker build --no-cache --build-arg COMMIT_HASH=$COMMIT_HASH -t $IMAGE_NAME:$COMMIT_HASH -f Dockerfile .

# Find the ID of the previous container with the same name
PREVIOUS_CONTAINER_ID=$(docker ps -q -f name=$CONTAINER_NAME)

# Stop the previous running container if it exists
if [ ! -z "$PREVIOUS_CONTAINER_ID" ]; then
    docker stop $PREVIOUS_CONTAINER_ID
fi

# Remove the previous container (optional)
if [ ! -z "$PREVIOUS_CONTAINER_ID" ]; then
    docker rm $PREVIOUS_CONTAINER_ID
fi

# Start a new container with the new image
# docker run -d --name $CONTAINER_NAME -p 3000:3000 $IMAGE_NAME:$COMMIT_HASH

docker compose up -d 
