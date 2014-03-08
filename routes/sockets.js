var io = require('socket.io');
var util = require('util');

var cookie  =   require('cookie');
var connect =   require('connect');



exports.initialize = function (server, sessionStore, cookieParser) {
    io = io.listen(server);
    io.set('authorization', function (handshakeData, accept) {
        // check if there's a cookie header
        if (handshakeData.headers.cookie) {
            var a = cookie.parse(handshakeData.headers.cookie);
            handshakeData.cookie = cookie.parse(handshakeData.headers.cookie);
            handshakeData.sessionID = connect.utils.parseSignedCookie(handshakeData.cookie['express.sid'], 'secret');
            if (handshakeData.cookie['express.sid'] == handshakeData.sessionID) {
                // reject the handshake
                return accept('Cookie is invalid.', false);
            }
            //console.log('handshakeData.sessionID = ' + handshakeData.sessionID );
            //check if signed with passport
            if (sessionStore.sessions[handshakeData.sessionID] !== undefined) {
                var userPassport = JSON.parse(sessionStore.sessions[handshakeData.sessionID]);
                //util.inspect(console.log(a.passport));
                if (userPassport.passport.user === undefined) {
                    console.log('rejecting because passport is invalid');
                    return accept('passport is invalid.', false);
                } else {
                    console.log("passport is " + userPassport.passport.user);
                }
            }


        } else {
            // if there isn't, turn down the connection with a message
            // and leave the function.
            console.log('refusing');
            return accept('No cookie transmitted.', false);
        }

        // accept the incoming connection
        accept(null, true);
    });
    var SessionSockets = require('session.socket.io')
        , sessionSockets = new SessionSockets(io, sessionStore, cookieParser);
    sessionSockets.on('connection', function (err, socket, session) {
        //your regular socket.io code goes here
        //and you can still use your io object
        console.log('socket open');
        socket.on('mensaje', function(){
            console.log('receveing mensaje');
            //util.inspect(console.log(socket.handshake.headers));
            //util.inspect(console.log(sessionStore.sessions));
        });

    });



};

