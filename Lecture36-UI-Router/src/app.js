(function() {
  "use strict";

  angular.module("RoutingApp", ["ui.router"]);

  angular.module("RoutingApp")
  .config(RoutesConfiguration); // configure services

  RoutesConfiguration.$inject = ["$stateProvider","$urlRouterProvider"];
  function RoutesConfiguration($stateProvider, $urlRouterProvider){
    // redirect to tab1 is no url matches
    $urlRouterProvider.otherwise("/tab1");

    // set up ui state
    $stateProvider.state("tab1", {
      url: "/tab1",
      templateUrl: "src/tab1.html"
    })
    .state("tab2", {
      url: "/tab2",
      templateUrl: "src/tab2.html"
    });
  }
})();
