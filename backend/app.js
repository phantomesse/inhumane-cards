'use strict';

const GameIds = require('./game-ids');
const Game = require('./game').Game;
const Player = require('./player').Player;

/// Holds all the global data and functions for the app.
class App {
  constructor() {
    /// Map of game id to game object.
    this._gameIdToGameMap = {};

    /// List of connected players.
    this._players = [];
  }

  addPlayer(socket) {
    this._players.push(new Player(socket, this));
  }

  addPlayerToGame(player, gameId) {
    this.getGame(gameId).addPlayer(player);
  }

  removePlayerFromGame(player, gameId) {
    this.getGame(gameId).removePlayer(player);
  }

  getPlayer(playerName, gameId) {
    for (const player of this._players) {
      console.log(`${player.name} with game ${player.gameId}`);
      if (player.name === playerName && player.gameId === gameId) {
        return player;
      }
    }
    return null;
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
