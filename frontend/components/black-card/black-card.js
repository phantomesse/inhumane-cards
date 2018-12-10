'use strict';

app.component('blackCard', {
  templateUrl: 'components/black-card/black-card.html',
  controller: function ($scope) {
    const game = getParameters()['game'];

    $scope.content = '';
    $.get('/black-card', { game: game }, function (response) {
      $scope.content = response;
      $scope.$apply();
    });
  }
});
