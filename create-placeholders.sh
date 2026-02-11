#!/bin/bash

# Create placeholder images for testing
# These are simple colored rectangles with industry names

echo "Creating placeholder images..."

mkdir -p public/images

# Function to create a placeholder image
create_placeholder() {
  local name=$1
  local color=$2
  
  # Using ImageMagick (install with: brew install imagemagick or apt-get install imagemagick)
  convert -size 800x1000 \
    "xc:$color" \
    -pointsize 60 \
    -fill white \
    -gravity center \
    -annotate +0+0 "$name" \
    "public/images/${name,,}.jpg"
  
  echo "Created placeholder for $name"
}

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
  echo "ImageMagick not found. Install it first:"
  echo "  macOS: brew install imagemagick"
  echo "  Ubuntu: sudo apt-get install imagemagick"
  echo ""
  echo "Or manually add 8 images to public/images/"
  echo "Required: epc.jpg, water.jpg, furniture.jpg, feed.jpg, service.jpg, auto.jpg, retail.jpg, landscaping.jpg"
  exit 1
fi

# Create placeholders with colors matching the theme
create_placeholder "EPC" "#f97316"
create_placeholder "Water" "#3b82f6"
create_placeholder "Furniture" "#8b5cf6"
create_placeholder "Feed" "#10b981"
create_placeholder "Service" "#f59e0b"
create_placeholder "Auto" "#ef4444"
create_placeholder "Retail" "#ec4899"
create_placeholder "Landscaping" "#22c55e"

echo ""
echo "✅ All placeholder images created in public/images/"
echo "Replace these with real images when ready!"
