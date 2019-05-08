(function() {
  'use strict';

  angular
    .module("RoutingApp", ["ui.router"])
    .config(RoutesConfiguration); // configure services

    RoutesConfiguration.$inject = ["$stateProvider","$urlRouterProvider"];
    function RoutesConfiguration($stateProvider, $urlRouterProvider){
      // redirect to / is no url matches
      $urlRouterProvider.otherwise("/");

      // set up ui state
      $stateProvider.state("home", {
        url: "/",
        templateUrl: "src/shoppinglist/templates/home.template.html"
      })
      // premade list
      .state("mainList", {
        url: "/main-list",
        templateUrl: "src/shoppinglist/templates/main-shoppinglist.template.html",
        controller: "MainShoppingListController",
        controllerAs: "mainList",
        resolve:{
          items: ["ShoppingListService", function(ShoppingListService){
            // immediately return a promise and router will wait for items to resolve before transition
            // will not route if promise is rejected
            return ShoppingListService.getItems();
          }]
        }
      })
      // item details
      .state("mainList.itemDetail", { //  now a child state
        // url: "/item-detail/{itemId}",
        templateUrl: "src/shoppinglist/templates/item-detail.template.html",
        controller: "ItemDetailController",
        controllerAs: "itemDetail",
        // we now inherit the resolve property from parent
        params:{
          itemId: null
        }
      });
    }
}());
