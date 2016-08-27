// The role here is to kick of the application (module), starting place.
angular
.module("ngClassifieds", ["ngMaterial", "ui.router"])
.config(function($mdThemingProvider, $stateProvider){

  $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('orange');

    $stateProvider
    .state("one", {
      url: "/stateone",
      template: "<h1>{{stateone.message}}</h1>",
      controller: "stateOneCtrl as stateone"
    })
    .state("two",{
      url: "/statetwo",
      template: "<h1>State Two</h1> <md-button ui-sref='two.more'>go to state two</md-button><ui-view></ui-view>"
    })
    .state("two.more", {
      url: "/more",
      template: "<p>This is the deeper state</p>"
    });
})
.controller("stateOneCtrl", function() {
  var vm = this;
  vm.message = "Hey, my name is James, James Bond.";
})
