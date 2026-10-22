const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, 'dist');
const server = http.createServer((req, res) => {
  const requested = req.url === '/' ? '/index.html' : req.url;
  const target = path.join(root, requested.replace(/^\/+/, ''));
  if (!target.startsWith(root)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }
  fs.readFile(target, (error, data) => {
    if (error) {
      res.writeHead(404);
      return res.end('Not found');
    }
    res.writeHead(200, { 'Content-Type': target.endsWith('.html') ? 'text/html; charset=utf-8' : 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(4317, '127.0.0.1', () => console.log('Local: http://127.0.0.1:4317'));
