/**
 * Created by pavan on 9/8/15.
 */
angular.module('myApp.save').service("listService", ["$http", "$window", function($http, $window){
    var todo = this;

    todo.getTodoList = function() {
        return $http.post("/getTodoList")
            .then(function(response) {
                return response;
            });
    };



}]);
