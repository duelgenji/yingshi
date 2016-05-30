/**
 * Created by wade on 15/10/29.
 */
//var commonUrl = 'http://101.231.124.8:45698/fullway-health/';
//var commonUrl = 'http://172.16.74.14:8080/fullway-health/';
var commonUrl = 'http://172.16.77.17:8080/';

var userNum = '13901694939';
$.get(commonUrl+'im/toInterrogation/'+userNum, function(response) {
    if(response.ret_values.lastQuestionStatus === '1'){
        location.href = 'inquiry_waiting.html';
    }
});