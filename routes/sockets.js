var io = require('socket.io');
var util = require('util');


exports.initialize = function (server) {
    io = io.listen(server);
    this.gameInfra = io.of("/game_infra");
    this.gameInfra.on("connection", function(socket) {
        //util.inspect(console.log(express));
        socket.on("user_connects", function() {

        });
    });
};

