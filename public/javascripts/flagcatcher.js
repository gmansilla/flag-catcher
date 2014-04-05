
var socket = io.connect('/');

var game;

var KEY = {
    UP: 87,
    DOWN: 83,
    RIGHT: 68,
    LEFT: 65,
    PLACEMINE: 32 //spacebar
};

var flagcatcher = {
    scoreA: 0, //score for player A
    scoreB: 0  //score for player B
}

flagcatcher.pressedKeys = [];
flagcatcher.player = {
    speed: 5,
    x: 150,
    y: 100
}

var playersSteps = {
    step1: 1, 
    step2: 1, 
    step3: 1, 
    step4: 1, 
    step5: 1, 
    step6: 1, 
    step7: 1, 
    step8: 1,
    step9: 1, 
    step10: 1, 
    step11: 1, 
    step12: 1, 
    step13: 1, 
    step14: 1, 
    step15: 1, 
    step16: 1
}

var buttons;
var gameLoopFunction;

function animatePlayer() {
    game.users.forEach(function (player) {

        //console.log("user: " + user.id + " has step: " + user.step);

        //console.log(user.id);
        //console.log("user.team" + user.team.toLowerCase());
        //console.log("player.direction " + player.direction.toLowerCase());
        //console.log("player.PrevDirection" + player.prevDirection.toLowerCase());
        if(player.id == user.id)
        {
            player.direction = user.direction;
        }
        
        if (player.direction == "right") {
            
            //console.log(playersSteps[player.id].step);
            //console.log(player.step);
            var text = "frames";
            $("#player" + player.id).addClass(player.direction + "Entire" + player.team);

            if (player.prevDirection != "right") {
                $("#player" + player.id).css("width", 17);
                //remove running class
                $("#player" + player.id).removeClass(player.prevDirection + "Entire" + player.team);
                $("#player" + player.id).removeClass(player.prevDirection + "" + playersSteps[player.id]);
                playersSteps[player.id] = 0;
                player.prevDirection = player.direction;
            }
            else {
                $("#player" + player.id).removeClass(text + playersSteps[player.id]);
            }
            $("#player" + player.id).addClass(player.direction + "Entire" + player.team);
            playersSteps[player.id] += 1;

            if (playersSteps[player.id] > 5) {
                playersSteps[player.id] = 1;
            }

            $("#player" + player.id).addClass(text + playersSteps[player.id]);
        }


        if (player.direction == "left") {
            var text = "frames";
            $("#player" + player.id).addClass(player.direction + "Entire" + player.team);

            if (player.prevDirection != "left") {
                $("#player" + player.id).css("width", 17);
                //remove running class
                $("#player" + player.id).removeClass(player.prevDirection + "Entire" + player.team);
                $("#player" + player.id).removeClass(player.prevDirection + "" + playersSteps[player.id]);
                playersSteps[player.id] = 0;
                player.prevDirection = player.direction;
            }
            else {
                $("#player" + player.id).removeClass(text + playersSteps[player.id]);
            }
            $("#player" + player.id).addClass(player.direction + "Entire" + player.team);
            playersSteps[player.id] += 1;

            if (playersSteps[player.id] > 5) {
                playersSteps[player.id] = 1;
            }

            $("#player" + player.id).addClass(text + playersSteps[player.id]);
            //console.log(player.step);
            //console.log( $("#player" + player.id).css("width"));
        }


        //NEW LEFT


        if (player.direction == "up") {
            var text = "frames";
            $("#player" + player.id).addClass(player.direction + "Entire" + player.team);

            if (player.prevDirection != "up") {
                $("#player" + player.id).css("width", 17);
                //remove running class
                $("#player" + player.id).removeClass(player.prevDirection + "Entire" + player.team);
                $("#player" + player.id).removeClass(player.prevDirection + "" + playersSteps[player.id]);
                playersSteps[player.id] = 0;
                player.prevDirection = player.direction;
            }
            else {
                $("#player" + player.id).removeClass(text + playersSteps[player.id]);
            }
            $("#player" + player.id).addClass(player.direction + "Entire" + player.team);
            playersSteps[player.id] += 1;

            if (playersSteps[player.id] > 5) {
                playersSteps[player.id] = 1;
            }

            $("#player" + player.id).addClass(text + playersSteps[player.id]);
        }

        if (player.direction == "down") {
            var text = "frames";
            $("#player" + player.id).addClass(player.direction + "Entire" + player.team);

            if (player.prevDirection != "down") {
                $("#player" + player.id).css("width", 17);
                //remove running class
                $("#player" + player.id).removeClass(player.prevDirection + "Entire" + player.team);
                $("#player" + player.id).removeClass(player.prevDirection + "" + playersSteps[player.id]);
                playersSteps[player.id] = 0;
                player.prevDirection = player.direction;
            }
            else {
                $("#player" + player.id).removeClass(text + playersSteps[player.id]);
            }
            $("#player" + player.id).addClass(player.direction + "Entire" + player.team);
            playersSteps[player.id] += 1;

            if (playersSteps[player.id] > 5) {
                playersSteps[player.id] = 1;
            }

            $("#player" + player.id).addClass(text + playersSteps[player.id]);
        }
    });
}


