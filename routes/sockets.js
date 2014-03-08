var io = require('socket.io');
var util = require('util');

var cookie  =   require('cookie');
var connect =   require('connect');
exports.initialize = function (server) {
    io = io.listen(server);
    /*this.gameInfra = io.of("/game_infra");
    this.gameInfra.on("connection", function(socket) {
        //util.inspect(console.log(express));
        socket.on("user_connects", function() {

        });
    });*/
    io.set('authorization', function (handshakeData, accept) {
        util.inspect(console.log(handshakeData));
        // check if there's a cookie header
        if (handshakeData.headers.cookie) {
            // if there is, parse the cookie
            handshakeData.cookie = cookie.parse(handshakeData.headers.cookie);
            // the cookie value should be signed using the secret configured above (see line 17).
            // use the secret to to decrypt the actual session id.
            handshakeData.sessionID = connect.utils.parseSignedCookie(handshakeData.cookie['express.sid'], 'secret');
            // if the session id matches the original value of the cookie, this means that
            // we failed to decrypt the value, and therefore it is a fake.
            if (handshakeData.cookie['express.sid'] == handshakeData.sessionID) {
                // reject the handshake
                return accept('Cookie is invalid.', false);
            }
        } else {
            // if there isn't, turn down the connection with a message
            // and leave the function.
            return accept('No cookie transmitted.', false);
        }
        // accept the incoming connection
        accept(null, true);
    });

// upon connection, start a periodic task that emits (every 1s) the current timestamp
    io.on('connection', function (socket) {
        //var sender = setInterval(function () {
            //socket.emit('data', new Date().getTime());
        //}, 1000)

        //socket.on('disconnect', function() {
        //    clearInterval(sender);
        //})

    });
};

