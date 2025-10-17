#!/bin/bash

# Build script for Liara deployment
echo "Building project for Liara deployment..."

# Clean previous build
rm -rf dist

# Build the project
npm run build

# Copy configuration files to dist
cp public/.htaccess dist/.htaccess
cp public/_redirects dist/_redirects
cp public/web.config dist/web.config
cp public/_headers dist/_headers
cp nginx.conf dist/nginx.conf

# Copy server.js to root (for Liara)
cp server.js ./

# Verify build
echo "Build completed. Files in root directory:"
ls -la | grep -E "(server\.js|package\.json|dist)"

echo "Deployment files ready for Liara!"
