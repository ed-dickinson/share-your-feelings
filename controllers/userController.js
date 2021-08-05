var User = require('../models/user');

const { body,validationResult } = require('express-validator');
const passport = require("passport");
const bcrypt = require('bcryptjs');

exports.sign_up = function(req, res) {
  res.render('sign_up', {title: 'Sign Up', user: req.user});
};

exports.log_in_post =  passport.authenticate("local", {
    successRedirect: "/you",
    failureRedirect: "/"
  });

exports.you_get = function(req, res) {
  res.render('you', {title: req.user.username, user: req.user});
};

exports.log_out_get = (req, res) => {
  req.logout();
  res.render('logged_out', {title: 'Goodbye'});
};

exports.sign_up_post = [

  body('username', 'You need a username!').trim().isLength({min:1}).escape(),
  body('password', 'You need a password!').trim().isLength({min:4}).escape(),

  (req, res, next) => {

    const errors = validationResult(req);

    // let date = new Date();
    //
    // let formattedDate = date.getFullYear() + '-' + fleshOut(date.getMonth()) + '-' + fleshOut(date.getDate());

    // bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    //   if (err) return next(err)
    //   else { return hashedPassword;}//store in db
    // });

    // const user = new User({
    //   username: req.body.username,
    //   password: req.body.password,
    //   joined: req.body.joined//2021-08-05T00:00:00.000+00:00
    // });

    if (!errors.isEmpty()) {
      res.render('sign_up', {title: 'Sign Up',
      // user: user,
      message: "Something's amiss. Please note passwords must contain at least 4 characters.",
      errors: errors.array()});
      return;
    } else {
      User.findOne({'username':req.body.username})
      .exec(function(err, found_user) {
        if (err) {return next(err);}
        if (found_user) {
          // res.redirect('user' + found_user.url);
          // user.username = '';
          res.render('sign_up', {title: 'Sign Up',
            // user: user,
            message: "There's already someone who goes by this name. Please choose another:",
            errors: errors.array()});
        } else {
          // user.save(function (err) {
          //   if (err) {return next(err);}
          //   res.redirect('user/' + user.username);
          // });
          bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) return next(err)
            else {
              const user = new User({
                username: req.body.username,
                password: hashedPassword,
                joined: req.body.joined//2021-08-05T00:00:00.000+00:00
              }).save(err => {
                if (err) return next(err)
                res.redirect('user/' + req.body.username);
              })
            };
          });
        };
      })
    // .save(err => {
    //   if (err) {
    //     return next(err);
    //   }
    //   res.redirect('/');
    // })
    }
  }
];

exports.user_page = function(req, res) {
  res.send('not imp:' + req.params.id);
};
