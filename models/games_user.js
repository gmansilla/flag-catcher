var GamesUser = undefined;
module.exports = function (sequelize, DataTypes) {
    var GamesUser = sequelize.define('GamesUser', {
        team: {
            type: DataTypes.STRING,
        },
        scores: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    })
    return GamesUser
}
