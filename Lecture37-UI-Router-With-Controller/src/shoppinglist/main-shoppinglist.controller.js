(function() {
  "use strict";
  angular
    .module("ShoppingListEventApp")
    .controller("MainShoppingListController", MainShoppingListController);

  MainShoppingListController.$inject = ["ShoppingListService"];
  function MainShoppingListController(ShoppingListService) {
    var slService = ShoppingListService;
    var mainList = this;
    mainList.items = [];

    mainList.$onInit = function(){
      var promise = slService.getItems();
      promise.then(function(response){
        console.log("Items: ", response);
        mainList.items = response;
      })
      .catch(function(response){

      });
    }
  }
})();
