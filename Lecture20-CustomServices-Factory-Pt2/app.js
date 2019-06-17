(function() {
  "use strict";

  var app = angular
    .module("App", [])
    .controller("ShoppingListController1", ShoppingListController1)
    .controller("ShoppingListController2", ShoppingListController2)
    .factory("ShoppingListServiceFactory", ShoppingListServiceFactory)
    .factory("ShoppingListServiceFactoryOL", ShoppingListServiceFactoryOL)
    .provider("ShoppingListService", ShoppingListServiceProvider)
    .config(Config);

  ShoppingListController1.$inject = [
    "$scope",
    "$filter",
    "ShoppingListServiceFactory"
  ];
  function ShoppingListController1(
    $scope,
    $filter,
    ShoppingListServiceFactory
  ) {
    $scope.showNumberOfWatchers = function() {
      console.log("# of watchers: ", $scope.$$watchersCount);
    };
    var slService = ShoppingListServiceFactory();
    var list1 = this;
    list1.itemName = "";
    list1.itemQuantity = "";

    list1.addItem = function() {
      slService.addItem(list1.itemName, list1.itemQuantity);
    };

    list1.removeItem = function(itemIndex) {
      slService.removeItem(itemIndex);
    };

    list1.items = slService.getItems();

    list1.printToConsole = function() {
      console.log("Shopping List Items: ", slService.getItems());
    };
  }

  ShoppingListController2.$inject = [
    "$scope",
    "$filter",
    "ShoppingListServiceFactoryOL"
  ];
  function ShoppingListController2(
    $scope,
    $filter,
    ShoppingListServiceFactoryOL
  ) {
    $scope.showNumberOfWatchers = function() {
      console.log("# of watchers: ", $scope.$$watchersCount);
    };

    var list2 = this;
    list2.itemName = "";
    list2.itemQuantity = "";

    var slService = ShoppingListServiceFactoryOL.getShoppingListService(3);

    list2.addItem = function() {
      try {
        slService.addItem(list2.itemName, list2.itemQuantity);
      } catch (error) {
        list2.errorMessage = error.message;
      }
    };

    list2.items = slService.getItems();

    list2.removeItem = function(itemIndex) {
      slService.removeItem(itemIndex);
    };
  }

  function ShoppingListService(maxItems) {
    var service = this;
    // shopping basket
    var items = [];

    service.addItem = function(itemName, itemQuantity) {
      if (
        maxItems === undefined ||
        (maxItems !== undefined && items.length < maxItems)
      ) {
        var item = {
          name: itemName,
          quantity: itemQuantity
        };
        items.push(item);
      } else {
        throw new Error("Max Items (" + maxItems + ") reached.");
      }
    };

    service.getItems = function() {
      return items;
    };

    service.removeItem = function(itemIndex) {
      items.splice(itemIndex, 1);
    };
  }

  function ShoppingListServiceFactory() {
    var factory = function(maxItems) {
      // instantiate service and return
      return new ShoppingListService(maxItems);
    };
    // a Function is returned
    return factory;
  }

  function ShoppingListServiceFactoryOL() {
    var factory = {
      getShoppingListService: function(maxItems) {
        // instantiate service and return
        return new ShoppingListService(maxItems);
      }
    };
    // a Function is returned
    return factory;
  }

  function ShoppingListServiceProvider() {
    var provider = this;
    provider.config = {};
    provider.$get = function() {
      var service = new ShoppingListService(provider.config.prop);
    };
  }

  Config.$inject = ["ShoppingListServiceProvider"];
  function Config(ShoppingListServiceProvider) {
    ShoppingListServiceProvider.config.prop = 2;
  }
})();