function movePlayer() {
    if (flagcatcher.pressedKeys[KEY.PLACEMINE]) {// SPACEBAR
        
        $('<div id="mine1" class="mine" ></div>').appendTo($('#game'));
    }    



    //use our custom timer to continuously check if a key is pressed
    if (flagcatcher.pressedKeys[KEY.UP]) {// arrow-up
        //Change direction
        user.direction = "up";
        game.users[user.internalIndex] = user;

        //move the paddle B up 5 pixels
        var top = parseInt($("#player" + user.id).css("top"));

        if (top - 5 < 0) {
            top = 0;
            $("#player" + user.id).css("top", top);
        }
        else {
            $("#player" + user.id).css("top", top - 5);
        }
        socket.emit('move', 'up');
    }

    if (flagcatcher.pressedKeys[KEY.DOWN]) { //arrow-down

        //Change direction
        user.direction = "down";
        game.users[user.internalIndex] = user;

        //move the paddle B down 5 pixels
        var top = parseInt($("#player" + user.id).css("top"));

        if (top + 5 > parseInt($("#game").css("height")) - parseInt($("#player" + user.id).css("height"))) {
            top = parseInt($("#game").css("height")) - parseInt($("#player" + user.id).css("height"));
            $("#player" + user.id).css("top", top);
        }
        else {
            $("#player" + user.id).css("top", top + 5);
        }
        socket.emit('move', 'down');
    }

    if (flagcatcher.pressedKeys[KEY.LEFT]) { //w
        //move the paddle A up 5 pixels

        //Change direction
        user.direction = "left";
        game.users[user.internalIndex] = user;

        var left = parseInt($("#player" + user.id).css("left"));

        if (left - 5 < 0) {
            left = 0;
            $("#player" + user.id).css("left", left);
        }
        else {
            $("#player" + user.id).css("left", left - 5);
        }
        socket.emit('move', 'left');

    }
    if (flagcatcher.pressedKeys[KEY.RIGHT]) { // s
        //move the paddle A down 5 pixels

        //Change direction
        user.direction = "right";
        game.users[user.internalIndex] = user;

        var left = parseInt($("#player" + user.id).css("left"));

        if (left + 5 > parseInt($("#game").css("width")) - parseInt($("#player" + user.id).css("width"))) {
            left = parseInt($("#game").css("width")) - parseInt($("#player" + user.id).css("width"));
            $("#player" + user.id).css("left", left);
        }
        else {
            $("#player" + user.id).css("left", left + 5);
        }
        socket.emit('move', 'right');
    }
    if (!(flagcatcher.pressedKeys[KEY.RIGHT]) || (flagcatcher.pressedKeys[KEY.LEFT]) || (flagcatcher.pressedKeys[KEY.UP]) || (flagcatcher.pressedKeys[KEY.DOWN])) {
        //player.direction = "standing";
    }


}


