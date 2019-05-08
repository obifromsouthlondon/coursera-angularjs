(function() {
  "use strict";
  angular
    .module("ShoppingListEventApp")
    .controller("MainShoppingListController", MainShoppingListController);

  // MainShoppingListController.$inject = ["ShoppingListService"];
  // function MainShoppingListController(ShoppingListService) {
  MainShoppingListController.$inject = ["items"];
  function MainShoppingListController(items) {
    var mainList = this;
    mainList.items = items;

    // mainList.$onInit = function(){
    //   var promise = slService.getItems();
    //   promise.then(function(response){
    //     console.log("Items: ", response);
    //     mainList.items = response;
    //   });
    // }
  }
})();
