#!/bin/bash

# Build script for Liara deployment
echo "Building project for Liara deployment..."

# Clean previous build
rm -rf dist

# Build the project
npm run build

# Copy configuration files
cp public/.htaccess dist/.htaccess
cp public/_redirects dist/_redirects
cp public/web.config dist/web.config
cp public/_headers dist/_headers
cp nginx.conf dist/nginx.conf
cp server.js dist/server.js
cp package.json dist/package.json

# Install production dependencies in dist
cd dist
npm install --production
cd ..

# Verify build
echo "Build completed. Files in dist directory:"
ls -la dist/

echo "Deployment files ready for Liara!"
