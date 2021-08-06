var User = require('../models/user');
var PrivateFeeling = require('../models/privatefeeling');

var async = require('async');
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
      message: "Please note passwords must contain at least 4 characters.",
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

exports.user_page = function(req, res, next) {
  // User.findOne({'username' : req.params.username})
  // .populate({
  //   path: 'friends'
  //   // ,match: { id:  req.user._id  }
  // })
  // .exec(function(err, other_user){
  //   if (err) {return next(err);}
  //   if (other_user==null) {
  //     var err = new Error('No user by this name: ' + req.params.username + '.');
  //     err.status = 404;
  //     return next(err);
  //   }
  //   res.render('user', {title: other_user.username, other_user: other_user, user: req.user});
  // });

  async.waterfall([
        function(callback) {
            User.findOne({ 'username': req.params.username })
              .populate('friends')
              .exec(
                function(err, other_user) {
                  callback(null, other_user)
                });
        },

        function(other_user, callback) {
            PrivateFeeling.find({ 'receipient' : other_user.id})
              .populate()
              .exec(
                function(err, messages){
                  callback(null, {messages, other_user});
                });
        },

    ],
     function(err, results) {
        if (err) { return next(err); }
        if (results==null) { // No results.
            var err = new Error('Something not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render
        res.render('user', {title: results.other_user.username, other_user: results.other_user, messages: results.messages, user: req.user});

    });



};

exports.add_post = function(req, res, next) {
  User.findByIdAndUpdate(req.user._id, {'friends' : req.user.friends.push(req.body.id)}, {}, function(err, other_user){
    if (err) {return next(err);}

    res.render('user', {title: other_user.username, other_user: other_user, user: req.user});
  });
};

exports.message_post = [

  body('message', 'Message required').trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {

    const errors = validationResult(req);

    var message = new PrivateFeeling(
      { message: req.body.message ,
        color: req.body.color,
        date: new Date(),
        user: req.user._id,
        receipient: req.body.id
      }
    );

    req.user.messages.push(message._id);

    if (!errors.isEmpty()) {
      res.render('user', {title: other_user.username, other_user: other_user, user: req.user, errors: errors.array()});
      return;
    }
    else {
    //   message.save(function (err) {
    //     User.findByIdAndUpdate(req.user._id, {'messages' : req.user.messages.push(req.body.id)}, {}, function(err){
    //       if (err) { return next(err); }
    //       res.redirect('user/' + req.body.receipient);
    //   });
    // })

      // async.waterfall([
      //   function(callback) {
      //     message.save(
      //       function(err, saved) {
      //         callback(null, saved)
      //       }
      //     );
      //   },
      //   function(saved, callback) {
      //     let saved_message = "610d02dc4a4b79997bfe9902";
      //     User.findByIdAndUpdate(req.user._id, {'messages' : req.user.messages.push(saved_message)}, {},
      //       function(err, xxx) {
      //         callback(null, {xxx, saved})
      //       }
      //     )
      //   },
      // ], function (err, results) {
      //   if (err) { return next(err); }
      //   res.redirect('user/' + req.body.receipient);
      // })

      async.parallel({
        message: function(callback) {
          message.save(function(callback) {});
        },
        user: function(callback) {
          req.user.save(function(callback) {});
        },
      }, function (err,results) {
        if (err) { return next(err); }
        res.redirect('user/' + req.body.receipient);
      }) // why is this hanging

      // message.save(function (err) {
      //   if (err) { return next(err); }
      //   res.redirect('user/' + req.body.receipient);
      // });

       // message.save(function (err) {
       //   if (err) { return next(err); }
       //   res.redirect('user/' + req.body.receipient);
       // });

       // async.parallel({
       //      save: function(callback) {
       //        message.save(callback)
       //      },
       //      add: function(callback) {
       //        User.findByIdAndUpdate(req.user._id, {'messages' : req.user.messages.push(req.body.id)}, {}, function(callback))
       //      },
       //  }, function(err, results) {
       //      if (err) { return next(err); }
       //      res.redirect('user/' + req.body.receipient);
       //
       //  });




    }
  }
];
