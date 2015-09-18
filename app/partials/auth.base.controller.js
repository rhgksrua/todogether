var myApp=angular.module("myApp");
myApp.controller("baseController",["registerService",function(rService,location){
    var bc=this;
    bc.login = function(){
        return rService.getToken();
    };
    //console.log("login status : "+bc.login)
    bc.logout=function(){
        rService.removeToken();
        }


}])
