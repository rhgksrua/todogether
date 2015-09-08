'use strict';

angular.module('myApp.create', ['ui.router'])

.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
  $stateProvider
      .state('create', {
        url: "/create",
        templateUrl: "create/view1.html",
          controller:"View1Ctrl",
          controllerAs:"vc"
      })
}]);