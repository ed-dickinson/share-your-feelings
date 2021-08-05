var User = require('../models/user');

const { body,validationResult } = require('express-validator');
const passport = require("passport");

exports.sign_up = function(req, res) {
  res.render('sign_up', {title: 'Sign Up', user: req.user});
};

// exports.sign_up_post = function(req, res, next) {
//   const user = new User({
//     username: req.body.username,
//     password: req.body.password
//   }).save(err => {
//     if (err) {
//       return next(err);
//     }
//     res.redirect('/');
//   })
// };

// function fleshOut(date) {
//   return date.length == 1 ? '0' + date.length : date.length;
// }

exports.log_in_post =  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  });

  exports.log_out_get = (req, res) => {
    req.logout();
    res.redirect('/');
  };

exports.sign_up_post = [

  body('username', 'You need a username!').trim().isLength({min:1}).escape(),

  (req, res, next) => {

    const errors = validationResult(req);

    // let date = new Date();
    //
    // let formattedDate = date.getFullYear() + '-' + fleshOut(date.getMonth()) + '-' + fleshOut(date.getDate());

    const user = new User({
      username: req.body.username,
      password: req.body.password,
      //joined: req.body.joined //2021-08-05T00:00:00.000+00:00
      joined: req.body.joined
    });

    if (!errors.isEmpty()) {
      res.render('sign_up', {title: 'Sign Up', user: user, errors: errors.array()});
      return;
    } else {
      User.findOne({'username':req.body.username})
      .exec(function(err, found_user) {
        if (err) {return next(err);}
        if (found_user) {
          // res.redirect('user' + found_user.url);
          // user.username = '';
          res.render('sign_up', {title: 'Sign Up', user: user, message: "Sorry, there's already someone who goes by this name. Please choose another:", errors: errors.array()});
        } else {
          user.save(function (err) {
            if (err) {return next(err);}
            res.redirect('user' + user.url);
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

exports.user_page = function(req, res) {
  res.send('not imp:' + req.params.id);
};
