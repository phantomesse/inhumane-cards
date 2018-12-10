'use strict';

const https = require('https');

/// Contains a list of potential game ids created using the username generator service.
class GameIds {
  constructor() {
    this._ids = [];

    const self = this;
    GameIds._getGameIds().then(function (response) {
      self._ids = response;
    });
  }

  get newGameId() {
    return this._ids.pop();
  }

  static _getGameIds() {
    const url = 'https://animal-username.herokuapp.com?count=100';

    return new Promise(function (resolve, reject) {
      https.get(url, function (response) {
        response.on('data', function (data) {
          resolve(JSON.parse(data));
        });
      }).on('error', function (error) {
        reject(error);
      });
    });
  }
}

module.exports = new GameIds();
