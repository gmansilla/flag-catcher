
var seconds = 5;
function timer() {
var time = setInterval(function () {
 	var timer = document.getElementById("timer").innerHTML = "Timer:" + seconds;
	seconds = seconds-1;
	if(seconds == -1 && bluescore == redscore)
	{ 
		seconds = seconds+30;
	}

	else if(seconds == -1)
	{


		if(bluescore > redscore)
		{
			var timer = document.getElementById("timer").innerHTML = "Blue team wins";
			clearInterval(time);
			finishGame();

		}


		if(redscore > bluescore)
		{
			var timer = document.getElementById("timer").innerHTML = "Red team wins";
			clearInterval(time);
			finishGame();
		}
	}

    }, 1000);
}