const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC = path.join(__dirname, 'public');

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ico': 'image/x-icon',
  '.md': 'text/markdown',
};

http.createServer((req, res) => {
  let url = req.url.split('?')[0];

  // Clean URL routing: /work/ -> /work.html
  if (url === '/') url = '/index.html';
  else if (!path.extname(url)) {
    // Try /work/ -> /work.html
    const clean = url.replace(/\/$/, '');
    if (fs.existsSync(path.join(PUBLIC, clean + '.html'))) {
      url = clean + '.html';
    } else if (fs.existsSync(path.join(PUBLIC, clean, 'index.html'))) {
      url = clean + '/index.html';
    }
  }

  const filePath = path.join(PUBLIC, url);
  const ext = path.extname(filePath);
  const contentType = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404</h1>');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
