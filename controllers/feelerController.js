var Feeler = require('../models/feeler');

exports.sign_up = function(req, res) {
  res.render('sign_up', {title: 'Sign Up'});
};

exports.sign_up_post = function(req, res, next) {
  const user = new Feeler({
    username: req.body.username,
    password: req.body.password
  }).save(err => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  })
};
