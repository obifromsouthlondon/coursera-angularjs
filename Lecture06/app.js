(function() {
  'use strict';
  var app = angular.module("MyCalculateNumericApp", []);
  app.controller("MyCalculateNumericController", function($scope) {
    $scope.name = "";
    $scope.totalValue = 0;
    $scope.displayNumeric =
      function ()
      {
        var totalNameValue = calculateNumericValueForString($scope.name);
        $scope.totalValue = totalNameValue;
      }
  });

  function calculateNumericValueForString(string)
  {
    var totalStringValue = 0;
    for (var i = 0; i < string.length; i++) {
      totalStringValue += string.charCodeAt(i);
    }
    return totalStringValue;
  }
}());
