'use strict';

const UserSession = require('./user-session.js');
const cardDatabase = require('../app/card-database.js');

/** Session for a game. */
class GameSession {
  constructor(gameId) {
    /** Key for logging into play this particular game. */
    this._gameId = gameId;

    /**
     * Map of user id to UserSession object for all users in this game.
     */
    this._userIdToUserSessionMap = new Map();

    /** List of black and white cards that are in the discard pile. */
    this._discardCards = [];

    /** Current black card that is in play. */
    this._activeBlackCard = cardDatabase.blackCard;
  }

  /** Returns all the user sessions active in this game. */
  get _userSessions() {
    return this._userIdToUserSessionMap.values();
  }

  /** Checks if there is already a user with the given user id. */
  hasUser(userId) {
    return this._userIdToUserSessionMap.has(userId);
  }

  /** Returns a user session. */
  getUser(userId) {
    return this._userIdToUserSessionMap.get(userId);
  }

  /** Adds a new user and deals the new user cards. */
  addUser(userSession) {
    this._userIdToUserSessionMap.set(userSession.userId, userSession);

    // Make the user the judge if it's the first user.
    if (this._userIdToUserSessionMap.length === 1) {
      userSession.isJudge = true;
    }

    while (userSession.whiteCardsInHand.length < 7) {
      userSession.whiteCardsInHand.push(this._whiteCard);
    }
  }

  /** Starts a new round of the game. */
  startNewRound() {
    // Discard the last black card.
    this._discardCards.push(this._activeBlackCard);

    // Pick a black card.
    // TODO(lauren): Add a test to make sure that this works.
    do {
      this._activeBlackCard = cardDatabase.blackCard;
    } while (this._discardCards.includes(this._activeBlackCard));

    // Pick and set the next judge.
    const userSessions = this._userSessions;
    let lastJudgeIndex = 0;
    for (let i = 0; i < userSessions.length; i++) {
      if (userSessions[i].isJudge) {
        lastJudgeIndex = i;
        break;
      }
    }
    userSessions[lastJudgeIndex].isJudge = false;
    userSessions[lastJudgeIndex + 1 % userSessions.length].isJudge = true;

    // Discard all players' last white cards.
    for (let userSession of userSessions) {
      this._discardCards = this._discardCards.concat(userSession.activeWhiteCards);
      userSession.activeWhiteCards = [];
    }

    // Add enough white cards to each player's hand to ensure that they have 7
    // cards.
    for (let userSession of userSessions) {
      while (userSession.whiteCardsInHand.length < 7) {
        userSession.whiteCardsInHand.push(this._whiteCard);
      }
    }
  }

  /**
   * Gets a random white card that is not in the discard pile and is not in the
   * hand of any user.
   */
  // TODO(lauren): Add test.
  get _whiteCard() {
    const whiteCard = cardDatabase.whiteCard;

    // Check that the card is not in the discard pile.
    if (this._discardCards.includes(whiteCard)) return this._whiteCard;

    // Check that the card does not belong to any user.
    const userSessions = this._userSessions;
    for (let userSession of userSessions) {
      const whiteCardsInPlay = userSession.whiteCardsInHand.concat(
        userSession.activeWhiteCards);
      if (whiteCardsInPlay.includes(whiteCard)) return this._whiteCard;
    }

    return whiteCard;
  }

  /** Returns the JSON to return to the UI. */
  get json() {
    const usersJSON = Array.from(this._userSessions).map(function(userSession) {
      return {
        userId: userSession.userId,
        userName: userSession.userName,
        isJudge: userSession.isJudge,
        score: userSession.score
      };
    });

    return {
      gameId: this._gameId,
      users: usersJSON,
      activeBlackCard: this._activeBlackCard.content
    };
  }
}

module.exports = GameSession;
