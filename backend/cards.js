'use strict';

const fs = require('fs');
const path = require('path');

/// Contains all potential black and white cards.
class Cards {
  constructor() {
    this._blackCards = Cards._getCards('black-cards');
    this._whiteCards = Cards._getCards('white-cards');
  }

  /// Returns a random black card.
  get blackCard() {
    return Cards._getRandomElement(this._blackCards);
  }

  /// Returns a random white card.
  get whiteCard() {
    return Cards._getRandomElement(this._whiteCards);
  }

  /// Returns a random element from an array.
  static _getRandomElement(array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
  }

  /// Reads in cards from all files in a directory.
  static _getCards(directory) {
    const directoryPath = path.join(__dirname, `../data/${directory}/`);
    const fileNames = fs.readdirSync(directoryPath);

    let cards = [];
    for (const fileName of fileNames) {
      const filePath = path.join(directoryPath, fileName);
      const contents = fs.readFileSync(filePath, 'utf8').split('\n');
      cards = cards.concat(contents);
    }

    return cards;
  }
}

module.exports = new Cards();
