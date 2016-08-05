(function(){
  "use strict";

  angular
      .module("ngClassifieds") // It gives us a reference of the declared module in app.js
      .controller("classifiedsCtrl", function($scope, $http, classifiedsFactory) {

        /* http methods:
        1. POST - Sending data
        2. GET - Retrieve data
        3. PUT - Edite data
        4. DELETE - Delete data*/
        /*$http.get('data/classifieds.json')*/
        classifiedsFactory.getClassifieds().then(function(data){
            $scope.classifieds = data.data; // We have some "ReturnedData" data that is being returned, and we need to access the data property thats on it.
        });
      });
})();
