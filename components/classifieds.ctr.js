(function(){
  "use strict";

  angular
      .module("ngClassifieds") // It gives us a reference of the declared module in app.js
      .controller("classifiedsCtrl", function($scope, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {

        /* http methods:
        1. POST - Sending data
        2. GET - Retrieve data
        3. PUT - Edite data
        4. DELETE - Delete data*/
        /*$http.get('data/classifieds.json')*/
        classifiedsFactory.getClassifieds().then(function(classifieds){
            $scope.classifieds = classifieds.data; // We have some "ReturnedData" data that is being returned, and we need to access the data property thats on it.
        });

        var contact = {
          name: "Anderson Silva",
          phone: "(444) 400-740",
          email: "dleroari@gmail.com"
        }

        // Open sidenav, connected to the button in toolbar
        $scope.openSidebar = function(){
          $mdSidenav('left').open();
        }
        // Closes the sidenav, connected to cancel button
        $scope.closeSidebar = function() {
          $mdSidenav('left').close();
        }

        $scope.saveClassified = function(classified){

          // Add if statement to prevent data being stored in wrong-manner.
          if (classified) {
              classified.contact = contact; // Pretending to be info from user profile
              $scope.classifieds.push(classified);
              $scope.classified = {}; // Reset form
              $scope.closeSidebar();
              showToast("Classified Saved!");
          }
        }

        $scope.editClassified = function(classified){
          $scope.editing = true;
          $scope.openSidebar();
          $scope.classified = classified;
        }

        $scope.saveEdit = function(){
          $scope.editing = false;
          $scope.classified = {};
          $scope.closeSidebar();
          showToast("Edit Saved!");
        }

        $scope.deleteData = function(event, data){
          var confirm = $mdDialog.confirm()
          .title("Are you sure you want to delete item: " + data.title + "?")
          .textContent("Item description " + data.description)
          .targetEvent(event)
          .ok("Yes")
          .cancel("No");
          // The show method returns a promise, we add the rest of the code with the "then" method.
          $mdDialog.show(confirm).then(function() {
            var index = $scope.classifieds.indexOf(data); // Finding the index of classified
            $scope.classifieds.splice(index, 1);
          }, function() {
            // Cancel is runned here.
          });
        }

        function showToast(message){
          $mdToast.show(
            $mdToast.simple()
            .content(message)
            .position('top, right')
            .hideDelay(3000)
          );
        }

      });
})();
