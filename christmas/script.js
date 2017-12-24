//Countdown
var year = new Date().getFullYear();
var datestr = "12/25/"+year;
var end = new Date(datestr);
var _second = 1000;
var _minute = _second * 60;
var _hour = _minute * 60;
var _day = _hour * 24;
var timer;

function showRemaining() {
    var now = new Date();
    var distance = end - now;
    if (distance < 0) {

        clearInterval(timer);
        document.getElementById('dtc').innerHTML = "Merry Christmas!";
        document.getElementById('udtc').style.visibility = "hidden";
        return;
    }
    
    var days = Math.floor(distance / _day);
    var hours = Math.floor((distance % _day) / _hour);
    var minutes = Math.floor((distance % _hour) / _minute);
    var seconds = Math.floor((distance % _minute) / _second);
    if(days == 0){
        document.getElementById('udtc').innerHTML = "day till Christmas";
    }
    document.getElementById("dtc").innerHTML = days+1;

}

timer = setInterval(showRemaining, 1000);
//Search
function search(){
    var inp = document.getElementById("search");
    var query = inp.value;
    var glink = "https://goo.gl/search/" + query;
    inp.value = "";
    document.location.href = glink;
}
document.body.onkeydown=function(cc){
    if(cc.keyCode==13){
        search()
    }
}