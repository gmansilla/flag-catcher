/**
 * Created by guille on 2/7/2014.
 */

var util = require('util');
var Sequelize = require("sequelize");
var User = undefined;

module.exports.connect = function(params, callback) {
    var sequlz = new Sequelize(params.dbname, params.username, params.password, params.params);
    User = sequlz.define('User', {
        username: {
            type: Sequelize.STRING,
            validate: {
                notEmpty: true,
                notNull: true
            },
            unique: true
        },
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
        }
    });
}

exports.disconnect = function(callback) {
    callback();
}

exports.create = function(user, callback) {
    User.create({
        username: user.username,
        email: user.email,
        password: user.password
    }).success(function(note) {
        callback();
    }).error(function(err) {
        //util.inspect(console.log(err));
        callback(err);
    });
}