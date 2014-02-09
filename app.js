
/**
 * Module dependencies.
 */

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
app.use(express.bodyParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Sequelize model
var model = require('./models/user');
var db = require('./database');

model.connect(db.configuration,
    function(err) {
        if (err) throw err;
    }
);

[ routes, users ].forEach(function(router) {
    router.configure({ model: model });
});

//app.get('/', routes.index);

app.get('/register', users.register);
app.post('/usersadd', users.add);
//app.get('/lobby')

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
