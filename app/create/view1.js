'use strict';

angular.module('myApp.create', ['ui.router'])

.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
  $stateProvider
      .state('state3', {
        url: "/state3",
        templateUrl: "create/state3.html"
      })
}])

.controller('View1Ctrl', [function() {

}]);