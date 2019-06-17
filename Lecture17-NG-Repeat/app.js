(function() {
  "use strict";

  var app = angular
    .module("App", [])
    .controller("AppController", AppController);

  AppController.$inject = ["$scope"];
  function AppController($scope) {
    /* TEMPLATE - START */
    // variables:
    var ctrl = this;
    ctrl.appName = "App";
    ctrl.watchersCount = 0;

    ctrl.ShoppingList1 = ["bread", "butter", "orange juice", "cake"];

    ctrl.ShoppingList2 = [
      { name: "bread", quantity: 2 },
      { name: "butter", quantity: 2 },
      { name: "orange juice", quantity: 2 },
      { name: "cake", quantity: 2 }
    ];

    ctrl.addToList = function() {
      // will use new vars created by ng-model
      var newItem = {
        name: ctrl.newItemName,
        quantity: ctrl.newItemQuantity
      };
      console.log(
        "item name: ",
        newItem.name,
        "item quantity: ",
        newItem.quantity
      );
      ctrl.ShoppingList2.push(newItem);
    };

    // functions - custom:
    $scope.showNumberOfWatchers = function() {
      console.log("# of watchers: ", ctrl.$$watchersCount);
      ctrl.watchersCount = ctrl.$$watchersCount;
    };

    // functions - framework:
    $scope.$watch(function(newValue, oldValue) {
      //console.log("Digest Loop Fired");
    });
    /* TEMPLATE - END */
  }
})();
