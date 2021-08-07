var User = require('../models/user');
var PrivateFeeling = require('../models/privatefeeling');

var async = require('async');
const { body,validationResult } = require('express-validator');
const passport = require("passport");
const bcrypt = require('bcryptjs');

const multer  = require('multer');
const upload = multer({
  dest: 'public/uploads/',
  limits :{fileSize : 500000},
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

require('dotenv').config()
const DBkey = process.env.DB_URL;
const nodeMailer = require('nodemailer');
var transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, //587 for false
    secure:true,
    requireTLS:true,
    auth: {
      user: 'someonesharedafeeling@gmail.com',
      pass: process.env.GMAIL_PASSWORD
    }
  });

exports.sign_up = function(req, res) {
  res.render('sign_up', {title: 'Sign Up', user: req.user});
};

exports.log_in_post =  passport.authenticate("local", {
    successRedirect: "/you",
    // successRedirect: req.protocol,
    failureRedirect: "/"
  });

exports.you_get = function(req, res) {
  // res.render('you', {title: req.user.username, user: req.user});
  if (typeof req.user != 'undefined') {

    User.findById(req.user._id)
      .populate('friends')
      .exec(function(err, user) {
        if (err) {return next(err);}
        if (user==null) {
          var err = new Error('User not found!');
          err.status = 404;
          return next(err);
        }
        res.render('you', {title: req.user.username, user: req.user, friends: user.friends});
      })

  } else {
    res.render('sorry', {message: 'You have to be logged in to see yourself.'});
  }
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

          bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) return next(err)
            else {
              const user = new User({
                username: req.body.username,
                password: hashedPassword,
                joined: req.body.joined//2021-08-05T00:00:00.000+00:00
              }).save(err => {
                if (err) return next(err)
                // res.redirect('user/' + req.body.username);
                res.render('welcome', {title: req.body.username, username: req.body.username});

              })
            };
          });
        };
      })

    }
  }
];

exports.user_list = function(req, res, next) {
  User.find()
    // .select('name species description')
    .exec(function (err, users) {
      if (err) {return next(err);}
      res.render('user_list', {title: 'User List', users: users})
    })
};

exports.user_page = function(req, res, next) {


if (typeof req.user != 'undefined') {
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
            PrivateFeeling.find({
              $or: [{'receipient' : other_user.id,'user' : req.user.id},
              {'receipient' : req.user.id,'user' : other_user.id}]
            })
              .populate('user', 'username')
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

  } else {
    res.render('sorry', {message: 'Users are only visible to other users.'});
  }


};

exports.add_post = function(req, res, next) {

  req.user.friends.unshift(req.body.id);

  req.user.save(function (err) {
    if (err) { return next(err); }
    res.redirect('user/' + req.body.username);
  });
};

exports.add_email_post = function(req, res, next) {

  req.user.email = req.body.email;

  req.user.save(function (err) {
    if (err) { return next(err); }
    res.redirect('you');
  });
};

exports.add_photo_post = [
  upload.single('avatar'),
  function(req, res, next) {
    req.user.picture = req.file.filename;
    req.user.save(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect('you');
    });

}];


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

    req.user.messages.unshift(message._id);

    if (!errors.isEmpty()) {
      res.render('user', {title: other_user.username, other_user: other_user, user: req.user, errors: errors.array()});
      return;
    }
    else {

      async.parallel({
        message: function(callback) {
          message.save(function(err) {
            callback(err);
          });
        },
        user: function(callback) {
          req.user.save(function(err) {
            callback(err);
          });
        },
      }, function (err,results) {
        if (err) { return next(err); }


        if (req.body.email) {
          let mailOptions = {
            from: 'someonesharedafeeling@gmail.com',
            to:req.body.email,
            subject: 'Someone shared a feeling with you!',
            html: 'Hello, hello, hello!<br><strong>' + req.user.username + '</strong> has shared a feeling with you. <a href="https://share-your-feelings.herokuapp.com/user/'+ req.body.receipient +'">Read it here</a>.'
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email was sent successfully: ' + info.response);
            }
            res.redirect('user/' + req.body.receipient);
          })
        } else {
          res.redirect('user/' + req.body.receipient);
        }

      })

    }
  }
];
