var util = require('util');
var User = undefined;
exports.configure = function(params) {
    User = params.model;
}



exports.register = function(req, res) {
    res.render('register', { title: 'User registration', errors: undefined });
}

exports.add = function(req, res) {
    var user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    User.create(user, function(err) {
       if (err) {
           util.inspect(console.log(err));
           res.render('register', {
              title: "Register",
              errors: err
           });
       } else {
            
       }
    });
}