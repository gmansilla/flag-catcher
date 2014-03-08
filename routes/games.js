var db = require('../models')
var passport = undefined;
var util = require('util');


exports.configure = function(params) {
    passport = params.passport;
}

exports.add = function(req, res) {
    db.User.findById(req.session.passport.user, function(err, user) {
        if (!err) {
            db.Game.create({}).success(function(game) {
                game.setCreator(user).success(function() { //saves the owner
                    game.setUsers([user]).success(function() { //saves the user in the join table
                        //util.inspect(console.log(game));
                        //res.redirect('/account');
                        res.redirect('/viewgame/' + game.dataValues.id);
                    })
                })
            })
        }
    })
}

exports.lobby = function(req, res) {
    db.Game.findAll({where: {isOver: 0, isRunning: 0}, include: [db.User]}).success(function(games) {
        //util.inspect(console.log(games));
        res.render(
            'lobby', {
                games: games,
                title: 'Lobby',
                //user:
            }
        )
    });
}

exports.viewgame = function(req, res) {
    db.Game.find({where: {id: req.params.id, isOver: 0, isRunning: 0},
        include: [db.User]}).success(function(game) {

            res.render(
                'viewgame', {
                    game: game.dataValues,
                    loggedUser: req.user
                }
            );
        });
}