(function() {
  "use strict";
  angular
    .module("ShoppingListEventApp")
    .controller("ShoppingListController", ShoppingListController);

  ShoppingListController.$inject = ["ShoppingListServiceFactory"];
  function ShoppingListController(ShoppingListServiceFactory) {
    var slService = ShoppingListServiceFactory();
    var list1 = this;

    list1.itemName = "";
    list1.itemQuantity = "";
    list1.items = slService.getItems();

    var originalTitle = "Shopping List";
    list1.title = originalTitle + " - (" + list1.items.length + " items)"; // initial value

    list1.addItem = function() {
      try {
        slService.addItem(list1.itemName, list1.itemQuantity);
        list1.title = originalTitle + " - (" + list1.items.length + " items)";
      } catch (error) {
        list1.errorMessage = error.message;
      }
    };

    list1.removeItem = function(itemIndex) {
      list1.lastItemRemoved = list1.items[itemIndex].name;
      slService.removeItem(itemIndex);
      list1.title = originalTitle + " - (" + list1.items.length + " items)";
    };

    list1.printToConsole = function() {
      console.log("Shopping List Items: ", slService.getItems());
    };
  }
})();
