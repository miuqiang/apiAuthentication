const JWT = require('jsonwebtoken');
const User = require('../models/users');
const { JWT_SECRET } = require('../configuration/index')

signToken = user => {
  return JWT.sign({
    iss: 'CodeWorker',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)// current time + 1 day ahead
  }, JWT_SECRET)
}

module.exports = {
  signUp: async (req, res, next) => {
    
    const { email,password } = req.value.body;
    // check if there is a user in datebase
    const foundUser = await User.findOne({email: email});
    if (foundUser) {
      return  res.status(403).json({error: '用户存在'});
    }
    // create a new user
    const newUser = new User({ email, password });
    await  newUser.save();

    // Create the token
    const token  = signToken(newUser);

    // Response with token
    res.status(200).json({ token: token });


    // res.status(200).json({ user: newUser });
  },

  signIn: async (req, res, next) => {
    console.log('signIn`s Controllers');
  },

  secret: async (req, res, next) => {
    console.log('secret`s Controllers');
  }
}