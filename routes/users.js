var db = require('../models')
var LocalStrategy = require('passport-local').Strategy;
var passport = undefined;
var util = require('util');

var users = undefined;
exports.configure = function(params) {
    passport = params.passport;
    users = db.User;
}


module.exports.serialize = function(user, done) {
    done(null, user.id);
}

module.exports.deserialize = function(id, done) {
    db.User.findById(id, function (err, user) {
        done(err, user);
    });
}

module.exports.strategy = new LocalStrategy(
    function(username, password, done) {
        console.log('given username is ' + username );
        console.log('given password is ' + password );
        // asynchronous verification, for effect...
        process.nextTick(function () {
            // Find the user by username. If there is no user with the given
            // username, or the password is not correct, set the user to `false` to
            // indicate failure and set a flash message. Otherwise, return the
            // authenticated `user`.


            //util.inspect(console.log(db));
            db.User.findByUsername(username, function(err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
                if (user.password !== password) { return done(null, false, { message: 'Invalid password' }); }
                return done(null, user);
            })
        });
    }
);

module.exports.ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    return res.redirect('/login');
}

module.exports.doAccount = function(req, res){
    res.render('account', {
        title: "Account information for " + req.user.username,
        user: req.user
    });
}

module.exports.doLogin = function(req, res){
    res.render('login', {
        title: "Login to Flag Catcher",
        user: req.user,
        //message: req.flash('error')
        //message: req.session.messages
    });
}

module.exports.postLogin = function(req, res) {
    //res.redirect('/');
    res.redirect('/account');
}

module.exports.doLogout = function(req, res){
    req.logout();
    res.redirect('/');
}

exports.register = function(req, res) {
    res.render('register', {
        title: 'User registration',
        errors: undefined,
        user: undefined
    });
}

exports.add = function(req, res) { //remove this
    var user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    db.User.create(user).success(function(u) {
        console.log('new user is '  + u.values);
        res.render('login', {
            title: 'Log in',
            user: undefined
        });

    });
}