(function() {
  "use strict";
  angular
    .module("CounterApp", [])
    // add filtering service to format data bound for View
    .controller("CounterController", CounterController);

  // you can define inline with constructor or as a sep function
  // AngularJS's DI component is $inspector
  function CounterController($scope) {
    $scope.userName;
    $scope.onceCounter = 0;
    $scope.counter = 0;

    $scope.showNumberOfWatchers = function() {
      console.log("# of watchers: ", $scope.$$watchersCount);
      //console.log("watchers: ", $scope.$$watchers);
    };

    $scope.countOnce = function() {
      $scope.onceCounter = 1;
    };

    $scope.upCounter = function() {
      $scope.counter += 1;
      console.log("counter: value = ", $scope.counter);
    };

    $scope.$watch(function(newValue, oldValue) {
      console.log("Digest Loop Fired");
      console.log("New Value: ", newValue);
      console.log("Old Value: ", oldValue);
    });

    /*
    $scope.$watch("onceCounter", function(newValue, oldValue) {
      console.log("onceCounter - New Value: ", newValue);
      console.log("onceCounter - Old Value: ", oldValue);
    });

    $scope.$watch("counter", function(newValue, oldValue) {
      console.log("counter - New Value: ", newValue);
      console.log("counter - Old Value: ", oldValue);
    });
    */
  }
})();
