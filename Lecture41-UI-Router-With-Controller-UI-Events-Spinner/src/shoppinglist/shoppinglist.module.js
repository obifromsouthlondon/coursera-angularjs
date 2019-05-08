(function() {
  "use strict";

  angular.module("ShoppingListEventApp", ["RoutingApp", "SpinnerModule"]);

  angular.module("ShoppingListEventApp")
  .config(function(){
    console.log("ShoppingListEventApp::config fired!")
  });

  angular.module("ShoppingListEventApp")
  .run(function(){
    console.log("ShoppingListEventApp::run fired!")
  });
})();
