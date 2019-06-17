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
  }
})();
