(function() {
  'use strict';
  angular.module("DIApp", [])
  // add filtering service to format data bound for View
  .controller("DIController", DIController);

  // you can define inline with constructor or as a sep function
  // AngularJS's DI component is $inspector
  function DIController($scope, $filter, $injector)
  {
    $scope.name="DIController";
    $scope.upper = function()
    {
      // $filter service lets us create formatting functions
      var upperCaseFxnFilter = $filter("uppercase");
      $scope.name = upperCaseFxnFilter($scope.name);
    };

    console.log($injector.annotate(DIController));
  };

  function annotateMe(name, job, blah)
  {
    return "Blah!";
  }

  console.log(annotateMe.toString());


}());
