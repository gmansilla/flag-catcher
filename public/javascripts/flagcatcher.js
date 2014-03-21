var socket = io.connect('/');

var game;

var KEY = {
    UP: 87,
    DOWN: 83,
    RIGHT: 68,
    LEFT: 65
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

var buttons;

function animatePlayer() {
    game.users.forEach(function (user) {
        //console.log(user.id);

        if (user.direction == "right") {
            var text = "frames";
            $("#player" + user.id).addClass(user.direction + "Entire");

            if (user.prevDirection != "right") {
                $("#player" + user.id).css("width", 17);
                //remove running class
                $("#player" + user.id).removeClass(user.prevDirection + "Entire");
                $("#player" + user.id).removeClass(user.prevDirection + "" + user.step);
                user.step = 0;
                user.prevDirection = user.direction;
            }
            else {
                $("#player" + user.id).removeClass(text + user.step);
            }
            $("#player" + user.id).addClass(user.direction + "Entire");
            user.step += 1;

            if (user.step > 5) {
                user.step = 1;
            }

            $("#player" + user.id).addClass(text + user.step);
        }


        if (user.direction == "left") {
            var text = "frames";
            $("#player" + user.id).addClass(user.direction + "Entire");

            if (user.prevDirection != "left") {
                $("#player" + user.id).css("width", 17);
                //remove running class
                $("#player" + user.id).removeClass(user.prevDirection + "Entire");
                $("#player" + user.id).removeClass(user.prevDirection + "" + user.step);
                user.step = 0;
                user.prevDirection = user.direction;
            }
            else {
                $("#player" + user.id).removeClass(text + user.step);
            }
            $("#player" + user.id).addClass(user.direction + "Entire");
            user.step += 1;

            if (user.step > 5) {
                user.step = 1;
            }

            $("#player" + user.id).addClass(text + user.step);
            //console.log(user.step);
            //console.log( $("#player" + user.id).css("width"));
        }


        //NEW LEFT


        if (user.direction == "up") {
            var text = "frames";
            $("#player" + user.id).addClass(user.direction + "Entire");

            if (user.prevDirection != "up") {
                $("#player" + user.id).css("width", 17);
                //remove running class
                $("#player" + user.id).removeClass(user.prevDirection + "Entire");
                $("#player" + user.id).removeClass(user.prevDirection + "" + user.step);
                user.step = 0;
                user.prevDirection = user.direction;
            }
            else {
                $("#player" + user.id).removeClass(text + user.step);
            }
            $("#player" + user.id).addClass(user.direction + "Entire");
            user.step += 1;

            if (user.step > 5) {
                user.step = 1;
            }

            $("#player" + user.id).addClass(text + user.step);
        }

        if (user.direction == "down") {
            var text = "frames";
            $("#player" + user.id).addClass(user.direction + "Entire");

            if (user.prevDirection != "down") {
                $("#player" + user.id).css("width", 17);
                //remove running class
                $("#player" + user.id).removeClass(user.prevDirection + "Entire");
                $("#player" + user.id).removeClass(user.prevDirection + "" + user.step);
                user.step = 0;
                user.prevDirection = user.direction;
            }
            else {
                $("#player" + user.id).removeClass(text + user.step);
            }
            $("#player" + user.id).addClass(user.direction + "Entire");
            user.step += 1;

            if (user.step > 5) {
                user.step = 1;
            }

            $("#player" + user.id).addClass(text + user.step);
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
    })
}


function movePlayer() {

    //use our custom timer to continuously check if a key is pressed
    if (flagcatcher.pressedKeys[KEY.UP]) {// arrow-up
        //Change direction
        user.direction = "up";

        //move the paddle B up 5 pixels
        var top = parseInt($("#player" + user.id).css("top"));

        if (top - 5 < 0) {
            top = 0;
            $("#player" + user.id).css("top", top);
        }
        else {
            $("#player" + user.id).css("top", top - 5);
        }
        //socket.emit('walkup', )
    }

    if (flagcatcher.pressedKeys[KEY.DOWN]) { //arrow-down

        //Change direction
        user.direction = "down";

        //move the paddle B down 5 pixels
        var top = parseInt($("#player" + user.id).css("top"));

        if (top + 5 > parseInt($("#game").css("height")) - parseInt($("#player" + user.id).css("height"))) {
            top = parseInt($("#game").css("height")) - parseInt($("#player" + user.id).css("height"));
            $("#player" + user.id).css("top", top);
        }
        else {
            $("#player" + user.id).css("top", top + 5);
        }
    }

    if (flagcatcher.pressedKeys[KEY.LEFT]) { //w
        //move the paddle A up 5 pixels

        //Change direction
        user.direction = "left";

        var left = parseInt($("#player" + user.id).css("left"));

        if (left - 5 < 0) {
            left = 0;
            $("#player" + user.id).css("left", left);
        }
        else {
            $("#player" + user.id).css("left", left - 5);
        }


    }
    if (flagcatcher.pressedKeys[KEY.RIGHT]) { // s
        //move the paddle A down 5 pixels

        //Change direction
        user.direction = "right";

        var left = parseInt($("#player" + user.id).css("left"));

        if (left + 5 > parseInt($("#game").css("width")) - parseInt($("#player" + user.id).css("width"))) {
            left = parseInt($("#game").css("width")) - parseInt($("#player" + user.id).css("width"));
            $("#player" + user.id).css("left", left);
        }
        else {
            $("#player" + user.id).css("left", left + 5);
        }
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
        game = newGame;
        $("#game").removeClass("gameBackgroundMenu");
        $("#game").addClass("gameBackgroundPlay");

        $("#score").addClass("scoreClass");
        $("#title").fadeOut(800);
        $(".button").fadeOut(1000);
        viewingMenu = false;
        playing = true;

        game.users.forEach(function (user) {
            $('<div id="player' + user.id + '" class="player" style="top:' + user.y + 'px; left: ' + user.x + 'px"></div>').appendTo($('#game'));
        });

        setInterval(gameloop, 60);
    });


    loadStuff();

    $("#playBtn").click(function () {
        socket.emit('requeststartgame', gameID);
    });

    //$("#creditsBtn").click(viewCredits);


});
