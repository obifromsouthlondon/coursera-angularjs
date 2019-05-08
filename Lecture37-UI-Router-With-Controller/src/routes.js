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
        controllerAs: "mainList"
      });
    }
}());
