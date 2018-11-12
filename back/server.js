const port = process.env.port || 4001;
const http = require('http');
const app = require('./app');

http.createServer(app).listen(port);