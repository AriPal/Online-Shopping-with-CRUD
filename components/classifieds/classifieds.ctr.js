/* http methods:
1. POST - Sending data
2. GET - Retrieve data
3. PUT - Edite data
4. DELETE - Delete data*/
/*$http.get('data/classifieds.json')*/

(function(){
  "use strict";

  angular
      .module("ngClassifieds") // It gives us a reference of the declared module in app.js
      .controller("classifiedsCtrl", function($scope, $http, $state, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {

        var vm = this;
        vm.categories;
        vm.classified;
        vm.classifieds;
        vm.closeSidebar = closeSidebar;
        vm.deleteData = deleteData;
        vm.editClassified = editClassified;
        vm.editing;
        vm.openSidebar = openSidebar;
        vm.saveClassified = saveClassified;
        vm.saveEdit = saveEdit;

        classifiedsFactory.getClassifieds().then(function(classifieds){
            vm.classifieds = classifieds.data; // We have some "ReturnedData" data that is being returned, and we need to access the data property thats on it.
            vm.categories = getCategories(vm.classifieds);
        });

        var contact = {
          name: "Anderson Silva",
          phone: "(444) 400-740",
          email: "dleroari@gmail.com"
        }

        // Open sidenav, connected to the button in toolbar
        function openSidebar(){
          $state.go("classifieds.new");
        }
        // Closes the sidenav, connected to cancel button
        function closeSidebar() {
          $mdSidenav('left').close();
        }

        function saveClassified(classified){

          // Add if statement to prevent data being stored in wrong-manner.
          if (classified) {
              classified.contact = contact; // Pretending to be info from user profile
              vm.classifieds.push(classified);
              vm.classified = {}; // Reset form
              closeSidebar();
              showToast("Classified Saved!");
          }
        }

        function editClassified(classified){
          vm.editing = true;
          openSidebar();
          vm.classified = classified;
        }

        function saveEdit(){
          vm.editing = false;
          vm.classified = {};
          closeSidebar();
          showToast("Edit Saved!");
        }

        function deleteData(event, data){
          var confirm = $mdDialog.confirm()
          .title("Are you sure you want to delete item: " + data.title + "?")
          .textContent("Item description " + data.description)
          .targetEvent(event)
          .ok("Yes")
          .cancel("No");
          // The show method returns a promise, we add the rest of the code with the "then" method.
          $mdDialog.show(confirm).then(function() {
            var index = vm.classifieds.indexOf(data); // Finding the index of classified
            vm.classifieds.splice(index, 1);
          }, function() {
            // Cancel is runned here.
          });
        }

        // Create a method callback instead of inserting the text into methods.
        function showToast(message){
          $mdToast.show(
            $mdToast.simple()
            .content(message)
            .position('top, right')
            .hideDelay(3000)
          );
        }

        function getCategories(classifieds) {
          var categories = [];

          angular.forEach(classifieds, function(item) {
            angular.forEach(item.categories, function(category) {
              categories.push(category);
            });
          });
          return _.uniq(categories); // returns unique (aggregates) values, lodash script.
        }

      });
})();
