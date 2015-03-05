/**
 * Created by pl on 3/5/15.
 */
var employeeDB = require('../database/employees');
exports.getEmployees = getEmployees;
exports.getEmployee = getEmployee;

function getEmployees(callback){
    setTimeout(function(){
        callback(null, employeeDB); //node common callback convention is error first and last is callback
    }, 500);
}

function getEmployee(employeeID, callback){
    getEmployees(function(error, data){ //worth memorizing, the tut says
        if (error){
            return callback(error);
        }
        var result = data.find(function(item){
            return item.id === employeeID;
        });
        callback(null, result);
    })
}
//FIND IS NOT IMPLEMENTED IN NODE, THIS SNIPPET IS COPY AND PASTE FROM JAVASCRIPT DOCS WEBSITE
//but hell, it worked.
Array.prototype.find = function(predicate){
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
            return value;
        }
    }
    return undefined;
};