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
    .directive("shoppingList", shoppingListTag);

  function shoppingListTag() {
    var ddo = {
      restrict: "E",
      templateUrl: "shoppingList.html",
      scope: {
        items: "<", // one-way binding, we will not change the items in directive
        title: "@",
        dirRemoveItem: "&method"
      },
      controller: ShoppingDirectiveListController,
      controllerAs: "list",
      bindToController: true,
      link: ShoppingListDirectiveLink
    };
    return ddo;
  }

  function ShoppingListDirectiveLink(scope, element, attrs, controller) {
    // console.log("link scope: ", scope);
    console.log("element: ", element);
    // console.log("attrs: ", attrs);
    // console.log("controller instance: ", controller);

    // watch - glue to trigger call to function.  use a watch in a controller to call method
    scope.$watch("list.isCookiesInList()", function(newValue, oldValue) {
      console.log(
        "ShoppingListDirectiveLink::New Value = ",
        newValue,
        ", oldValue = ",
        oldValue
      );

      if (newValue === true) {
        displayCookieWarning();
      } else {
        removeCookieWarning();
      }
    });

    function displayCookieWarning() {
      // jqlite
      // the only div within template
      // good way to find elements within
      var warningDiv = element.find("div");
      console.log(
        "displayCookieWarning()::element.find('div'): ",
        warningDiv
      );
      warningDiv.css("display", "block");
    }

    function removeCookieWarning() {
      var warningDiv = element.find("div");
      warningDiv.css("display", "none");
      console.log("removeCookieWarning()::element.find('div'): ", warningDiv);
    }
  }

  function ShoppingDirectiveListController() {
    var list = this;
    var cookiesInList = false;
    list.isCookiesInList = function() {
      for (var i = 0; i < list.items.length; i++) {
        var name = list.items[i].name;
        if (name.toLowerCase().indexOf("cookie") !== -1) {
          console.log("list.isCookiesInList(): ", true);
          return true;
        }
      }
    };

    console.log("list.isCookiesInList(): ", false);
    return false;
  }

  function ListItemDescriptionTag() {
    var ddo = {
      template: "{{ item.quantity }} items of {{ item.name }}"
    };
    return ddo;
  }

  ShoppingListController.$inject = ["$scope", "ShoppingListServiceFactory"];
  function ShoppingListController($scope, ShoppingListServiceFactory) {
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
      } catch (error) {
        list1.errorMessage = error.message;
      }
    };

    list1.removeItem = function(itemIndex) {
      list1.lastItemRemoved = list1.items[itemIndex].name;
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
