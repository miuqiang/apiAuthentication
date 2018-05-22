const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./configuration/index');


module.exports = {
  checkLogin: (req, res, next) => {
    var token = req.headers.token || '';
    var timestrap = Date.now();
    if (token) {
      try {
        var decode = jwt.verify(token,JWT_SECRET);
        console.log(decode);
      } catch (error) {
        return res.status(403).json({success:false,msg:'未登录'});
      }
      if (!decode) {
        return res.status(401).json({success:false,msg:'未登录'});
      }
    } else {
      res.status(401).json({success:false,msg:'未登录'});
    } 
    next();
  }
}