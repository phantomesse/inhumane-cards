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

    // Deal the new player 7 white cards.
    const whiteCards = new Set();
    while (whiteCards.size < 7) {
      const whiteCard = Cards.whiteCard;
      if (this._seenWhiteCards.includes(whiteCard)) continue;
      whiteCards.add(whiteCard);
      this._seenWhiteCards.push(whiteCard);
    }
    player.whiteCards = Array.from(whiteCards);
  }

  removePlayer(player) {
    const index = this._players.indexOf(player);
    this._players.splice(index, 1);
  }
}

module.exports.Game = Game;
