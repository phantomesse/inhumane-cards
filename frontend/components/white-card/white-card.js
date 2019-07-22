'use strict';

app.component('whiteCard', {
  bindings: {
    content: '=',
    onSelect: '&'
  },
  templateUrl: 'components/white-card/white-card.html',
  controller: function ($scope) {
    const $ctrl = this;

    $scope.selected = false;

    $scope.select = function () {
      $scope.selected = true;
      $ctrl.onSelect();
    };
  }
});
