'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router','myApp.create','ngMessages'
]).
config(function($stateProvider, $urlRouterProvider) {
        //
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/main");
        //
        // Now set up the states
        $stateProvider
            .state("base" , {
                url : "/main" ,
                templateUrl : "partials/base.html"
            })
            .state("login" ,{
                url:"/login",
                templateUrl:"partials/login.html" })
            .state("register" ,{
                url:"/newuser",
                templateUrl:"partials/register.html"
            })
        ;
});
