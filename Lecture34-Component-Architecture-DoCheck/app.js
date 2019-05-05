(function() {
  "use strict";

  angular
    .module("ShoppingListComponentApp", [])
    .controller("ShoppingListController", ShoppingListController)
    .factory("ShoppingListServiceFactory", ShoppingListServiceFactory)
    .component("shoppingList", { // in-line configuration object
      templateUrl: "shoppingList.html",
      controller: ShoppingListComponentController, // angular will define $ctrl
      bindings: { // inputs and outputs
        items: "<", // one-way binding, we will not change the items in directive
        title: "@", // dom attribute value binding
        onRemove: "&" // reference function, callback to parent controller
      }
    });

  ShoppingListComponentController.$inject = ["$element"];
  function ShoppingListComponentController($element){
    var $ctrl = this;
    var totalItems;
    $ctrl.isCookiesInList = function() {
      for (var i = 0; i < $ctrl.items.length; i++){
        var name = $ctrl.items[i].name;
        if (name.toLowerCase().indexOf("cookie") !== -1){
          return true;
        }
      }
      return false;
    }

    $ctrl.remove = function(myIndex){
      // delegate to reference method
      $ctrl.onRemove({index: myIndex});
    }

    $ctrl.$onInit = function(){
      console.log("Executing $onInit()"); // once
      totalItems = 0;
    }

    $ctrl.$onChanges = function(changeObj){
      // items is not watched because the reference remains the same
      console.log("Executing $onChanges(): changeObj = ", changeObj); // once
    }

    // more performant, and we can get away from get away from $scope
    $ctrl.$doCheck = function() {
      console.log("Executing $doCheck() - # of items change, check for cookies");
      // manipulate the DOM from here
      if ($ctrl.items.length !== totalItems){
        totalItems = $ctrl.items.length;
        if ($ctrl.isCookiesInList()){
          // show warning
          // look only in the element of our controller not entire page
          var warningElement = $element.find("div.error");
          warningElement.slideDown(900);
        }
        else {
          // hide warning
          console.log("Executing $doCheck() - no cookies found!");
          var warningElement = $element.find("div.error");
          warningElement.slideUp(900);
        }
      };
    }
  }

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
