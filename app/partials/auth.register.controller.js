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
                $location.path('/save');
                return response;
            })
            .then(null, function(response) {
                // ajax fail
                console.log('error', response);
            });
        };
}])
