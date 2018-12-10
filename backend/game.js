'use strict';

/// Holds information about one game.
class Game {
  constructor(id) {
    this.id = id;
    this._players = [];
  }

  addPlayer(player) {
    this._players.push(player);
  }
}

module.exports.Game = Game;
