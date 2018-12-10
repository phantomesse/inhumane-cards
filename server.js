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

// Checks if a game id exists.
server.get('/does-game-exist', function (request, response) {
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify(app.doesGameExist(request.query.game)));
});

// Get the current black card for a given game id.
server.get('/black-card', function (request, response) {
  response.setHeader('Content-Type', 'application/json');

  const gameId = request.query.game;
  if (app.doesGameExist(gameId)) {
    const blackCard = app.getGame(gameId).blackCard;
    response.send(JSON.stringify(blackCard));
  } else {
    response.send(JSON.stringify(null));
  }
});

server.get('/white-cards', function (request, response) {
  response.setHeader('Content-Type', 'application/json');
  const playerName = request.query.player;
  const gameId = request.query.game;
  const player = app.getPlayer(playerName, gameId);
  response.send(JSON.stringify(player.whiteCards));
});

// Handle socket.io connections
io.on('connection', function (socket) {
  app.addPlayer(socket);
});

// Listen.
http.listen(port, function () {
  console.log(`listening on localhost:${port}`);
});
