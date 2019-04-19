(function() {
  "use strict";

  var app = angular
    .module("App", [])
    .controller("ShoppingListAddController", ShoppingListAddController)
    .controller("ShoppingListShowController", ShoppingListShowController)
    .service("ShoppingListService", ShoppingListService)
    .factory("ShoppingListServiceFactory", ShoppingListServiceFactory)
    .factory("ShoppingListServiceFactoryOL", ShoppingListServiceFactoryOL);

  ShoppingListAddController.$inject = [
    "$scope",
    "$filter",
    "ShoppingListServiceFactory"
  ];
  function ShoppingListAddController(
    $scope,
    $filter,
    ShoppingListServiceFactory
  ) {
    $scope.showNumberOfWatchers = function() {
      console.log("# of watchers: ", $scope.$$watchersCount);
    };
    var slService = ShoppingListServiceFactory();
    console.log("ShoppingListAddController::ShoppingListService: ", slService);
    var itemAdder = this;
    itemAdder.itemName = "";
    itemAdder.itemQuantity = "";

    itemAdder.addItem = function() {
      slService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
    };

    itemAdder.printToConsole = function() {
      console.log("Shopping List Items: ", slService.getItems());
    };
  }

  ShoppingListShowController.$inject = [
    "$scope",
    "$filter",
    "ShoppingListServiceFactoryOL"
  ];
  function ShoppingListShowController(
    $scope,
    $filter,
    ShoppingListServiceFactoryOL
  ) {
    $scope.showNumberOfWatchers = function() {
      console.log("# of watchers: ", $scope.$$watchersCount);
    };

    var showList = this;
    var slService = ShoppingListServiceFactoryOL.getShoppingListService();
    console.log("ShoppingListShowController::ShoppingListService: ", slService);
    showList.items = slService.getItems();
    showList.removeItem = function(itemIndex) {
      slService.removeItem(itemIndex);
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
      console.log("ShoppingListService.Item: ", item);
    };

    service.getItems = function() {
      return items;
    };

    service.removeItem = function(itemIndex) {
      items.splice(itemIndex, 1);
    };
  }

  function ShoppingListServiceFactory() {
    var factory = function() {
      // instantiate service and return
      return new ShoppingListService();
    };
    // a Function is returned
    return factory;
  }

  function ShoppingListServiceFactoryOL() {
    var factory = {
      getShoppingListService: function() {
        // instantiate service and return
        return new ShoppingListService();
      }
    };
    // a Function is returned
    return factory;
  }
})();
