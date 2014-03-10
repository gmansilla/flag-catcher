var Game = undefined;
var util = require('util');


module.exports = function(sequelize, DataTypes) {
    var Game = sequelize.define('Game', {
        isOver: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        isRunning: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        associate: function(models) {
            Game.hasMany(models.User,{through: models.GamesUser})
            Game.belongsTo(models.User, {as: 'Creator'})
        }
    })

    return Game
}