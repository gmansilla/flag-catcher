/**
 * Created by guille on 2/7/2014.
 */

//var util = require('util');

//var sequelize = undefined;
var User = undefined;

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {

        username: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                notNull: true
            },
            unique: true
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        }
    }, {
        associate: function(models) {
            User.hasMany(models.Game, {through: models.GamesUser})
        },
        classMethods: {
            findByUsername: function(username, callback) {
                console.log('passed username is ' + username);
                User.find({where:{username: username}}).success(function(user){
                    if (!user) {
                        callback('User ' + username + ' does not exist');
                    } else {
                        callback(null, {
                            id: user.id,
                            username: user.username,
                            password: user.password,
                            email: user.email
                        });
                    }
                });
            },
            findById: function(id, callback) {
                User.find({ where: { id: id } }).success(function(user) {
                    if (!user) {
                        callback('User ' + id + ' does not exist');
                    } else {
                        callback(null, {
                            id: user.id,
                            username: user.username,
                            password: user.password,
                            email: user.email
                        });
                    }
                });
            }
        }
    })

    return User
}

