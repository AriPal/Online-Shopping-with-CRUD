(function(){
  "use strict"
  angular.module("ngClassifieds").controller("newClassifiedsCtrl", function($scope, $state, $mdSidenav, $timeout, $mdDialog, classifiedsFactory) {

      var vm = this;
      vm.saveClassified = saveClassified;
      vm.closeSidebar = closeSidebar;

      $timeout(function(){
        $mdSidenav("left").open();
      });

      $scope.$watch("vm.sidenavOpen", function(sidenav) {
        if(sidenav === false){
          $mdSidenav("left").close().then(function(){
            $state.go("classifieds");
          });
        }
      });

      function closeSidebar(){
        vm.sidenavOpen = false;
      }

      function saveClassified(classified) {
        if (classified) {

            classified.contact = {
            name: "Anderson Silva",
            phone: "(444) 400-740",
            email: "dleroari@gmail.com"
          }

          $scope.$emit('newClassified', classified);
          vm.sidenavOpen = false;
        }
      }

    });
})();
