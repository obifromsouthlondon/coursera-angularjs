(function() {
  'use strict';
  var app = angular.module("MyFirstAngularApp", []);
  app.controller("MyFirstController", function($scope)
  {
    $scope.name = "Obi Orjiekwe";
    $scope.sayHello = function()
    {
      return "Hello Coursera!";
    }
  });
}());
