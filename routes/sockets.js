var io = require('socket.io');
var util = require('util');

var cookie  =   require('cookie');
var connect =   require('connect');



exports.initialize = function (server, sessionStore, cookieParser) {
    io = io.listen(server);
    var SessionSockets = require('session.socket.io')
        , sessionSockets = new SessionSockets(io, sessionStore, cookieParser);
    sessionSockets.on('connection', function (err, socket, session) {
        //your regular socket.io code goes here
        //and you can still use your io object
        console.log('socket open');
        socket.on('mensaje', function(){
            console.log('receveing mensaje');
            util.inspect(console.log(sessionStore.sessions));
        });

    });



};

