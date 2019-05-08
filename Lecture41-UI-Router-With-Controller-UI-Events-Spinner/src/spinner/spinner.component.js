(function() {
  "use strict";
  angular.module("SpinnerModule").component("loadingSpinner", {
    templateUrl: "src/spinner/templates/spinner.html",
    controller: SpinnerController
  });

  SpinnerController.$inject = ["$rootScope", "$transitions"];
  function SpinnerController($rootScope, $transitions) {
    var $ctrl = this;
    var cancellers = [];

    $ctrl.$onInit = function() {
      console.log("$onInit");
      $transitions.onBefore(
        {
          from: "home",
          to: "mainList"
        },
        function(){
          $ctrl.showSpinner = true;
          console.log("Redirecting to mainList");
        }
      );

      // Listener - fired everytime this view is visited
      // root scope is never destroyed till entire app is destroyed
      var cancel = $rootScope.$on("$stateChangeStart", function(
        event,
        toState,
        fromState,
        fromParams,
        options
      ) {
        console.log(
          "$rootScope.$on: event - ",
          event,
          "; toState - ",
          toState,
          "; fromState - ",
          fromState,
          "; fromParams - ",
          fromParams,
          "; options - ",
          options
        );
        $ctrl.showSpinner = true;
      });
      cancellers.push(cancel);
      console.log("cancel: ", cancel);

      cancel = $rootScope.$on("$stateChangeSuccess", function(
        event,
        toState,
        fromState,
        fromParams,
        options
      ) {
        $ctrl.showSpinner = false;
      });
      cancellers.push(cancel);

      cancel = $rootScope.$on("$stateChangeError", function(
        event,
        toState,
        fromState,
        fromParams,
        options
      ) {
        $ctrl.showSpinner = false;
      });
      cancellers.push(cancel);
    };

    // remove listener from memory
    $ctrl.$onDestroy = function() {
      console.log("$onDestroy");
      cancellers.forEach(function(cancelFunction) {
        cancelFunction();
      });
    };
  }
})();
