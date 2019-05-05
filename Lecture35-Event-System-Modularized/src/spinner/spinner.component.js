(function() {
  "use strict";
  angular.module("SpinnerModule").component("loadingSpinner", {
    templateUrl: "src/spinner/spinner.html",
    controller: SpinnerController
  });

  SpinnerController.$inject = ["$rootScope"];
  function SpinnerController($rootScope) {
    var $ctrl = this;
    // Listener - fired everytime this view is visited
    // root scope is never destroyed till entire app is destroyed
    var deregisterListenerFxn = $rootScope.$on(
      "shoppingList:processing",
      function(event, data) {
        console.log("$rootScope.$on: event - ", event, "; data - ", data);
        if (data.on) {
          $ctrl.showSpinner = true;
        } else {
          $ctrl.showSpinner = false;
        }
      }
    );

    // remove listener from memory
    $ctrl.$onDestroy = function() {
      console.log("$onDestroy");
      deregisterListenerFxn();
    };
  }
})();
