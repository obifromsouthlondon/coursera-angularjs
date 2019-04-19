(function() {
  "use strict";
  var app = angular.module("MsgApp", []);

  app.filter("custom", CustomFilterFactory);
  // AngularJS appends "Filter" to name "custom" to form "customFilter" registered name
  CustomFilterFactory.$inject = ["$filter"];
  function CustomFilterFactory($filter) {
    return function(input, args1) {
      input = input || "";
      input = input.replace("likes", "loves");
      return $filter("uppercase")(input);
    };
  }

  app.filter("truth", TruthFilterFactory);
  // AngularJS appends "Filter" to name "custom" to form "customFilter" registered name
  function TruthFilterFactory() {
    return function(input, replaceThis, withThis) {
      console.log("incoming", input, replaceThis, withThis);
      input = input || "";
      input = input.replace(replaceThis, withThis);
      console.log("outgoing", input);
      return input;
    };
  }

  app.controller("MsgController", MsgController);
  MsgController.$inject = ["$scope", "$filter", "customFilter"];
  function MsgController($scope, $filter, customFilter) {
    $scope.name = "MsgApp";
    $scope.stateOfBeing = "hungry";
    $scope.cookieCost = 0.45;
    $scope.sayMessage = function() {
      if ($scope.stateOfBeing === "fed") {
        // always wrap return in a () to enable contained funcitons to execute
        return (
          customFilter(
            "Obi likes to eat healthy. cost of hunger is ",
            "nothing"
          ) + $filter("currency")(10, "GBP£", 0.0)
        );
      } else {
        return (
          "Obi is hungry. cost of hunger is " +
          $filter("currency")(100, "GBP£", 0)
        );
      }
    };

    $scope.feedObi = function() {
      $scope.stateOfBeing = "fed";
    };
  }
})();
