(function() {
  "use strict";

  var app = angular
    .module("App", [])
    .controller("AppController", AppController);

  AppController.$inject = ["$scope", "$filter"];
  function AppController($scope, $filter) {
    /* TEMPLATE - START */
    // variables:
    $scope.appName = "App";
    $scope.watchersCount = 0;

    // functions - custom:
    $scope.showNumberOfWatchers = function() {
      console.log("# of watchers: ", $scope.$$watchersCount);
      $scope.watchersCount = $scope.$$watchersCount;
    };

    // functions - framework:
    $scope.$watch(function(newValue, oldValue) {
      //console.log("Digest Loop Fired");
    });
    /* TEMPLATE - END */

    $scope.ShoppingList = [
      { name: "bread", quantity: 2 },
      { name: "butter", quantity: 3 },
      { name: "orange juice", quantity: 4 },
      { name: "cake", quantity: 2 }
    ];
  }
})();
