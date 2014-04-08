
var socket = io.connect('/');

var game;

var KEY = {
    UP: 87,
    DOWN: 83,
    RIGHT: 68,
    LEFT: 65,
    PLACEMINE: 77 // m
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
        if(player.id == user.id) {
            player.direction = user.direction;
        }
        
        if (player.direction == "right") {
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
        flagcatcher.pressedKeys[KEY.PLACEMINE] = false;
        socket.emit('put_mine');
    }    

    if (flagcatcher.pressedKeys[KEY.UP]) {
        user.direction = "up";
        game.users[user.internalIndex] = user;
        socket.emit('move', 'up');
    }

    if (flagcatcher.pressedKeys[KEY.DOWN]) {
        user.direction = "down";
        game.users[user.internalIndex] = user;
        socket.emit('move', 'down');
    }

    if (flagcatcher.pressedKeys[KEY.LEFT]) {
        user.direction = "left";
        game.users[user.internalIndex] = user;
        socket.emit('move', 'left');
    }

    if (flagcatcher.pressedKeys[KEY.RIGHT]) {
        user.direction = "right";
        game.users[user.internalIndex] = user;
        socket.emit('move', 'right');
    }

    if (!(flagcatcher.pressedKeys[KEY.RIGHT]) || (flagcatcher.pressedKeys[KEY.LEFT]) || (flagcatcher.pressedKeys[KEY.UP]) || (flagcatcher.pressedKeys[KEY.DOWN])) {
        //player.direction = "standing";
    }
}


function loadGame() {

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
        if (e.which != KEY.PLACEMINE) {
            flagcatcher.pressedKeys[e.which] = true;
        }
    });

    $(document).keyup(function (e) {
        flagcatcher.pressedKeys[e.which] = false;
        if (e.which == KEY.PLACEMINE) {
            flagcatcher.pressedKeys[e.which] = true;
        }
    });

    socket.on('startgame', function (newGame) {
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
        game = gameUpdated;
        game.users.forEach(function(player) {
            $('#player' + player.id).css("top", player.y + "px");
            $('#player' + player.id).css("left", player.x + "px");
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
            if (game.resetFlag == 'a') {
                $("#redscore").text("Red: " + game.scoreB);
            } else if (game.resetFlag == 'b') {
                $("#bluescore").text("Blue: " + game.scoreA);
            }
        }

        if (game.resetFlag != undefined) {
            var flag;
            if (game.resetFlag == 'a') {
                flag = $("#blueFlag");
                x = game.flag[1].x;
                y = game.flag[1].y;
            } else if (game.resetFlag == 'b') {
                flag = $("#redFlag");
                x = game.flag[0].x;
                y = game.flag[0].y;
            }
            flag.prependTo("#game");
            flag.css("top", y + "px");
            flag.css("left", x + "px");
        }
    });

    socket.on('team_put_mine', function(mine) {
        console.log('team put a mine');
        console.log(mine);
        var mineClass;
        if (mine.team == 'a') {
            mineClass = 'mineRed';
        } else if (mine.team == 'b') {
            mineClass = 'mineBlue';
        }
        mine.y += 40;
        $('<div class="mine ' + mineClass + '" ></div>').appendTo($('#game')).css({top: mine.y + "px", left: mine.x + "px"});
    });

    socket.on('player_stepped_on_mine', function() {
        //play sound
    });

    loadGame();
    $("#playBtn").click(function () {
        socket.emit('requeststartgame', gameID);
    });
    //$("#creditsBtn").click(viewCredits);
});
