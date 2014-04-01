
var seconds = 180;
function timer() {
var time = setInterval(function () {
 var timer = document.getElementById("timer").innerHTML = "Timer:" + seconds;
seconds = seconds-1;
if(seconds== 0)
{ var timer = document.getElementById("timer").innerHTML = "Game is over";
}
    }, 1000);
}