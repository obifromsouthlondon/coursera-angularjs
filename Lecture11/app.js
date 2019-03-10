(function() {
  'use strict';
  angular.module("MsgApp", [])
  .controller("MsgController", MsgController);

  MsgController.$inject = ["$scope"]
  function MsgController($scope)
  {
    $scope.name = "MsgApp";
    $scope.stateOfBeing = "hungry";
    $scope.sayMessage = function()
    {
      return "Obi likes to eat healthy";
    };

    $scope.feedObi = function()
    {
      $scope.stateOfBeing = "fed";
    };
  }

}());
