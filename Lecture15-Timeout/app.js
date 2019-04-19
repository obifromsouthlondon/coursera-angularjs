(function() {
  "use strict";
  angular
    .module("CounterApp", [])
    .controller("CounterController", CounterController);

  // you can define inline with constructor or as a sep function
  // AngularJS's DI component is $inspector
  CounterController.$inject = ["$scope", "$timeout"];
  function CounterController($scope, $timeout) {
    $scope.onceCounter = 0;
    $scope.counter = 0;

    $scope.upCounter = function() {
      /*
      setTimeout(function() {
        // option 1:
        $scope.counter++;
        console.log("counter incremented", $scope.counter);
        $scope.$digest();
        // option 2:
        $scope.$apply(function() {
        $scope.counter++;
        console.log("counter incremented", $scope.counter);
        });
      }, 2000);
      */
      // with Angular timeout service:
      $timeout(function() {
        $scope.counter++;
        console.log("counter incremented", $scope.counter);
      }, 2000);
    };
  }
})();
