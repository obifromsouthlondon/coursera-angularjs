(function() {
  "use strict";

  angular
    .module("App", [])
    .controller("AppController", AppController)
    .service("AppService", AppService)
    .factory("Factory_WithFunction", AppServiceFactory_WithFunction)
    .factory("Factory_WithObjectLiteral", AppServiceFactory_WithObjectLiteral)
    .directive("showInfo", ShowInfoDirective);

  function ShowInfoDirective(){
    var ddo = {
      scope:{
        appController: "="
      },
      template: "<b>Directive:</b> {{ appController.callService() }}"
    }
    return ddo;
  }

  AppController.$inject = ["AppService"];
  function AppController(AppService) {
    var appController = this;
    appController.callService = function() {
      return AppService.getName();
    };
  }

  function AppService() {
    var appService = this;
    appService.getName = function() {
      return "AppService: " + new Date();
    };
  }

  function AppServiceFactory_WithFunction() {
    var factory = function() {
      return new AppService();
    };
    return factory;
  }

  function AppServiceFactory_WithObjectLiteral() {
    var factory = {
      getService: function() {
        return new AppService();
      }
    };
    return factory;
  }
})();
