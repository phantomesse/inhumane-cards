'use strict';

// Set up.
const port = process.env.PORT || 1337;
const express = require('express');
const sassMiddleware = require('node-sass-middleware')
const server = express();
const http = require('http').Server(server);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');

// App-related imports.
const app = require('./backend/app.js');

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

// Creates a new game and returns the new game id.
server.post('/create-new-game', function (request, response) {
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify(app.createNewGame()));
});

// Retrieves a list of existing game ids.
server.get('/existing-game-ids', function (request, response) {
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify(app.existingGameIds));
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
