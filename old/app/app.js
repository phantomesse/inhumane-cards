'use strict';

const GameSession = require('./game-session.js');
const UserSession = require('./user-session.js');

/** Holds all global data and functions for app. */
class App {
  constructor() {
    /**
     * Map of game id to GameSession object for all games in this app.
     */
    this._gameIdToGameSessionMap = new Map();
  }

  /**
   * Retrieves a game session and creates the game session if it doesn't exist.
   */
  getGameSession(gameId) {
    // If game session doesn't exist, then create a new one.
    if (!this._gameIdToGameSessionMap.has(gameId)) {
      this._gameIdToGameSessionMap.set(gameId, new GameSession(gameId));
    }

    return this._gameIdToGameSessionMap.get(gameId);
  }

  /** Retrieves all game sessions. */
  get allGameSessions() {
    return Array.from(this._gameIdToGameSessionMap.values());
  }

  /** Adds a new user to a game session. */
  addUser(userId, gameId) {
    const gameSession = this.getGameSession(gameId);
    if (gameSession.hasUser(userId)) return gameSession.getUser(userId);

    const userSession = new UserSession(userId);
    gameSession.addUser(userSession);

    return userSession;
  }
}

module.exports = new App();
