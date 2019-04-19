(function() {
  "use strict";

  var app = angular
    .module("App", [])
    .controller("ParentController1", ParentController1) // name is treated as a function constructor
    .controller("ChildController1", ChildController1)
    .controller("ParentController2", ParentController2)
    .controller("ChildController2", ChildController2);

  ParentController1.$inject = ["$scope"];
  function ParentController1($scope) {
    $scope.parentValue = 1; // primitive
    // enable with "as pc" in ng-controller
    $scope.pc = this; // pareent controller one instance
    $scope.pc.parentValue = 1;
  }

  ChildController1.$inject = ["$scope"];
  function ChildController1($scope) {
    // // coming from the parent controller
    // console.log("$scope.$parent.parentValue: ", $scope.$parent.parentValue);
    // console.log("CHILD $scope: ", $scope);
    //
    // // now belongs to child scope
    // console.log("$scope.parentValue: ", $scope.parentValue);
    // $scope.parentValue = 10;
    //
    // console.log("***CHANGED: $scope.parentValue = 10 ***");
    // console.log("$scope.parentValue: ", $scope.parentValue);
    // console.log("CHILD $scope (1st change): ", $scope);
    //
    // // now belongs to child scope
    // console.log("$scope.pc.parentValue: ", $scope.pc.parentValue);
    // $scope.pc.parentValue = 5;
    //
    // console.log("***CHANGED: $scope.pc.parentValue = 5 ***");
    // console.log("$scope.pc.parentValue: ", $scope.pc.parentValue);
    // console.log("CHILD $scope (2nd change): ", $scope);
  }

  ParentController2.$inject = ["$scope"];
  function ParentController2($scope) {
    // scope is redundant because we are using a var in place of scope
    var parent = this;
    parent.value = 1;
  }

  ChildController2.$inject = ["$scope"];
  function ChildController2($scope) {
    var child = this;
    // because we are using an Object it will not mask the parent value
    child.value = 5;
    console.log("Child::$scope: ", $scope);
  }
})();
