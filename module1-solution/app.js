(function() {
  "use strict";
  angular
    .module("LunchCheck", [])
    .controller("LunchCheckController", LunchCheckController);

  LunchCheckController.$inject = ["$scope"];
  function LunchCheckController($scope) {
    $scope.message = "";
    $scope.itemsForLunch = "";
    $scope.style = {};
    $scope.colour = {};

    $scope.checkIfTooMuch = function() {
      $scope.style = { border: "1px solid green" };
      $scope.colour = { color: "green" };

      if ($scope.itemsForLunch === "") {
        $scope.message = "Please enter data first";
        $scope.style = { border: "1px solid red" };
        $scope.colour = { color: "red" };
      } else if ($scope.itemsForLunch.split(",").filter(String).length <= 3) {
        $scope.message = "Enjoy!";
      } else {
        $scope.message = "Too much!";
      }
    };
  }
})();

function myAlert() {
  alert("Hey!");
}
