
/**
 * Module dependencies.
 */
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var connect = require('connect')
var express = require('express');
var routes  = require('./routes')
var users = require('./routes/users');
var games = require('./routes/games');
var http = require('http');
var path = require('path');
var util = require('util');
var app = express();
var db  = require('./models');


var cookieParser = express.cookieParser('secret')
    , sessionStore = new connect.middleware.session.MemoryStore();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(cookieParser);
app.use(express.bodyParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.session({secret: 'secret', key: 'express.sid', store: sessionStore}));
// Initialize Passport! Also use passport.session() middleware,
// to support persistent login sessions (recommended). app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

passport.serializeUser(users.serialize);
passport.deserializeUser(users.deserialize);
passport.use(users.strategy);


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}



//app.get('/', routes.index);
app.get('/register', users.register);
app.post('/usersadd', users.add);
app.get('/account',    users.ensureAuthenticated, users.doAccount);
app.get('/login',      users.doLogin);
app.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
}), users.postLogin);
app.get('/logout',     users.doLogout);

//LOBBY
games.configure({passport: passport});
app.get('/lobby', games.lobby);
app.post('/creategame', games.add);

//GAME
app.get('/viewgame/:id', games.viewgame);

db
    .sequelize
    .sync() //{ force: true } will destroy and recreate everything
    .complete(function(err) {
        if (err) {
            throw err
        } else {
            /*http.createServer(app).listen(app.get('port'), function(){
                console.log('Express server listening on port ' + app.get('port'))
            })*/
            var server = http.createServer(app).listen(app.get('port'), function(){
                console.log('Express server listening on port ' + app.get('port'));
            });
            var socket = require('./routes/sockets.js');

            socket.initialize(server, sessionStore, cookieParser);
        }
    })
