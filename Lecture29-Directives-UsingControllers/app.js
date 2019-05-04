(function() {
  "use strict";

  angular
    .module("App", [])
    .controller("ShoppingListController", ShoppingListController)
    .factory("ShoppingListServiceFactory", ShoppingListServiceFactory)
    .factory("ShoppingListServiceFactoryOL", ShoppingListServiceFactoryOL)
    .provider("ShoppingListService", ShoppingListServiceProvider)
    .config(Config)
    .directive("listItemDescription", ListItemDescriptionTag)
    .directive("listItem", ListItemTag)
    .directive("shoppingList", shoppingListTag);

  function shoppingListTag() {
    var ddo = {
      restrict: "E",
      templateUrl: "shoppingList.html",
      scope:{
        items: "<", // one-way binding, we will not change the items in directive
        title: "@"
      },
      controller:ShoppingDirectiveListController,
      controllerAs: "list",
      bindToController: true
    };
    return ddo;
  }

  function ShoppingDirectiveListController(){
    var list = this;
    console.log("ShoppingDirectiveListController::items", list.items);
    list.isCookiesInList = function() {
      for (var i = 0; i < list.items.length; i++){
        var name = list.items[i].name;
        if (name.toLowerCase().indexOf("cookie") !== -1){
          return true;
        }
      }
    }
    return false;
  }

  function ListItemDescriptionTag() {
    var ddo = {
      template: "{{ item.quantity }} items of {{ item.name }}"
    };
    return ddo;
  }

  function ListItemTag() {
    var ddo = {
      restrict: "E",
      templateUrl: "listItem.html"
    };
    return ddo;
  }

  ShoppingListController.$inject = [
    "$scope",
    "ShoppingListServiceFactory"
  ];
  function ShoppingListController(
    $scope,
    ShoppingListServiceFactory
  ) {
    var slService = ShoppingListServiceFactory();
    var list1 = this;

    list1.showNumberOfWatchers = function() {
      console.log("# of watchers: ", $scope.$$watchersCount);
    };

    list1.itemName = "";
    list1.itemQuantity = "";
    list1.items = slService.getItems();

    var originalTitle = "Shopping List #1";
    list1.title = originalTitle + " - (" + list1.items.length + " items)"; // initial value

    list1.addItem = function() {
      try {
        slService.addItem(list1.itemName, list1.itemQuantity);
        list1.title = originalTitle + "(" + list1.items.length + " items)";
        console.log("ShoppingListController::items", list1.items);
      } catch (error) {
        list1.errorMessage = error.message;
      }
    };

    list1.removeItem = function(itemIndex) {
      slService.removeItem(itemIndex);
      list1.title = originalTitle + "(" + list1.items.length + " items)";
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
      return new ShoppingListService(provider.config.prop);
    };
  }

  Config.$inject = ["ShoppingListServiceProvider"];
  function Config(ShoppingListServiceProvider) {
    ShoppingListServiceProvider.config.prop = "Obi Orjiekwe";
  }
})();
