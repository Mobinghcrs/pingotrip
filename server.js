import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

console.log('Server starting...');
console.log('Current directory:', __dirname);
console.log('Port:', PORT);

// Set proper MIME types
express.static.mime.define({
  'application/javascript': ['js', 'mjs'],
  'text/css': ['css'],
  'application/json': ['json']
});

// Serve static files from dist directory
app.use('/pingotrip', express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, filePath) => {
    console.log('Serving file:', filePath);
    if (filePath.endsWith('.js') || filePath.endsWith('.mjs')) {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      console.log('Set MIME type for JS file:', filePath);
    } else if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css; charset=utf-8');
    } else if (filePath.endsWith('.json')) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
    }
    
    // Security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
  }
}));

// Health check endpoint
app.get('/pingotrip/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    port: PORT,
    directory: __dirname
  });
});

// SPA fallback - serve index.html for all routes
app.get('/pingotrip/*', (req, res) => {
  console.log('SPA fallback for route:', req.path);
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Root redirect
app.get('/', (req, res) => {
  console.log('Root redirect to /pingotrip/');
  res.redirect('/pingotrip/');
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access your app at: http://localhost:${PORT}/pingotrip/`);
});
