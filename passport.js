const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const { JWT_SECRET } = require('./configuration')
const User = require('./models/users');

// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: JWT_SECRET
}, async (payload, done) => {
  try {
    // Find the user specified in token
    const user = await User.findById(payload.sub);

    // If user doesn't exists, handle it
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    // Otherwise, return the user
    done(null, user, { message: 'Incorrect username.' });

  } catch (error) {
    done(error, false, { message: 'Incorrect username.' });
  }
}))

// LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }

    const isMathch = await user.isValidPassword(password);
    

    if (!isMathch) {
      return done(null, false);
    }

    done(null, user);
  } catch (error) {
    done(error, false);
  }

}))