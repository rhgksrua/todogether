/**
 * Created by pavan on 9/8/15.
 */
var myApp=angular.module("myApp");
myApp.controller("loginCtrl",["registerService","$location",function(rService,location){
    var ls=this;
    ls.status=""
    ls.submit=function(user){
        rService.login(user).then(
            function(res){
                ls.status=res.data.status;
                if(ls.status==="login success"){
                    location.path("/save")
                }
            }
        )


    }
}])