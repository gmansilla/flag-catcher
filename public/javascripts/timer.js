var seconds = 0;
function timer() {
var time = setInterval(function () {
 var timer = document.getElementById("timer").innerHTML = "Timer:" + seconds;
seconds = seconds+1;
    }, 1000);
}