module.exports = function(sequelize, DataTypes) {
    var Game = sequelize.define('Game', {
        isOver: DataTypes.INTEGER,
    }, {
        associate: function(models) {
            Game.hasMany(models.User)
            Game.belongsTo(models.User, {as: 'Creator'})
        }
    })

    return Game
}