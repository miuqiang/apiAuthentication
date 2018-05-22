const JWT = require('jsonwebtoken');
const User = require('../models/users');
const { JWT_SECRET } = require('../configuration/index')

signToken = user => {
  return JWT.sign({
    iss: 'shunjiefw',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)// current time + 1 day ahead
  }, JWT_SECRET)
}

module.exports = {
  /**
   * 注册
   */
  signUp: async (req, res, next) => {
    
    const { email,password } = req.value.body;
    // check if there is a user in datebase
    const foundUser = await User.findOne({email: email});
    if (foundUser) {
      return  res.status(200).json({
        data:'',
        code: 201,
        msg: '用户名已经存在'
      });
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