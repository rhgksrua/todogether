/**
 * Created by pavan on 9/8/15.
 */
angular.module('myApp.save').service("listService", ["$http", "$window","$location", function($http, $window,$location){
    var todo = this;
    var key = 'auth-token';

    /**
     * getTodoList - get user todo list if logged in
     *
     * @return {undefined}
     */
    todo.getTodoList = function() {
        return $http.get("/api/getTodoList")
            .then(function(response) {
                return response;
            });
    };

    /**
     * saveTodoList - save user todo list if logged in
     *
     * @param {object} todoList
     * @return {undefined}
     */
    todo.saveTodoList = function(todoList) {
        return $http.post('/api/saveTodoList', todoList)
            .then(function(response) {
                return response;
            });
    };

    todo.removeToken = function(){
        console.log("removing token");
        $window.localStorage.removeItem(key);
        $location.path("/");

    }
}]);
