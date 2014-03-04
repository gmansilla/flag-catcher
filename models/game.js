module.exports = function(sequelize, DataTypes) {
    var Game = sequelize.define('Game', {
        title: DataTypes.STRING
    }, {
        associate: function(models) {
            Game.hasMany(models.User)
            //Game.belongsTo(models.User, {as: 'Creator'})
        }
    })

    return Game
}