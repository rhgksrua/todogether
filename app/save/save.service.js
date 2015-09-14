/**
 * Created by pavan on 9/8/15.
 */
angular.module('myApp.save').service("listService", ["$http", "$window", function($http, $window){
    var todo = this;

    /**
     * getTodoList - get user todo list if logged in
     *
     * @return {undefined}
     */
    todo.getTodoList = function() {
        return $http.post("/getTodoList")
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
        return $http.post('/saveTodoList', todoList)
            .then(function(response) {
                return response;
            });
    };
}]);
