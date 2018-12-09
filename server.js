'use strict';

// Set up.
const port = process.env.PORT || 1337;
const express = require('express');
const sassMiddleware = require('node-sass-middleware')
const server = express();
const http = require('http').Server(server);
const io = require('socket.io')(http);

// Configuration.
server.use(sassMiddleware({
  debug: false,
  dest: 'frontend/css',
  force: true,
  outputStyle: 'compressed',
  prefix: '/css',
  root: __dirname,
  sourceMap: true,
  src: 'frontend/scss'
}));
server.use(express.static(__dirname + '/frontend'));

// Serve index.html
server.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, '/frontend/index.html'));
});

// Handle socket.io connections
io.on('connection', function (socket) {
  console.log(`connected`);

  socket.on('disconnect', function () {
    console.log(`disconnected`);
  });
});

// Listen.
http.listen(port, function () {
  console.log(`listening on localhost:${port}`);
});
