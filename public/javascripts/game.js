var socket = io.connect('/');
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
});