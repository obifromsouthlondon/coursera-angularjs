(function() {
  'use strict';
  angular
    .module("ShoppingListEventApp")
    .controller("ItemDetailController", ItemDetailController);

  ItemDetailController.$inject = ["item"];
  function ItemDetailController(item){
    var itemdetail = this;
    itemdetail.item = item;
    console.log(itemdetail.item);
  }
}());
