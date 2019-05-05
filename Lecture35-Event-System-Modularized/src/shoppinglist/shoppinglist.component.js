(function() {
  "use strict";
  angular.module("ShoppingListEventApp").component("shoppingList", {
    // in-line configuration object
    templateUrl: "src/shoppinglist/shoppingList.html",
    controller: ShoppingListComponentController, // angular will define $ctrl
    bindings: {
      // inputs and outputs
      items: "<", // one-way binding, we will not change the items in directive
      title: "@", // dom attribute value binding
      onRemove: "&" // reference function, callback to parent controller
    }
  });

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
})();
