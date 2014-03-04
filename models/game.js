module.exports = function(sequelize, DataTypes) {
    var Game = sequelize.define('Task', {
        title: DataTypes.STRING
    }, {
        associate: function(models) {
            Game.hasMany(models.User)
        }
    })

    return Game
}