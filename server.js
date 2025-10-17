import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 80;

// Set proper MIME types
express.static.mime.define({
  'application/javascript': ['js', 'mjs'],
  'text/css': ['css'],
  'application/json': ['json']
});

// Serve static files from current directory (dist)
app.use('/pingotrip', express.static(__dirname, {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js') || filePath.endsWith('.mjs')) {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
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

// SPA fallback - serve index.html for all routes
app.get('/pingotrip/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Root redirect
app.get('/', (req, res) => {
  res.redirect('/pingotrip/');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
