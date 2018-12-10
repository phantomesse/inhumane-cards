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

  doesGameExist(gameId) {
    return gameId in this._gameIdToGameMap;
  }

  get existingGameIds() {
    return Object.keys(this._gameIdToGameMap);
  }

  getGame(gameId) {
    return this._gameIdToGameMap[gameId];
  }
}

module.exports = new App();
