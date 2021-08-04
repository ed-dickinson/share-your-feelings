var Feeler = require('../models/feeler');

const { body,validationResult } = require('express-validator');

exports.sign_up = function(req, res) {
  res.render('sign_up', {title: 'Sign Up'});
};

// exports.sign_up_post = function(req, res, next) {
//   const user = new Feeler({
//     username: req.body.username,
//     password: req.body.password
//   }).save(err => {
//     if (err) {
//       return next(err);
//     }
//     res.redirect('/');
//   })
// };

exports.sign_up_post = [

  body('username', 'You need a username!').trim().isLength({min:1}).escape(),

  (req, res, next) => {

    const errors = validationResult(req);

    const user = new Feeler({
      username: req.body.username,
      password: req.body.password
    });

    if (!errors.isEmpty()) {
      res.render('sign_up', {title: 'Sign Up', user: user, errors: errors.array()});
      return;
    } else {
      Feeler.findOne({'username':req.body.username})
      .exec(function(err, found_feeler) {
        if (err) {return next(err);}
        if (found_feeler) {
          // res.redirect('feeler' + found_feeler.url);
          // user.username = '';
          res.render('sign_up', {title: 'Sign Up', user: user, message: "Sorry, there's already someone who goes by this name. Please choose another:", errors: errors.array()});
        } else {
          user.save(function (err) {
            if (err) {return next(err);}
            res.redirect('feeler' + user.url);
          });
        }
      });
    }
    // .save(err => {
    //   if (err) {
    //     return next(err);
    //   }
    //   res.redirect('/');
    // })
  }
];

exports.feeler_page = function(req, res) {
  res.send('not imp:' + req.params.id);
};
