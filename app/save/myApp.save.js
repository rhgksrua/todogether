'use strict';

angular.module('myApp.save', ['ui.router'])

.config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {
  $stateProvider
      .state('create', {
        url: "/save",
        templateUrl: "/list.html",
          controller:"View1Ctrl",
          controllerAs:"vc"
      })
}]);