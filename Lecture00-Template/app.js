(function() {
  "use strict";

  var app = angular
    .module("App", [])
    .controller("AppController", AppController)
    .controller("NoScopeController", NoScopeController)
    .service("AppService", AppService)
    .factory("Factory_WithFunction", AppServiceFactory_WithFunction)
    .factory("Factory_WithObjectLiteral", AppServiceFactory_WithObjectLiteral);

  AppController.$inject = ["$scope", "$filter"];
  function AppController($scope, $filter) {
    $scope.showNumberOfWatchers = function() {
      console.log("# of watchers: ", $scope.$$watchersCount);
    };
    var appController = this;
    /* CONTROLLER CODE GOES HERE */
  }

  NoScopeController.$inject = ["AppService"];
  function NoScopeController(AppService) {
    var noScopeController = this;
    noScopeController.callService = function() {
      return AppService.getName();
    };
    /* CONTROLLER CODE GOES HERE */
  }

  function AppService() {
    var appService = this;
    appService.getName = function() {
      return "AppService";
    };
    /* SERVICE CODE GOES HERE */
  }

  // usage: var service = AppServiceFactory_WithFunction()
  function AppServiceFactory_WithFunction() {
    var factory = function() {
      // instantiate service and return
      return new AppService();
    };
    // a Function is returned
    return factory;
  }

  // usage: var service = AppServiceFactory_WithObjectLiteral.getService()
  function AppServiceFactory_WithObjectLiteral() {
    var factory = {
      // object literal with property that is a method
      getService: function() {
        // instantiate service and return
        return new AppService();
      }
    };
    // an Object Literal is returned
    return factory;
  }
})();
