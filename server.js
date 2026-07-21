const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC = path.join(__dirname, 'public');

// --- WordPress origin ---
// The new static site owns ~12 routes. WordPress still owns everything else:
// 400+ blog posts (canonical at ROOT-level slugs, e.g. /roas-is-killing-your-growth/),
// category/tag/author/date archives, wp-admin, media. So anything this server doesn't
// explicitly serve or redirect falls through to WordPress — nothing that works today breaks.
const WP_ORIGIN_HOST = process.env.WP_ORIGIN_HOST || 'masondevtrns.wpengine.com';
// Host header sent upstream so WordPress emits masoninteractive.com URLs (no canonical redirect loop).
const PUBLIC_HOST = process.env.PUBLIC_HOST || 'masoninteractive.com';

// Paths that must ALWAYS go to WordPress, even if a same-named static file exists.
// (e.g. /blog/ — we ship a design mockup at public/blog.html that must never be served.)
const WP_PREFIXES = [
  '/blog', '/wp-content', '/wp-includes', '/wp-admin', '/wp-json',
  '/wp-login.php', '/wp-cron.php', '/xmlrpc.php',
  '/feed', '/category', '/tag', '/author', '/comments',
];

// Retired URLs from the old site -> where they live now. Prefix match: an entry also
// covers its children (/case-studies/floof/ -> /work/). Longest match wins, so
// /our-offerings/creative-portfolio beats /our-offerings.
const REDIRECTS = {
  '/our-offerings/creative-portfolio': '/creative-portfolio/',
  '/our-offerings': '/services/',
  '/case-studies': '/work/',
  '/our-approach': '/about/',
  '/our-team': '/about/',
  '/our-mission': '/about/',
  '/our-clients': '/about/',
  '/full-service-partner': '/about/',
  '/resources': '/blog/',
  '/webinars': '/blog/',
  '/beauty': '/ecommerce/',
  '/fashion': '/ecommerce/',
  '/cpg': '/ecommerce/',
  '/lifestyle': '/ecommerce/',
  '/b2b': '/higher-education/',
  '/education': '/higher-education/',
  '/institutional-growth': '/higher-education/',
  '/work-with-us': '/lets-talk/',
  '/contact-us': '/lets-talk/',
  '/hire-us': '/lets-talk/',
  '/free-marketing-analysis': '/see-the-ai/',
};

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

function isWordPressPath(p) {
  if (/^\/\d{4}\//.test(p)) return true; // date archives: /2024/12/09/post-title/
  return WP_PREFIXES.some((pre) => p === pre || p.startsWith(pre + '/'));
}

// Longest-prefix match against REDIRECTS. Returns the new path, or null.
function redirectFor(p) {
  const bare = p.replace(/\/$/, '') || '/';
  let best = null;
  for (const from of Object.keys(REDIRECTS)) {
    if (bare === from || bare.startsWith(from + '/')) {
      if (!best || from.length > best.length) best = from;
    }
  }
  return best ? REDIRECTS[best] : null;
}

// Resolve a request path to a real file under public/, or null if we don't own it.
function resolveStatic(p) {
  let u = p;
  if (u === '/') u = '/index.html';
  else if (!path.extname(u)) {
    const clean = u.replace(/\/$/, '');
    if (fs.existsSync(path.join(PUBLIC, clean + '.html'))) u = clean + '.html';
    else if (fs.existsSync(path.join(PUBLIC, clean, 'index.html'))) u = clean + '/index.html';
    else return null;
  }
  const filePath = path.join(PUBLIC, u);
  if (!filePath.startsWith(PUBLIC)) return null; // block path traversal
  try {
    return fs.statSync(filePath).isFile() ? filePath : null;
  } catch (e) {
    return null;
  }
}

function proxyToWordPress(req, res) {
  const upstream = https.request({
    hostname: WP_ORIGIN_HOST,
    servername: WP_ORIGIN_HOST,
    port: 443,
    method: req.method,
    path: req.url, // preserve full path + query string
    headers: Object.assign({}, req.headers, {
      host: PUBLIC_HOST,
      'x-forwarded-host': PUBLIC_HOST,
      'x-forwarded-proto': 'https',
    }),
  }, (up) => {
    res.writeHead(up.statusCode, up.headers);
    up.pipe(res);
  });
  upstream.on('error', () => {
    res.writeHead(502, { 'Content-Type': 'text/html' });
    res.end('<h1>502</h1><p>Temporarily unavailable.</p>');
  });
  req.pipe(upstream);
}

http.createServer((req, res) => {
  let url = req.url.split('?')[0];
  try { url = decodeURIComponent(url); } catch (e) { /* leave url as-is on malformed input */ }

  // 1. Paths WordPress always owns (blog index, archives, wp-admin, media).
  if (WP_ORIGIN_HOST && isWordPressPath(url)) {
    return proxyToWordPress(req, res);
  }

  // 2. Retired URLs -> 301 to their new home (preserves SEO + live ad/email links).
  const dest = redirectFor(url);
  if (dest) {
    res.writeHead(301, { Location: dest });
    return res.end();
  }

  // 3. Pages the new site owns.
  const filePath = resolveStatic(url);
  if (filePath) {
    const contentType = MIME[path.extname(filePath)] || 'application/octet-stream';
    return fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        return res.end('<h1>500</h1>');
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  }

  // 4. Everything else is still WordPress's: root-level blog posts, old pages,
  //    anything we forgot. WP answers it (or serves its own 404).
  if (WP_ORIGIN_HOST) {
    return proxyToWordPress(req, res);
  }

  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end('<h1>404</h1>');
}).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
