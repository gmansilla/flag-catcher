var io = require('socket.io');
var util = require('util');
var db = require('../models');
var cookie  =   require('cookie');
var connect =   require('connect');
var userReader = require('../utils/user_reader');
var gameSettings = require('../settings');
var games = {};

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

            //check if signed with passport
            if (sessionStore.sessions[handshakeData.sessionID] !== undefined) {
                var userPassport = JSON.parse(sessionStore.sessions[handshakeData.sessionID]);
                if (userPassport.passport.user === undefined) {
                    console.log('rejecting because passport is invalid');
                    return accept('passport is invalid.', false);
                }
            }
        } else {
            return accept('No cookie transmitted.', false);
        }
        accept(null, true);
    });
    var SessionSockets = require('session.socket.io')
        , sessionSockets = new SessionSockets(io, sessionStore, cookieParser);
    sessionSockets.on('connection', function (err, socket, session) {
        //your regular socket.io code goes here
        //and you can still use your io object

        socket.on('joingame', function(gameId) {
            var user = userReader.getUser(socket.handshake.headers.cookie, sessionStore);
            socket.set('user', user, function() {
                db.Game.find({where: {id: gameId, isOver: 0, isRunning: 0}, include: [db.GamesUser]})
                    .success(function(game) {
                        //console.log('gameInf');
                        //util.inspect(console.log(game.gamesUsers));
                        game.gamesUsers.forEach(function(gameUser){
                           if (gameUser.dataValues.UserId == user.id) {
                               socket.room = gameId;
                               socket.join(gameId);
                               socket.in(socket.room).broadcast.send(JSON.stringify({message: user.username + ' has joined the game'}));
                               socket.in(socket.room).send(JSON.stringify({message: user.username + ' has joined the game'}));
                               socket.set('team', gameUser.dataValues.team, function() {});
                               userJoin(user, socket.room, gameUser.dataValues.team);
                           }
                        });
                    }).error(function(err) {});
            });
        });

        socket.on('requeststartgame', function(room) {
            console.log('requeststartgame in game  ' + room);
            var user = userReader.getUser(socket.handshake.headers.cookie, sessionStore);
            socket.get('user', function(err, user) {
                //check if user calling this is the owner of the game
                if (games[room].owner == user.id) { //yes he is the owner
                    games[room].isRunning = 1;
                    socket.in(room).broadcast.emit('startgame', games[room] );
                    socket.in(room).emit('startgame', games[room]);
                }
            });

        });

        socket.on('move', function(direction) {

        });

    });
};

function userJoin(user, room, team) {
    var positionX, positionY, min;
    if (games[room] == undefined) {
        var flag1 = {
            x: gameSettings.options.flag1.x,
            y: gameSettings.options.flag1.y,
            team: 'B',
            carrier: null
        }

        var flag2 = {
            x: gameSettings.options.flag2.x,
            y: gameSettings.options.flag2.y,
            team: 'A',
            carrier: null
        }

        games[room] = {
            id: room,
            users: [],
            mines: [],
            flag: [flag1, flag2],
            scoreA: 0,
            scoreB: 0,
            timeLeft: gameSettings.options.time,
            owner: user.id,
            isRunning: 0
        }

    }

    if (team == 'A') {
        positionX = Math.floor(Math.random() * ((gameSettings.options.fieldWidth / 2) - 6)) + 5;
    } else if (team == 'B') {
        min = (gameSettings.options.fieldWidth / 2 + 5);
        positionX = Math.floor(Math.random() * (gameSettings.options.fieldWidth - min + 1)) + min;
    }
    min = 5;
    positionY = Math.floor(Math.random() * (gameSettings.options.fieldHeight - min + 1)) + min;
    user.x = positionX;
    user.y = positionY;
    user.lives = gameSettings.options.lifes;
    user.energy = gameSettings.options.energy;
    user.mines = gameSettings.options.mines;
    user.direction = 'left';
    user.prevDirection = 'nothing';
    user.step = 1;

    user.team = team;
    games[room].users.push(user);
    console.log('game data so far: ');
    util.inspect(console.log(games[room]));

}