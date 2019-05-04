(function() {
  "use strict";
  angular
    .module("MenuItemsApp", [])
    .controller("NarrowItDownController", NarrowItDownController)
    .service("MenuSearchService", MenuSearchService)
    .directive("searchResult", SearchResultTag)
    .constant("APIBasePath", "http://davids-restaurant.herokuapp.com");

    function SearchResultTag() {
      var ddo = {
        restrict: "E",
        templateUrl: "searchResult.html",
        scope:{
          list: "=myList"
        }
      };
      return ddo;
    }

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MenuSearchService) {
    var nidCtrlr = this;
    nidCtrlr.searchString = "";

    nidCtrlr.remove = function(index) {
      nidCtrlr.found.splice(index, 1);
    };

    nidCtrlr.search = function() {
      nidCtrlr.found = [];
      if (nidCtrlr.searchString === "") {
        return;
      }
      var promise = MenuSearchService.getMenuItems();
      promise
        .then(function(response) {
          var menuItems = response.data.menu_items;
          for (var i = 0; i < menuItems.length; i++) {
            if (
              menuItems[i].name
                .toLowerCase()
                .indexOf(nidCtrlr.searchString.toLowerCase()) !== -1
            ) {
              nidCtrlr.found.push(menuItems[i]);
            }
          }
        })
        .catch(function(errorResponse) {
          throw new Error("Something went wrong - " + errorResponse.message);
        });
    };
  }

  MenuSearchService.$inject = ["APIBasePath", "$http"];
  function MenuSearchService(APIBasePath, $http) {
    var service = this;
    service.getMenuItems = function() {
      return $http({
        method: "GET",
        url: APIBasePath + "/menu_items.json"
      });
    };
  }
})();
