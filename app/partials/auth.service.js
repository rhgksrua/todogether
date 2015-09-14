/**
 * Created by pavan on 9/8/15.
 */
var myApp=angular.module("myApp");
myApp.service('registerService', ['$http', '$window', function($http, $window) {
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

    reg.login = function(user){
        user=sanitize(user);
        console.log(user);
        return $http.post("/login", user)
            .then(function(response){
                console.log(response);
                reg.setToken(response.data.token);
                //console.log(reg.getToken(key)+" ttttoken");
                return response;
        });
    };

}]);
