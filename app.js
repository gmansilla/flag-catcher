
/**
 * Module dependencies.
 */
var flash = require('connect-flash');
var users = require('./routes/users');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var express = require('express');
var routes = require('./routes');
var users = require('./routes/users');
var http = require('http');
var path = require('path');
var util = require('util');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.session({ secret: 'keyboard cat' }));
// Initialize Passport! Also use passport.session() middleware,
// to support persistent login sessions (recommended). app.use(flash());
app.use(passport.initialize()); app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

passport.serializeUser(users.serialize);
passport.deserializeUser(users.deserialize);
passport.use(users.strategy);


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Sequelize model
var usersModel = require('./models/user');
var db = require('./database');

usersModel.connect(db.configuration,
    function(err) {
        if (err) throw err;
    }
);
users.configure({
    users: usersModel,
    passport: passport
});

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


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
