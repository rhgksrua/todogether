/**
 * Created by pavan on 9/8/15.
 */
var myApp=angular.module("myApp");
myApp.controller("loginCtrl",["registerService","$location",function(rService,location){
    var ls=this;
    ls.submit=function(user){
        rService.login(user);
        location.path("/create")
    }
}])