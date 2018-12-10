'use strict';

const GameIds = require('./game-ids');
const Game = require('./game').Game;

/// Holds all the global data and functions for the app.
class App {
  constructor() {
    /// Map of game id to game object.
    this._gameIdToGameMap = {};
  }

  createNewGame() {
    const gameId = GameIds.newGameId;
    this._gameIdToGameMap[gameId] = new Game(gameId);
    return gameId;
  }

  get existingGameIds() {
    return Object.keys(this._gameIdToGameMap);
  }
}

module.exports = new App();
