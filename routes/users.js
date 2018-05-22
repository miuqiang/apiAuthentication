const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');
const { checkLogin } = require('../common');
const { validateBody, schemas } = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');

const passportSignIn = passport.authenticate('local', {session: false});
const passportJWT = passport.authenticate('jwt', {session: false});


router.route('/signup')
  .post(validateBody(schemas.authSchema), UsersController.signUp);

router.route('/signin')
  .post(validateBody(schemas.authSchema) , passportSignIn , UsersController.signIn);

router.route('/secret')
  .get(checkLogin, UsersController.secret);

router.route('/getuser')
  .get(checkLogin, UsersController.getUsers);

module.exports = router;