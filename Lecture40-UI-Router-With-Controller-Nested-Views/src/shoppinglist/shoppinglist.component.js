(function() {
  "use strict";
  angular
  .module("ShoppingListEventApp")
  .component("shoppingList", {
    // in-line configuration object
    templateUrl: "src/shoppinglist/templates/shoppinglist.template.html",
    bindings: {
      // inputs and outputs
      items: "<" // one-way binding, we will not change the items in directive
    }
  });
})();
