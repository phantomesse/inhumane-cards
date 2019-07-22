'use strict';

app.component('whiteCards', {
  templateUrl: 'components/white-cards/white-cards.html',
  controller: function ($scope) {
    const parameters = getParameters();

    $scope.contents = [];
    $.get('/white-cards', { player: parameters['player'], game: parameters['game'] }, function (response) {
      $scope.contents = response;
      $scope.$apply();
    });

    const selectedCards = [];
    $scope.deselectCards = function (selectedCard) {
      console.log('selected card is ' + selectedCard.selected);
    };
  }
});
