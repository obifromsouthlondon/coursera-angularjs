(function() {
  "use strict";
  angular
    .module("ShoppingListEventApp")
    .factory("ShoppingListServiceFactory", ShoppingListServiceFactory);

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
})();
