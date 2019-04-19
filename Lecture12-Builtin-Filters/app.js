(function() {
  "use strict";
  angular.module("MsgApp", []).controller("MsgController", MsgController);

  MsgController.$inject = ["$scope", "$filter"];
  function MsgController($scope, $filter) {
    $scope.name = "MsgApp";
    $scope.stateOfBeing = "hungry";
    $scope.cookieCost = 0.45;
    $scope.sayMessage = function() {
      if ($scope.stateOfBeing === "fed") {
        return (
          $filter("uppercase")("Obi likes to eat healthy. cost of hunger is ") +
          $filter("currency")(10, "GBP£", 0.0)
        );
      } else {
        return (
          "Obi likes is hungry. cost of hunger is " +
          $filter("currency")(100, "GBP£", 0)
        );
      }
    };

    $scope.feedObi = function() {
      $scope.stateOfBeing = "fed";
    };
  }
})();
