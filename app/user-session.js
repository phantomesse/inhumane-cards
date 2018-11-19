'use strict';

/** Session for a user in a game session. */
class UserSession {
  constructor(userId) {
    /** Unique id to identify a user in a game session. */
    this.userId = userId;

    /** Name that the user would like to have displayed on the screen.
    This can be changed throughout the game. TODO: generate a display name*/
    this.userName = userId;

    /** Whether the user is currently the judge or not. */
    this.isJudge = false;

    /** List of black cards that this user has won. */
    this._blackCardsWon = [];

    /**
     * White cards that are in the user's hand.
     *
     * This does not include the active white cards.
     */
    this.whiteCardsInHand = [];

    /** White cards that this user has chosen to play in the round. */
    this.activeWhiteCards = [];
  }

  /**
   * Adds a black card to the collection of black cards that this user has won.
   */
  winBlackCard(blackCard) {
    this._blackCardsWon.push(blackCard);
  }

  /** Returns the number of black cards that this user has won. */
  get score() {
    return this._blackCardsWon.length;
  }

  get json() {
    return {
      userId: this.userId,
      userName: this.userName,
      isJudge: this.isJudge,
      score: this.score,
      whiteCardsInHand: this.whiteCardsInHand.map((card) => card.content),
      activeWhiteCards: this.activeWhiteCards.map((card) => card.content)
    };
  }
}

module.exports = UserSession;
