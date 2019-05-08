(function() {
  "use strict";
  angular
    .module("ShoppingListEventApp")
    .service("ShoppingListService", ShoppingListService);

  ShoppingListService.$inject = ["$q", "$timeout"];
  function ShoppingListService($q, $timeout) {
    var service = this;
    // shopping basket
    var items = [];

    items.push({
      name: "sugar",
      quantity: "2 bags",
      description: "Brown Sugar"
    });

    items.push({
      name: "bread",
      quantity: "1 bag",
      description: "Hovis Bread"
    });

    items.push({
      name: "rice",
      quantity: "1 bag",
      description: "Basmati Rice"
    });

    service.getItems = function() {
      var deferred = $q.defer();
      $timeout(function(){
        deferred.resolve(items);
      }, 900);

      return deferred.promise;
    };
  }
})();
