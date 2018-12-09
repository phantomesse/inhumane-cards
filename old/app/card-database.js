'use strict';

const fs = require('fs');
const path = require('path');

const _BLACK_CARDS_DIRECTORY_PATH = path.join(__dirname, '../data/black-cards/');
const _WHITE_CARDS_DIRECTORY_PATH = path.join(__dirname, '../data/white-cards/');

/** Loads and holds all black and white cards. */
class CardDatabase {
  constructor() {
    this._blackCards = CardDatabase._getCards(_BLACK_CARDS_DIRECTORY_PATH);
    this._whiteCards = CardDatabase._getCards(_WHITE_CARDS_DIRECTORY_PATH);
  }

  /** Returns a random BlackCard. */
  get blackCard() {
    return CardDatabase._getRandomElement(this._blackCards);
  }

  /** Returns a random WhiteCard. */
  get whiteCard() {
    return CardDatabase._getRandomElement(this._whiteCards);
  }

  /** Returns a random element from an array. */
  static _getRandomElement(array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
  }

  /**
   * Reads all the content in for black or white cards and converts the content
   * to BlackCard or WhiteCard objects.
   */
  static _getCards(directoryPath) {
    const cardPackFileNames = fs.readdirSync(directoryPath);

    let cards = [];
    for (const fileName of cardPackFileNames) {
      const cardPack = fileName.split('.')[0];
      const filePath = path.join(directoryPath, fileName);
      const contents = fs.readFileSync(filePath, 'utf8').split('\n');
      cards = cards.concat(contents.map(function(content) {
        return directoryPath === _BLACK_CARDS_DIRECTORY_PATH ?
          new BlackCard(content, cardPack) :
          new WhiteCard(content, cardPack);
      }));
    }

    return cards;
  }
}

/** Abstract card that holds default properties for a card. */
class _AbstractCard {
  constructor(content, cardPack) {
    if (new.target === _AbstractCard) {
      throw new TypeError(
        'Cannot construct _AbstractCard instances directly.');
    }

    this.content = content;
    this.cardPack = cardPack;
  }
}

class WhiteCard extends _AbstractCard {
  constructor(content, cardPack) {
    super(content, cardPack);
  }
}

class BlackCard extends _AbstractCard {
  constructor(content, cardPack) {
    super(content, cardPack);
  }

  /** Corresponds to the number of white cards required in the answer. */
  get blankSpaceCount() {
    console.log(this.content);
    return 1;
  }
}

module.exports = new CardDatabase();
