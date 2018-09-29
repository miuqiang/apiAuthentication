const JWT = require('jsonwebtoken');
const User = require('../models/users');
const validator = require('validator');
const { JWT_SECRET } = require('../configuration/index')

signToken = user => {
  return JWT.sign({
    iss: 'shunjiefw',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().getTime() + 1000*60*60*24*30,
    // exp: new Date().setDate(new Date().getDate() + )// current time + 1 day ahead
  }, JWT_SECRET)
}

module.exports = {
  /**
   * 注册
   */
  signUp: async (req, res, next) => {
    
    const { email,password } = req.body;
    // check if there is a user in datebase
    const foundUser = await User.findOne({email: email});
    if (foundUser) {
      let err = new Error('用户名重复');
      err.status = 400;
      next(err);
    }
    // create a new user
    const newUser = new User({ email, password });
    await  newUser.save();

    // Create the token
    const token  = signToken(newUser);

    // Response with token
    res.status(200).json({ token: token });

  },

  /**
   * 登录
   */
  signIn: async (req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  /**
   * 鉴权
   */
  secret: async (req, res, next) => {
    res.status(200).json({"ms":"ok"});
  },
  /**
   * test
   */
  getUsers: async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({data:users});
  }
}