function loadStuff() {

    $("#game").addClass("gameBackgroundMenu");
    
}

function gameloop() {
    movePlayer();
    animatePlayer();
}
function viewCredits() {
    $("#title").fadeOut(800);
    $(".button").fadeOut(1000);   //addClass("hide");
    viewingCredits = true;
    viewingMenu = false;
}

function finishGame()
{
    clearInterval(gameLoopFunction);
}

$(function () {

    socket.emit('joingame', gameID);


    socket.on('data', function (data) {
        console.log(data);
    });

    socket.on('error', function (reason) {
        console.error('Unable to connect Socket.IO', reason);
    });

    socket.on('connect', function () {
        console.log('successfully established a working and authorized connection');
    });

    socket.on('message', function (data) {
        var data = JSON.parse(data);
        $('#logs').append('<p>' + data.message + '</p>');
    });

    $(document).keydown(function (e) {
        flagcatcher.pressedKeys[e.which] = true;
    });

    $(document).keyup(function (e) {
        flagcatcher.pressedKeys[e.which] = false;
    });

    socket.on('startgame', function (newGame) {
        console.log('game has started');
        console.log(newGame);
        game = newGame;
        $("#game").removeClass("gameBackgroundMenu");
        $("#game").addClass("gameBackgroundPlay");

        $("#score").addClass("scoreClass");
        $("#title").fadeOut(800);
        $(".button").fadeOut(1000);
	   //timer();
        viewingMenu = false;
        playing = true;
 

        game.users.forEach(function(user) {

            $('<div id="player' + user.id + '" class="player " style="top:' + user.y + 'px; left: ' + user.x + 'px"></div>').appendTo("#game");
            $("#player" + user.id).addClass(user.direction + "Entire" + user.team);
            $("#player" + user.id).prependTo("#game");
            user.step = 0;
            game.users[user.internalIndex] = user;
        });
        $("#redFlag").css("top", game.flag[0].y + "px");
        $("#redFlag").css("left", game.flag[0].x + "px");

        $("#blueFlag").css("top", game.flag[1].y + "px");
        $("#blueFlag").css("left", game.flag[1].x + "px");


        gameLoopFunction = setInterval(gameloop, 60);
    });

    socket.on('update_users_position', function(gameUpdated) {
        console.log('receiving update_users_position');
        game = gameUpdated;
        game.users.forEach(function(player) {
            if (player.id != user.id) {
                $('#player' + player.id).css("top", player.y + "px");
                $('#player' + player.id).css("left", player.x + "px");
            }

        });
        //check if a flag has been captured
        if (game.flagHasBeenCaptured == true) {

            game.flag.forEach(function(flag) {

                //check flag carrier
                //if player div is empty then attach the flag
                //then ignore this (this flag is already attached to its carrier)
                var player = $('#player' + flag.carrier);
                if (player.children().length == 0) {
                    var newFlag;
                    if (flag.team == 'a') {
                        newFlag = $("#blueFlag");
                    } else if (flag.team = 'b') {
                        newFlag = $("#redFlag");
                    }

                    newFlag.appendTo("#player" + flag.carrier);
                    $("#player" + flag.carrier).children().attr('style', '');
                }

            });
        }

        if (game.newScore != undefined) {
            $("#redscore").text("Red: " + game.scoreB);
            $("#bluescore").text("Blue: " + game.scoreA);
        }

    });

    socket.on('score_update', function(a, b) {
        console.log( a + " a and b: " + b);
        $("#redscore").innerHTML = "Red: " + a;     
        $("#bluescore").innerHTML = "Blue: " + b;
    });

    loadStuff();

    $("#playBtn").click(function () {
        socket.emit('requeststartgame', gameID);
    });



    //$("#creditsBtn").click(viewCredits);


});
