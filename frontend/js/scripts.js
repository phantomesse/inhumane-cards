'use strict';

const socket = io();
const app = angular.module('app', []);

app.controller('AppCtrl', function($scope, $timeout) {

  $('inhumane-cards-logo').click(function() {
    history.pushState(null, null, '/');
    setView();
  });

  setView();
  window.onpopstate = () => setView();

  function setView() {
    const parameters = getParameters();

    if ('game' in parameters) {
      $timeout(function() {
        $scope.shouldShowPlayerLogin = false;
      }, 0);
    } else {
      $timeout(function() {
        $scope.shouldShowPlayerLogin = true;
      }, 0);
    }
  }
  $scope.updateView = function() {
    setView();
  }
});

function getParameters() {
  const parameters = {};
  window.location.search.substr(1).split('&').forEach(
    function(parameterStr) {
      const parameter = parameterStr.split('=');
      parameters[parameter[0]] = parameter[1];
    });
  return parameters;
}
