'use strict';

app.component('playerLogin', {
  templateUrl: 'components/player-login/player-login.html',
  bindings: { onJoinGame: '&' },
  controller: function ($scope) {
    const $ctrl = this;

    $scope.name = '';
    $scope.sanitizeName = function () {
      // Make the name all lowercase.
      $scope.name = $scope.name.toLowerCase();

      // Replace all non-letter and non-numbers with hypens.
      $scope.name = $scope.name.replace(/[^a-z0-9]+/g, '-');

      // Remove any trailing hypens.
      while ($scope.name[$scope.name.length - 1] === '-') {
        $scope.name = $scope.name.substring(0, $scope.name.length - 2);
      }
    };

    $scope.existingGames = [];
    $.get('/existing-game-ids', function (response) {
      $scope.existingGames = response;
      $scope.$apply();
    });

    $scope.joinExistingGame = function (game) {
      if ($scope.name === '') {
        $('input[type=text]').focus();
        return;
      }
      joinGame(game);
    };

    $scope.createNewGame = function () {
      if ($scope.name === '') {
        $('input[type=text]').focus();
        return;
      }
      $.post('/create-new-game', function (game) {
        joinGame(game);
      });
    };

    function joinGame(game) {
      history.pushState(null, null, `?game=${game}&player=${$scope.name}`);
      $ctrl.onJoinGame();
      socket.emit('setPlayerName', $scope.name);
      socket.emit('addPlayerToGame', game);
    }
  }
});
