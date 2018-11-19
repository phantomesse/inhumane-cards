const express = require('express');
const server = express();
const http = require('http').Server(server);
const io = require('socket.io')(http);
const sassMiddleware = require('node-sass-middleware')
const path = require('path');
const port = process.env.PORT || 1337;
const app = require('./app/app.js');
const bodyParser = require("body-parser");

/** Install body parser to handle POST parameters. */
server.use(bodyParser.urlencoded({
  extended: false
}));
server.use(bodyParser.json());

/** SASS compilations. */
server.use(sassMiddleware({
  debug: false,
  dest: 'public/css',
  force: true,
  outputStyle: 'compressed',
  prefix: '/css',
  root: __dirname,
  sourceMap: true,
  src: 'sass'
}));
server.use(express.static(path.join(__dirname, 'public')));

/** Serve index.html. */
server.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '/public/index.html'));
});

/**
 * Retrieves a game session and creates the game session if it doesn't exist.
 */
server.get('/game-session', function(request, response) {
  response.setHeader('Content-Type', 'application/json');

  // Get game id from the request.
  const gameId = request.query.gameId;

  response.send(JSON.stringify(app.getGameSession(gameId).json));
});

/** Retrieves a list of game sessions. */
server.get('/game-sessions', function(request, response) {
  response.setHeader('Content-Type', 'application/json');

  const allGameSessionsJSON = JSON.stringify(app.allGameSessions
    .map((gameSession) => gameSession.json));

  response.send(allGameSessionsJSON);
});

server.post('/add-user', function(request, response) {
  response.setHeader('Content-Type', 'application/json');

  // Get user id and game id from the request.
  const userId = request.body.userId;
  const gameId = request.body.gameId;

  // Add user.
  const userSession = app.addUser(userId, gameId);

  // Return user session.
  response.send(JSON.stringify(userSession.json));
});

/** Start up server. */
http.listen(port, function() {
  console.log(`listening on localhost:${port}`);
});
