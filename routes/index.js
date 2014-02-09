/*
 * GET home page.
 */


exports.configure = function(params) {

}

exports.index = function(req, res){
  res.render('index', { title: 'Welcome' });
};