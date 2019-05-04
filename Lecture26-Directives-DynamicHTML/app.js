(function() {
  "use strict";

  angular
    .module("App", [])
    .controller("MenuCategoriesController", MenuCategoriesController)
    .service("MenuCategoriesService", MenuCategoriesService)
    .constant("APIBasePath", "http://davids-restaurant.herokuapp.com")
    .directive("helloWorld", HelloWorldTag);

  function HelloWorldTag(){
    var ddo = {
      template: "Hello World!"
    }

    return ddo;
  }

  MenuCategoriesController.$inject = ['MenuCategoriesService'];
  function MenuCategoriesController(MenuCategoriesService){
    var menu = this;

    var promise = MenuCategoriesService.getMenuCategories();
    promise.then(function(response) {
      menu.categories = response.data;
      console.log("menu.categories: ", menu.categories);
    })
    .catch(function(errorResponse) {
      console.log("Something went wrong - " + errorResponse.message);
    });

    menu.logMenuItems = function(short_name) {
      menu.clickedShortName = short_name;
      var promise = MenuCategoriesService.getMenuItems(short_name);
      promise.then(function(response) {
        menu.menuItems = response.data;
        console.log("menu.menuItems: ", menu.menuItems);
      })
      .catch(function(errorResponse) {
        console.log("Something went wrong - " + errorResponse.message);
      });
    }
  }

  MenuCategoriesService.$inject = ["$http", "APIBasePath"];
  function MenuCategoriesService($http, APIBasePath){
    var service = this;
    service.getMenuCategories = function() {
      // configure with config object (object literal)
      return $http({
        method: "GET",
        url: (APIBasePath + "/categories.json")
      });
    }

    service.getMenuItems = function(category) {
      // configure with config object (object literal)
      return $http({
        method: "GET",
        url: (APIBasePath + "/menu_items.json"),
        params: { category: category }
      });
    }
  }
})();
