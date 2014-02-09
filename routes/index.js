
/*
 * GET home page.
 */
var notes = undefined;

exports.configure = function(params) {
    notes = params.model;
}

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};