const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
 
const app = express();
 
const appPath = path.join(__dirname, 'dist/rowgrid/browser');
 
app.use(express.static(appPath));
 
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
 
const apiProxy = createProxyMiddleware({
  target: 'http://localhost:5174/api',
  changeOrigin: true,
  secure: false, 
  logLevel: 'debug',
 
  onProxyReq: (proxyReq, req, res) => {
    console.log(`[Proxy Request] ${req.method} ${req.url} -> ${proxyReq.path}`);
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log(`[Proxy Response] ${proxyRes.statusCode} ${req.method} ${req.url}`);
  },
  onError: (err, req, res) => {
    console.error('[Proxy Error]', err);
    res.status(500).send('Proxy Error');
  }
});
 
app.use('/api', (req, res, next) => {
  console.log('[Debug] Entering /api route handler');
  console.log('[Debug] Request URL:', req.baseUrl);
  // Wrap the proxy call in a try-catch block
  try {
    console.log('[Debug] Attempting to proxy request');
    apiProxy(req, res, (err) => {
      if (err) {
        console.error('[Debug] Proxy error:', err);
        next(err);
      } else {
        console.log('[Debug] Proxy completed successfully');
        next();
      }
    });
  } catch (error) {
    console.error('[Debug] Exception in proxy middleware:', error);
    next(error);
  }
});

app.get('*', (req, res) => {
  console.log('[Debug] Catch-all route hit');
  res.sendFile(path.join(appPath, 'index.html'));
});
 
const port = process.env.PORT || 8080;
 
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Proxying /api requests to http://localhost:5174`);
});

