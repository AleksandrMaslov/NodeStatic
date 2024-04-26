const fs = require('fs');
const path = require('path');
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

// app.use('/**/*',express.static(path.join(__dirname, 'public')));

// app.all('*', function(_req, res) { 
//   res.redirect('/index.html'); 
// });

app.use(function(_req, res) {
  res.status(400);
  return res.send(`<h1>404 Error: Resource not found</h1>`);
});

app.listen(PORT, () => {
  console.log(`HTTP server is listening PORT: ${PORT}`);
})

// // HTTPS Server
// const httpsServer = https.createServer({
//   key: fs.readFileSync('/etc/letsencrypt/live/my_api_url/privkey.pem'),
//   cert: fs.readFileSync('/etc/letsencrypt/live/my_api_url/fullchain.pem'),
// }, app);

// httpsServer.listen(PORT, () => {
//     console.log(`HTTPS Server running on port ${PORT}`);
// });