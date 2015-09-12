/**
 * Created by pavan on 9/8/15.
 *
 * Implemented by hankhank on 9/12/15.
 *
 * auth.register.controller.js
 *
 * TODO: move services out from controller
 *
 */
var myApp = angular.module('myApp');

myApp.controller('registerCtrl', ['registerService', '$location', function(registerService, $location) {
    var rc = this;
    rc.user = {};

    /**
     * register
     *
     * @param {object} user
     * @return {undefined}
     */
    rc.register = function(user) {

        // marker for displaying registration error
        rc.serverError = false;
        rc.emailExists = false;

        registerService.register(user)
            .then(function(response) {
                if (response.data.error) {
                    // server error
                    rc.serverError = true;
                    throw new Error('SERVER ERROR');
                } else if (response.data.exists) {
                    // email exists
                    rc.emailExists = true;
                    throw new Error('email exists');
                }
                return response;
            })
            .then(function(response) {
                // Set token
                registerService.setToken(response.data.token);
                $location.path('/');
                return response;
            })
            .then(null, function(response) {
                // ajax fail
                console.log('error', response);
            });
        };
}])
.service('registerService', ['$http', '$window', function($http, $window) {
    // services could move out from the controller file

    var reg = this;
    var store = $window.localStorage;
    var key = 'auth-token';
    
    /**
     * setToken - set token received after registering
     *
     * @param {string} token
     * @return {undefined}
     */
    reg.setToken = function(token) {
        console.log('setting token');
        if (token) {
            store.setItem(key, token);
        } else {
            store.removeItem(key);
        }
    };

    /**
     * getToken - Get token from localStorage. Returns null if DNE.
     *
     * @return {undefined}
     */
    reg.getToken = function() {
        return store.getItem(key);
    };

    /**
     * sanitize - only allows email and password in user object
     *
     * @param {object} user
     * @return {undefined}
     */
    var sanitize = function(user) {
        var sanitizedUser = {
            email: user.email,
            password: user.password
        };
        return sanitizedUser;
    };

    /**
     * register
     *
     * @param {object} user
     * @return {undefined}
     */
    reg.register = function(user) {
        user = sanitize(user);
        return $http.post('/register', user)
            .then(function(response) {
                return response;
            });
    };
}]);
