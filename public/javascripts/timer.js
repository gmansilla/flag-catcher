
var seconds = 180;
function timer() {
var time = setInterval(function () {
 var timer = document.getElementById("timer").innerHTML = "Timer:" + seconds;
seconds = seconds-1;
if(seconds== 0&& bluescore== redscore)
{ seconds = seconds+30;


}

else if(seconds == 0)
{


if(bluescore > redscore)
{
var timer = document.getElementById("timer").innerHTML = "Blue team wins";
}


if(redscore > bluescore)
{
var timer = document.getElementById("timer").innerHTML = "Red team wins";
}
}

    }, 1000);
}