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

    $scope.ShoppingList1 = ["bread", "butter", "orange juice", "cake"];

    $scope.ShoppingList2 = [
      { name: "bread", quantity: 2 },
      { name: "butter", quantity: 2 },
      { name: "orange juice", quantity: 2 },
      { name: "cake", quantity: 2 }
    ];

    $scope.addToList = function() {
      // will use new vars created by ng-model
      var newItem = {
        name: $scope.newItemName,
        quantity: $scope.newItemQuantity
      };
      console.log(
        "item name: ",
        newItem.name,
        "item quantity: ",
        newItem.quantity
      );
      $scope.ShoppingList2.push(newItem);
    };

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
  }
})();
