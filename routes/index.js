var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Share Your Feelings', user: req.user });
});

// router.post(
//   "/log-in",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/"
//   })
// );

router.get('/sign-up', user_controller.sign_up);
router.post('/sign-up', user_controller.sign_up_post);

router.post('/log-in', user_controller.log_in_post);

router.post('/add', user_controller.add_post);

router.get('/you', user_controller.you_get);

router.get('/log-out', user_controller.log_out_get);

router.get('/user/:username', user_controller.user_page);

module.exports = router;
