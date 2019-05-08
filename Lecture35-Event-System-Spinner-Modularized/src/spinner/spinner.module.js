(function() {
  "use strict";

  angular.module("SpinnerModule", []);

  // 1st
  angular.module("SpinnerModule")
  .config(function(){
    console.log("SpinnerModule::config fired!")
  });

  // 2nd
  angular.module("SpinnerModule")
  .run(function(){
    console.log("SpinnerModule::run fired!")
  });
})();
