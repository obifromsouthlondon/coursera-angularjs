(function() {
  "use strict";
  angular
    .module("ShoppingListEventApp")
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
  }
})();
