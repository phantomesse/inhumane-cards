'use strict';

class Player {
  constructor(socket, app) {
    this._socket = socket;
    this._app = app;

    this.name;
    this.gameId;
    this.blackCards = [];
    this.whiteCards = [];


    const self = this;
    socket.on('setPlayerName', function (name) {
      self.name = name;
      console.log(`${self.name} connected`);
    });

    socket.on('addPlayerToGame', function (gameId) {
      app.addPlayerToGame(self, gameId);
    });

    socket.on('disconnect', function () {
      if (self.gameId === undefined) return;
      app.removePlayerFromGame(self, self.gameId);
      console.log(`${self.name} disconnected`);
    });
  }
}

module.exports.Player = Player;
