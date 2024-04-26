const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

const express = require('express');
const cors = require('cors');
const compression = require('compression')

const PORT = 80;

const app = express();
app.use(cors())
app.use(compression())

app.use('/',express.static(path.join(__dirname, 'public')));
app.use('/*',express.static(path.join(__dirname, 'public')));

// app.use(function(_req, res) {
//   res.status(400);
//   return res.send(`<h1>404 Error: Resource not found</h1>`);
// });

// const httpServer = http.createServer(app);
// httpServer.listen(80, () => {
//     console.log('HTTP Server is listening PORT: 80');
// });

const httpsServer = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/drive.synsys.co/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/drive.synsys.co/fullchain.pem'),
}, app);
httpsServer.listen(443, () => {
    console.log('HTTPS Server is listening PORT: 443');
});