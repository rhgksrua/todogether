/**
 * Created by pavan on 9/8/15.
 */
var myApp = angular.module('myApp.save');
myApp.controller('listCtrl', ["listService", function(listService) {
    var lc = this;

    lc.loggedIn = false;

    lc.newTask = '';

    /*// TEMPORARY list
    lc.todoList = [
        {content: 'feed cat', done: false},
        {content: 'kick ball', done: false},
        {content: 'do nothing', done: false}
    ];*/

    // Init todo list.  If user logged in show personal list
    listService.getTodoList()
        .then(function(response) {
            console.log(response)
            if (response.data.error) {
                throw new Error('db error');
            }
            lc.todoList = response.data;
            lc.loggedIn = true;
            return response;
        })
        .then(null, function(response) {
            console.log(response.data);
        });

    /**
     * saveTodoList - send list to server in json thru ajax
     *
     * @return {undefined}
     */
    lc.saveTodoList = function() {
        if (false) {
            // not logged in. not saving anything.
            lc.loggedIn = false;
            return;
        }
        listService.saveTodoList(lc.todoList)
            .then(function(response) {
                if (reponse.data.error) {
                    throw new Error('db error');
                }
                lc.todoList = response.data.list;
                return response;
            })
            .then(null, function(response) {
                console.log(response);
            });
    };

    /**
     * addTask - add task and clear input
     *
     * @return {undefined}
     */
    lc.addTask = function() {
        console.log(lc.newTask);
        lc.todoList.push({content: lc.newTask});
        lc.newTask = '';
    };

    /**
     * taskComplete - mark completed task
     *
     * @param {number} index
     * @return {undefined}
     */
    lc.taskComplete = function(index) {
        console.log(index);
        var done = lc.todoList[index].done;
        if (done) {
            lc.todoList[index].done = false;
            return;
        }
        lc.todoList[index].done = true;
    };
}]);
