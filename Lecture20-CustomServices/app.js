(function() {
  "use strict";

  var app = angular
    .module("App", [])
    .controller("ShoppingListAddController", ShoppingListAddController)
    .controller("ShoppingListShowController", ShoppingListShowController)
    .service("ShoppingListService", ShoppingListService);

  ShoppingListAddController.$inject = [
    "$scope",
    "$filter",
    "ShoppingListService"
  ];
  function ShoppingListAddController($scope, $filter, ShoppingListService) {
    $scope.showNumberOfWatchers = function() {
      console.log("# of watchers: ", $scope.$$watchersCount);
    };

    var itemAdder = this;
    itemAdder.itemName = "";
    itemAdder.itemQuantity = "";

    itemAdder.addItem = function() {
      ShoppingListService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
    };

    itemAdder.printToConsole = function() {
      console.log("My Items: ", ShoppingListService.getItems());
    };
  }

  ShoppingListShowController.$inject = [
    "$scope",
    "$filter",
    "ShoppingListService"
  ];
  function ShoppingListShowController($scope, $filter, ShoppingListService) {
    $scope.showNumberOfWatchers = function() {
      console.log("# of watchers: ", $scope.$$watchersCount);
    };

    var showList = this;
    showList.items = ShoppingListService.getItems();
    showList.removeItem = function(itemIndex) {
      ShoppingListService.removeItem(itemIndex);
    };
  }

  function ShoppingListService() {
    var service = this;
    // shopping basket
    var items = [];

    service.addItem = function(itemName, itemQuantity) {
      var item = {
        name: itemName,
        quantity: itemQuantity
      };
      items.push(item);
    };

    service.getItems = function() {
      return items;
    };

    service.removeItem = function(itemIndex) {
      items.splice(itemIndex, 1);
    };
  }
})();
