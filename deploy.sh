#!/bin/bash

# Build script for Liara React platform deployment
echo "Building React project for Liara deployment..."

# Clean previous build
rm -rf dist

# Build the React project
npm run build

# Copy configuration files to dist for static serving
cp public/.htaccess dist/.htaccess
cp public/_redirects dist/_redirects
cp public/web.config dist/web.config
cp public/_headers dist/_headers
cp nginx.conf dist/nginx.conf

# Verify build
echo "Build completed. Files in dist directory:"
ls -la dist/

echo "React deployment files ready for Liara!"
echo "Upload the 'dist' folder contents to Liara React platform."
