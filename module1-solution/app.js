(function() {
  'use strict';
  angular.module("LunchCheck", [])
  .controller("LunchCheckController", LunchCheckController);

  LunchCheckController.$inject = ["$scope"];
  function LunchCheckController($scope)
  {
    $scope.message = "";
    $scope.itemsForLunch = "";
    $scope.checkIfTooMuch = function()
    {
      if ($scope.itemsForLunch.split(",").filter(String).length <= 3)
      {
        $scope.message = "Enjoy!";
      }
      else
      {
        $scope.message = "Too much!";
      }
    };
  };

}());
