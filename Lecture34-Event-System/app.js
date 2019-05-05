(function() {
  "use strict";

  angular
    .module("ShoppingListEventApp", [])
    .controller("ShoppingListController", ShoppingListController)
    .factory("ShoppingListServiceFactory", ShoppingListServiceFactory)
    .component("shoppingList", {
      // in-line configuration object
      templateUrl: "shoppingList.html",
      controller: ShoppingListComponentController, // angular will define $ctrl
      bindings: {
        // inputs and outputs
        items: "<", // one-way binding, we will not change the items in directive
        title: "@", // dom attribute value binding
        onRemove: "&" // reference function, callback to parent controller
      }
    })
    .component("loadingSpinner", {
      templateUrl: "spinner.html",
      controller: SpinnerController
    })
    .service("WeightLossFilterService", WeightLossFilterService);

  SpinnerController.$inject = ["$rootScope"];
  function SpinnerController($rootScope) {
    var $ctrl = this;
    // Listener - fired everytime this view is visited
    // root scope is never destroyed till entire app is destroyed
    var deregisterListenerFxn = $rootScope.$on(
      "shoppingList:processing",
      function(event, data) {
        console.log("$rootScope.$on: event - ", event, "; data - ", data);
        if (data.on) {
          $ctrl.showSpinner = true;
        } else {
          $ctrl.showSpinner = false;
        }
      }
    );

    // remove listener from memory
    $ctrl.$onDestroy = function() {
      console.log("$onDestroy");
      deregisterListenerFxn();
    };
  }

  ShoppingListComponentController.$inject = [
    "WeightLossFilterService",
    "$rootScope",
    "$element",
    "$q"
  ];
  function ShoppingListComponentController(
    WeightLossFilterService,
    $rootScope,
    $element,
    $q
  ) {
    var $ctrl = this;
    var totalItems;
    $ctrl.isCookiesInList = function() {
      for (var i = 0; i < $ctrl.items.length; i++) {
        var name = $ctrl.items[i].name;
        if (name.toLowerCase().indexOf("cookie") !== -1) {
          return true;
        }
      }
      return false;
    };

    $ctrl.remove = function(myIndex) {
      // delegate to reference method
      $ctrl.onRemove({ index: myIndex });
    };

    $ctrl.$onInit = function() {
      totalItems = 0;
    };

    $ctrl.$onChanges = function(changeObj) {
      // items is not watched because the reference remains the same
    };

    // more performant, and we can get away from get away from $scope
    // invoked everytime through the digest loop
    $ctrl.$doCheck = function() {
      // number of items changed, check if there is a cookie in list
      if ($ctrl.items.length !== totalItems) {
        totalItems = $ctrl.items.length;

        // inform subscribers check is happening
        $rootScope.$broadcast("shoppingList:processing", { on: true });

        var promises = [];
        for (var i = 0; i < $ctrl.items.length; i++) {
          promises.push(WeightLossFilterService.checkName($ctrl.items[i].name));
        }

        // first cookie detected - cancel promises!
        $q.all(promises)
          .then(function(result) {
            // positive result
            // hide warning
            var warningElement = $element.find("div.error");
            warningElement.slideUp(900);
          })
          .catch(function(result) {
            // rest of the promises will get cancelled here
            var warningElement = $element.find("div.error");
            warningElement.slideDown(900);
          })
          .finally(function() {
            // inform subscribers check is finished
            $rootScope.$broadcast("shoppingList:processing", { on: false });
          });
      }
    };
  }

  WeightLossFilterService.$inject = ["$q", "$timeout"];
  function WeightLossFilterService($q, $timeout) {
    var wlfService = this;

    wlfService.checkName = function(itemName) {
      var deferred = $q.defer();
      var result = { message: itemName + " OK!" };

      $timeout(function() {
        if (!itemName.toLowerCase().includes("cookie")) {
          // approve our promise
          deferred.resolve(result);
        } else {
          result.message = "You are not allowed Cookies";
          // reject our promise
          deferred.reject(result);
        }
        // wait 3 seconds before this entire functionality is executed
      }, 3000);

      return deferred.promise;
    };
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
