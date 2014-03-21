var socket = io.connect('/');
var KEY = {
UP: 87,
DOWN: 83,
RIGHT: 68,
LEFT: 65
}

var flagcatcher = {
scoreA : 0, //score for player A
scoreB : 0  //score for player B
}

flagcatcher.pressedKeys = [];
flagcatcher.player = {
	speed: 5,
	x: 150,
	y: 100
}

var player = {
	direction: "left", // Possible directions: "standing", "left", "right", "up", "down"
	prevDirection: "nothing",
	lives: 3,
	power: 100,
	step: 1
}

var buttons;

function animatePlayer() {
	if(player.direction == "right")
	{
		var text = "frames";
		$("#player").addClass(player.direction + "Entire");
		
		if(player.prevDirection != "right")
		{
			$("#player").css("width", 17);
			//remove running class
			$("#player").removeClass(player.prevDirection + "Entire");
			$("#player").removeClass(player.prevDirection + "" + player.step);
			player.step = 0;
			player.prevDirection = player.direction;
		}
		else{
			$("#player").removeClass(text + player.step);
		}
			$("#player").addClass(player.direction + "Entire");
			player.step += 1;
			
			if(player.step > 5)
            {
                player.step = 1;
            }
			
			$("#player").addClass(text + player.step);
	}

	
	
	
	if(player.direction == "left")
	{
		var text = "frames";
		$("#player").addClass(player.direction + "Entire");
		
		if(player.prevDirection != "left")
		{
			$("#player").css("width", 17);	
			//remove running class
			$("#player").removeClass(player.prevDirection + "Entire");
			$("#player").removeClass(player.prevDirection + "" + player.step);
			player.step = 0;
			player.prevDirection = player.direction;
		}	
		else{
			$("#player").removeClass(text + player.step);
		}
			$("#player").addClass(player.direction + "Entire");
			player.step += 1;
			
			if(player.step > 5)
            {
                player.step = 1;
            }
			
			$("#player").addClass(text + player.step);
			console.log(player.step);
			console.log( $("#player").css("width"));
	}
	
	
	
	//NEW LEFT
	
	
	
	
	if(player.direction == "up")
	{
		var text = "frames";
		$("#player").addClass(player.direction + "Entire");
		
		if(player.prevDirection != "up")
		{
			$("#player").css("width", 17);
			//remove running class
			$("#player").removeClass(player.prevDirection + "Entire");
			$("#player").removeClass(player.prevDirection + "" + player.step);
			player.step = 0;
			player.prevDirection = player.direction;
		}	
		else{
			$("#player").removeClass(text + player.step);
		}
			$("#player").addClass(player.direction + "Entire");
			player.step += 1;
			
			if(player.step > 5)
            {
                player.step = 1;
            }
			
			$("#player").addClass(text + player.step);
	}
	
	if(player.direction == "down")
	{
		var text = "frames";
		$("#player").addClass(player.direction + "Entire");
		
		if(player.prevDirection != "down")
		{
			$("#player").css("width", 17);	
			//remove running class
			$("#player").removeClass(player.prevDirection + "Entire");
			$("#player").removeClass(player.prevDirection + "" + player.step);
			player.step = 0;
			player.prevDirection = player.direction;
		}	
		else{
			$("#player").removeClass(text + player.step);
		}
			$("#player").addClass(player.direction + "Entire");
			player.step += 1;
			
			if(player.step > 5)
            {
                player.step = 1;
            }
			
			$("#player").addClass(text + player.step);
	}
	/*
	if(player.direction == "standing")
	{
		var text = "standing";
		$("#player").addClass(player.direction + "Entire");
		
		if(player.prevDirection != "standing")
		{
			$("#player").css("width", 15);
			//remove running class
			$("#player").removeClass(player.prevDirection + "Entire");
			$("#player").removeClass(player.prevDirection + "" + player.step);
			player.step = 0;
			player.prevDirection = player.direction;
		}	
			$("#player").removeClass(text + player.step);
			$("#player").addClass(player.direction + "Entire");
			player.step = 1;
			$("#player").addClass(text + player.step);
	}*/
}			
	
