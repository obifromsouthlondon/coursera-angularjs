(function() {
  'use strict';
  angular.module('ShoppingListApp', [])
  .controller("ToBuy", ToBuyController)
  .controller("AlreadyBought", AlreadyBoughtController)
  .service("ShoppingListService", ShoppingListService);

  ToBuyController.$inject = ["ShoppingListService"];
  function ToBuyController(ShoppingListService){
    var buy = this;
    buy.items = [
      { name: "cookies", quantity: 10 },
      { name: "bread", quantity: 2 },
      { name: "butter", quantity: 1 },
      { name: "biscuit", quantity: 5 },
      { name: "chicken", quantity: 3 }
    ];

    buy.buyItem = function(itemIndex){
      var item = buy.items.splice(itemIndex, 1);
      ShoppingListService.buyItem(item[0]);
    };
  }

  AlreadyBoughtController.$inject = ["ShoppingListService"];
  function AlreadyBoughtController(ShoppingListService){
    var bought = this;
    bought.items = ShoppingListService.getItems();
  }

  function ShoppingListService() {
    var service = this;
    service.items = [];

    service.buyItem = function(item){
      service.items.push(item);
    }

    service.getItems = function(){
      return service.items;
    }
  }
}());
