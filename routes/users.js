const router = require('express-promise-router')();
const passport = require('passport');
const { checkLogin } = require('../common');
const { checkSignup } = require('../utilCheck');
const UsersController = require('../controllers/users');

const passportSignIn = passport.authenticate('local', {session: false});


router.route('/signup')
  .post(checkSignup, UsersController.signUp);

router.route('/signin')
  .post(passportSignIn, UsersController.signIn);

router.route('/secret')
  .get(checkLogin, UsersController.secret);

router.route('/getuser')
  .get(checkLogin, UsersController.getUsers);

module.exports = router;