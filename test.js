//"use strict";
var object=null;
if(Object.hasOwnProperty("create")){
    object=Object.create;
}else{
    object=function object(o){
        function F(){}
        F.prototype=o;
        return new F();
    };
}
(function(){
    var Person={
        getName:function(){
            console.log("name");
        }
    };
    var Teacher=Object.create(Person,{});
    Teacher.getId=function(){
        console.log("id");
    };
    var will=object(Teacher);
    console.log(will.getName());
})();