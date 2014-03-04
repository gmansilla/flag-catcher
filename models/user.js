/**
 * Created by guille on 2/7/2014.
 */

//var util = require('util');

//var sequelize = undefined;
//var User = undefined;

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true
        },
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
            User.hasMany(models.Game)
        }
    })

    return User
}
/*module.exports.connect = function(params, callback) {
    var sequlz = new Sequelize(params.dbname, params.username, params.password, params.params);
    User = sequlz.define('User', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true
        },
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
    })

}*/

/*exports.disconnect = function(callback) {
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
        callback(err);
    });
}*/
/*module.exports.create = function(id, username,
                                 password, email, callback) {
    User.create({
        id: id,
        username: username,
        password: password,
        email: email
    }).success(function(user) {
        callback();
    }).error(function(err) {
        callback(err);
    });
}
module.exports.update = function(id, username,
                                 password, email, callback) {
    User.find({ where: { id: id } }).success(function(user) {
        user.updateAttributes({
            id: id,
            username: username,
            password: password,
            email: email
        }).success(function() {
            callback();
        }).error(function(err) {
            callback(err);
        });
    });
}*/

module.exports.findById = function(id, callback) {
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

module.exports.findByUsername = function(username, callback) {
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
}