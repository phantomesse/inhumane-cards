'use strict';

app.component('playerLogin', {
  templateUrl: 'components/player-login/player-login.html',
  controller: function ($scope) {
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
    }
  }
});
