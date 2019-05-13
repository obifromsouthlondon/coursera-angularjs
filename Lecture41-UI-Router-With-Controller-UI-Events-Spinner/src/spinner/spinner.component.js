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
          console.log("$transitions.onBefore - set $ctrl.showSpinner to TRUE");
        }
      );

      $transitions.onSuccess(
        {
          from: "home",
          to: "mainList"
        },
        function(){
          $ctrl.showSpinner = false;
          console.log("$transitions.onSuccess - set $ctrl.showSpinner to FALSE");
        }
      );
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
