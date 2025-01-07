#!/bin/bash

# Create directories if they don't exist
mkdir -p public/vehicles
mkdir -p public/images

# Download placeholder images for vehicles
declare -A vehicle_images=(
  ["urus"]="https://images.unsplash.com/photo-1636866120504-81110da6e04f"
  ["i7"]="https://images.unsplash.com/photo-1523983388277-336a66bf9bcd"
  ["g63"]="https://images.unsplash.com/photo-1520031441872-265e4ff70366"
  ["levante"]="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd"
  ["panamera"]="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
  ["718"]="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e"
  ["rs5"]="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a"
  ["gle63s"]="https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6"
)

# Download and optimize images
for vehicle in "${!vehicle_images[@]}"; do
  curl -L "${vehicle_images[$vehicle]}" -o "public/vehicles/${vehicle}.jpg"
done

# Download about page hero image
curl -L "https://images.unsplash.com/photo-1563720223185-11003d516935" -o "public/about-hero.jpg"
