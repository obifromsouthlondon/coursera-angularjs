(function() {
  "use strict";
  var inheritanceApp = angular.module("InheritanceApp", []);
  inheritanceApp.controller("InheritanceController", function($scope) {
    console.log("watchers count: ", $scope.$$watchersCount);
    $scope.name = "controller";

    var parent = {
      value: "parent",
      obj: {
        objValue: "parentObjValue"
      },
      walk: function() {
        console.log("walking!");
      }
    };

    console.log("Keys: ", Object.keys(parent));
    var child = Object.create(parent);
    console.log("child - child.value: ", child.value);
    console.log("child - child.obj.objValue: ", child.obj.objValue);
    console.log("parent - parent.value: ", parent.value);
    console.log("parent - parent.obj.objValue: ", parent.obj.objValue);
    console.log("parent: ", parent);
    console.log("child: ", child);

    child.value = "childValue";
    child.obj.objValue = "childObjValue";

    console.log("child - child.value: ", child.value);
    console.log("child - child.obj.objValue: ", child.obj.objValue);
    console.log("parent - parent.value: ", parent.value);
    console.log("parent - parent.obj.objValue: ", parent.obj.objValue);
    console.log("parent: ", parent);
    console.log("child: ", child);

    // function is an object itself.  Use Captial letter to denote it's a constructor
    function Dog(name) {
      this.name = name;
      console.log("'this' is: ", this);
    }

    // as constructor
    var myDog = new Dog("Nkita");
    console.log("myDog: ", myDog);

    // as a function call - the "this" will now refer to the outer scope, no more within the function
    // i.e. function look outside for variable called "name"
    //Dog("Jimmy");
  });
})();
