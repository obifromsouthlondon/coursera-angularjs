(function() {
  "use strict";
  angular
    .module("ShoppingListEventApp")
    .controller("MainShoppingListController", MainShoppingListController);

  // MainShoppingListController.$inject = ["ShoppingListService"];
  // function MainShoppingListController(ShoppingListService) {
  MainShoppingListController.$inject = ["items", "$rootScope"];
  function MainShoppingListController(items, $rootScope) {
    var mainList = this;
    mainList.items = items;

    $rootScope.$on("$stateChangeStart", function(
      event,
      toState,
      fromState,
      fromParams,
      options
    ) {
      console.log(
        "$rootScope.$on: event - ",
        event,
        "; toState - ",
        toState,
        "; fromState - ",
        fromState,
        "; fromParams - ",
        fromParams,
        "; options - ",
        options
      );s
    });

    // mainList.$onInit = function(){
    //   var promise = slService.getItems();
    //   promise.then(function(response){
    //     console.log("Items: ", response);
    //     mainList.items = response;
    //   });
    // }
  }
})();
