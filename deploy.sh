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

# Verify build
echo "Build completed. Files in dist directory:"
ls -la dist/

echo "Deployment files ready for Liara!"
