(function(){
  "use strict";

  angular
      .module("ngClassifieds") // It gives us a reference of the declared module in app.js
      .controller("classifiedsCtrl", function($scope, $http, classifiedsFactory, $mdSidenav) {

        /* http methods:
        1. POST - Sending data
        2. GET - Retrieve data
        3. PUT - Edite data
        4. DELETE - Delete data*/
        /*$http.get('data/classifieds.json')*/
        classifiedsFactory.getClassifieds().then(function(data){
            $scope.classifieds = data.data; // We have some "ReturnedData" data that is being returned, and we need to access the data property thats on it.
        });
        // Open sidenav, connected to the button in toolbar
        $scope.openSidebar = function(){
          $mdSidenav('left').open();
        }
        // Closes the sidenav, connected to cancel button
        $scope.closeSidebar = function() {
          $mdSidenav('left').close();
        }

        $scope.saveClassified = function(classified){

          // Add if statement to prevent data being stored wrong-manner.
          if (classified) {
              $scope.classifieds.push(classified);
              $scope.classified = {}; // Reset form
              $scope.closeSidebar();
          }
        }

      });
})();
