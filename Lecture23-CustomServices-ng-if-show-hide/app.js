(function() {
  "use strict";

  var app = angular
    .module("App", [])
    .controller("ShoppingListController", ShoppingListController)
    .provider("ShoppingListService", ShoppingListServiceProvider)
    .config(Config);

  ShoppingListController.$inject = ["ShoppingListService"];
  // referencing the provider automatically returns an instance
  function ShoppingListController(ShoppingListService) {
    console.log("ShoppingListService: ", ShoppingListService);
    var list1 = this;
    list1.itemName = "";
    list1.itemQuantity = "";

    list1.addItem = function() {
      try {
        ShoppingListService.addItem(list1.itemName, list1.itemQuantity);
      } catch (error) {
        list1.errorMessage = error.message;
      }
    };

    list1.removeItem = function(itemIndex) {
      ShoppingListService.removeItem(itemIndex);
    };

    list1.items = ShoppingListService.getItems();

    list1.printToConsole = function() {
      console.log("Shopping List Items: ", ShoppingListService.getItems());
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

  function ShoppingListServiceProvider() {
    var provider = this;
    provider.defaults = {
      maxItems: 10
    };

    provider.config = {};
    provider.$get = function() {
      return new ShoppingListService(provider.defaults.maxItems);
    };
  }

  Config.$inject = ["ShoppingListServiceProvider"];
  function Config(ShoppingListServiceProvider) {
    ShoppingListServiceProvider.config.prop = "Obi Orjiekwe";
    ShoppingListServiceProvider.defaults.maxItems = 2;
  }
})();
