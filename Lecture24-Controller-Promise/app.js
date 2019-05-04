(function() {
  "use strict";

  angular
    .module("App", [])
    .controller("ShoppingListAddController", ShoppingListAddController)
    .controller("ShoppingListShowController", ShoppingListShowController)
    .service("ShoppingListService", ShoppingListService)
    .service("WeightLossFilterService", WeightLossFilterService);

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

    wlfService.checkQuantity = function(itemQuantity) {
      var deferred = $q.defer();
      var result = { message: itemQuantity + " OK!" };

      if (itemQuantity <= 5) {
        //potentially take a few seconds
        deferred.resolve(result);
      } else {
        result.message = "That's too much!";
        deferred.reject(result);
      }
      return deferred.promise;
    };
  }

  // $q - allow for parallel execution
  ShoppingListService.$inject = ["$q", "WeightLossFilterService"];
  function ShoppingListService($q, WeightLossFilterService) {
    var service = this;
    // shopping basket\
    service.items = [];

    service.addItem_Nested_Promises = function(itemName, itemQuantity) {
      var promise = WeightLossFilterService.checkName(itemName);
      promise.then(
        function(response) {
          console.log("ShoppingListService::addItem_Version1: ", response.message);
          var nextPromise = WeightLossFilterService.checkQuantity(itemQuantity);
          nextPromise.then(
            function(nextResponse) {
              console.log("ShoppingListService::addItem_Version1: ", nextResponse.message);
              var item = {
                name: itemName,
                quantity: itemQuantity
              };
              service.items.push(item);
            },
            function(nextErrorResponse) {
              console.log(nextErrorResponse.message);
            }
          );
        },
        function(errorResponse) {
          console.log(errorResponse.message);
        }
      );
    };

    service.addItem_Chained_Promises = function(itemName, itemQuantity) {
      var promise = WeightLossFilterService.checkName(itemName);
      promise
        .then(function(response) {
          console.log("Check Name - ShoppingListService::addItem_Version2: ", response.message);
          // OK - call the next checker - returns a Promise too - can chain
          return WeightLossFilterService.checkQuantity(itemQuantity);
        })
        .then(function(response) {
          console.log("Check Quantity - ShoppingListService::addItem_Version2: ", response.message);
          var item = {
            name: itemName,
            quantity: itemQuantity
          };
          service.items.push(item);
        })
        .catch(function(errorMesage) {
          console.log(errorMesage.message);
        });
    };

    service.addItem_Parallel_Promises = function(itemName, itemQuantity) {
      var namePromise = WeightLossFilterService.checkName(itemName);
      var qtyPromise = WeightLossFilterService.checkQuantity(itemQuantity);

      $q.all([namePromise,qtyPromise])
      .then(function(response) {
        console.log("ShoppingListService::addItem_Parallel_Promises: ", response);
        var item = {
          name: itemName,
          quantity: itemQuantity
        };
        service.items.push(item);
      })
      .catch(function(errorMesage) {
        console.log(errorMesage.message);
      });
    };

    service.getItems = function() {
      return service.items;
    };

    service.getErrorMessage = function() {
      return service.errorMessage;
    };

    service.removeItem = function(itemIndex) {
      items.splice(itemIndex, 1);
    };
  }

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
      ShoppingListService.addItem_Parallel_Promises(
        itemAdder.itemName,
        itemAdder.itemQuantity
      );
    };

    itemAdder.errorMessage = ShoppingListService.getErrorMessage();

    itemAdder.printToConsole = function() {
      console.log("My Items: ", ShoppingListService.getItems());
    };
  }

  ShoppingListShowController.$inject = [
    "$scope",
    "ShoppingListService"
  ];
  function ShoppingListShowController($scope, ShoppingListService) {
    $scope.showNumberOfWatchers = function() {
      console.log("# of watchers: ", $scope.$$watchersCount);
    };

    var showList = this;
    showList.items = ShoppingListService.getItems();
    showList.removeItem = function(itemIndex) {
      ShoppingListService.removeItem(itemIndex);
    };
  }
})();
