var express = require('express');
var router = express.Router();

var feeler_controller = require('../controllers/feelerController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Share Your Feelings' });
});

router.get('/sign-up', feeler_controller.sign_up);
router.post('/sign-up', feeler_controller.sign_up_post);

module.exports = router;
