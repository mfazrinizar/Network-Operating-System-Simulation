#!/bin/bash

# Source and destination directories
SRC_DIR="../etc/nginx/sites-available"
DEST_DIR="/etc/nginx/sites-available"
ENABLED_DIR="/etc/nginx/sites-enabled"

# Ensure NGINX directories exist
mkdir -p $DEST_DIR $ENABLED_DIR

# Copy configuration files
echo "Copying NGINX configuration files..."
cp -r $SRC_DIR/* $DEST_DIR/

# Create symbolic links in sites-enabled
echo "Creating symbolic links in $ENABLED_DIR..."
for CONF in $DEST_DIR/*; do
  BASENAME=$(basename $CONF)
  ln -sf $CONF $ENABLED_DIR/$BASENAME
done

# Test and reload NGINX
echo "Testing NGINX configuration..."
nginx -t

if [ $? -eq 0 ]; then
  echo "Reloading NGINX..."
  systemctl reload nginx
else
  echo "Error in NGINX configuration. Check the logs."
  exit 1
fi

echo "NGINX configuration deployed successfully!"
