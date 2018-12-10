'use strict';

const Cards = require('./cards');

/// Holds information about one game.
class Game {
  constructor(id) {
    this.id = id;
    this._players = [];

    // List of black cards that have already been played in this game.
    this._seenBlackCards = [];
    this.blackCard = Cards.blackCard;

    // List of white cards that have already been played in this game.
    this._seenWhiteCards = [];
  }

  addPlayer(player) {
    this._players.push(player);
  }
}

module.exports.Game = Game;