function movePlayer() {
//use our custom timer to continuously check if a key is pressed
	if(flagcatcher.pressedKeys[KEY.UP]) {// arrow-up
		//Change direction
		player.direction = "up";
		
		//move the paddle B up 5 pixels
		var top = parseInt($("#player").css("top"));
		
		if(top-5 < 0)
		{
			top = 0;
			$("#player").css("top", top);
		}
		else{
			$("#player").css("top", top-5);
		}
		//socket.emit('walkup', )
	}
	if(flagcatcher.pressedKeys[KEY.DOWN]) { //arrow-down
	
		//Change direction
		player.direction = "down";
		
		//move the paddle B down 5 pixels
		var top = parseInt($("#player").css("top"));
		
		if(top + 5 > parseInt($("#game").css("height")) - parseInt($("#player").css("height")))
		{
			top = parseInt($("#game").css("height")) - parseInt($("#player").css("height"));
			$("#player").css("top", top);
		}
		else{
			$("#player").css("top", top + 5);
		}
		
		
	}
	if(flagcatcher.pressedKeys[KEY.LEFT]) { //w
		//move the paddle A up 5 pixels
		
		//Change direction
		player.direction = "left";
		
		var left = parseInt($("#player").css("left"));
		
		if(left - 5 < 0)
		{
			left = 0;
			$("#player").css("left", left);
		}
		else{
			$("#player").css("left", left-5);
		}
		
		
	}
	if(flagcatcher.pressedKeys[KEY.RIGHT]) { // s
		//move the paddle A down 5 pixels
		
		//Change direction
		player.direction = "right";
		
		var left = parseInt($("#player").css("left"));
		
		if(left + 5 > parseInt($("#game").css("width")) - parseInt($("#player").css("width")))
		{
			left = parseInt($("#game").css("width")) - parseInt($("#player").css("width"));
			$("#player").css("left", left);
		}
		else{
			$("#player").css("left", left + 5);
		}
	}
	if(!(flagcatcher.pressedKeys[KEY.RIGHT]) || (flagcatcher.pressedKeys[KEY.LEFT]) || (flagcatcher.pressedKeys[KEY.UP]) || (flagcatcher.pressedKeys[KEY.DOWN])  ){
		//player.direction = "standing";
	}
}

function loadStuff() {
	$("#game").addClass("gameBackgroundMenu");
}

function play()
{		
	$("#game").removeClass("gameBackgroundMenu");
	$("#game").addClass("gameBackgroundPlay");
	
	$("#score").addClass("scoreClass");
	
	/*
	setTimeout(function()
	{
		$("#score").text(scoreText + score);
	}, 1000);
	*/
	
		//= parseInt($("#playground").height());
	$("#title").fadeOut(800);
	$(".button").fadeOut(1000);   //addClass("hide");
	
	viewingMenu = false;
	playing = true;
	
	//Game Loop
    setInterval(gameloop, 60);
	}
	
function gameloop(){
	movePlayer();
	animatePlayer();
}
function viewCredits()
{
	$("#title").fadeOut(800);
	$(".button").fadeOut(1000);   //addClass("hide");
	viewingCredits = true;
	viewingMenu = false;
}

$(function() {
    socket.emit('joingame', gameID );


    socket.on('data', function (data) {
        console.log(data);
    });

    socket.on('error', function (reason){
        console.error('Unable to connect Socket.IO', reason);
    });

    socket.on('connect', function (){
        console.info('successfully established a working and authorized connection');
    });

    socket.on('message', function(data) {
        var data = JSON.parse(data);
        $('#logs').append('<p>' + data.message + '</p>');
    });

    $(document).keydown(function(e){
        flagcatcher.pressedKeys[e.which] = true;
    });

    $(document).keyup(function(e){
        flagcatcher.pressedKeys[e.which] = false;
    });

    socket.on('startgame', function(game) {

    });

    loadStuff();

    $("#playBtn").click(play);
    //$("#creditsBtn").click(viewCredits);
});