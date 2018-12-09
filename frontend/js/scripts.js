'use strict';

const socket = io();
const app = angular.module('app', []);

app.controller('AppCtrl', function ($scope) {
  $scope.title = "This is a title";
});
