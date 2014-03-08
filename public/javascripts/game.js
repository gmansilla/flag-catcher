//var gameInfra = io.connect('/');
var tick = io.connect('/');
$(function() {
    /*gameInfra.on('message_received', function(message) {
       console.log(message);
    });*/
    //gameInfra.emit("user_connects");

    tick.emit('mensaje');
    tick.on('data', function (data) {
        console.log(data);
    });

    tick.on('error', function (reason){
        console.error('Unable to connect Socket.IO', reason);
    });

    tick.on('connect', function (){
        console.info('successfully established a working and authorized connection');
    });
});