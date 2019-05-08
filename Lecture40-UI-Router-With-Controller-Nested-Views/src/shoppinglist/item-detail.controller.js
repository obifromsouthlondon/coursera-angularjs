(function() {
  'use strict';
  angular
    .module("ShoppingListEventApp")
    .controller("ItemDetailController", ItemDetailController);

  // inherits from parent controller
  ItemDetailController.$inject = ["$stateParams","items"];
  function ItemDetailController($stateParams,items){
    var itemdetail = this;
    itemdetail.item = items[$stateParams.itemId];
  }
}());
