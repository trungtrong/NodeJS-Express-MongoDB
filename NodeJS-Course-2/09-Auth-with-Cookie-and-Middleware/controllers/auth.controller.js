

module.exports.login = function(req, res, next) {
  res.render('auth');
}

// using body parser to handle POST request
module.exports.postLogin = function(req, res, next) {
  // receive data by body-parser
  req.body
}
