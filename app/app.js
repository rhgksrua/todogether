
// Declare app level module which depends on views, and components
angular.module('myApp', [
        'ui.router', 
        'myApp.create', 
        'ngMessages'
    ])
    .config(['$httpProvider', '$stateProvider', '$urlRouterProvider', function($httpProvider, $stateProvider, $urlRouterProvider) {
        //
        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/main");
        //
        // Now set up the states
        $stateProvider
            .state("base", {
                url : "/main" ,
                templateUrl : "partials/base.html"
            })
            .state("login", {
                url: "/login",
                templateUrl: "partials/login.html" 
            })
            .state("register", {
                url: "/register",
                templateUrl: "partials/register.html",
                controller: 'registerCtrl as rc'
            });

        // Every ajax request will atach authorization token in the request header if
        // auth-token key in localStorage exists.
        $httpProvider.interceptors.push('tokenInjector');
    }])
    .factory('tokenInjector', ['$window', function($window) {
        // tokenInjector is injected into httpProvider
        var tokenInjector = {
            request: function(config) {
                var token = $window.localStorage['auth-token'];
                if (token) {
                    config.headers['authorization'] = 'Bearer ' + token;
                }
                return config;
            }
        };
        return tokenInjector;
    }]);
