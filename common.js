const jwt = require('jsonwebtoken');
const {
  JWT_SECRET
} = require('./configuration/index');


module.exports = {
  checkLogin: (req, res, next) => {
    var token = req.headers.token || '';
    var timestrap = new Date().getTime();
    if (token) {
      jwt.verify(token, JWT_SECRET, function (err, decoded) {
        if (err) {
          console.log(err);
          return res.status(403).json({
            err: 'err'
          })
        } else {
          console.log(decoded)
          const exp = decoded.exp;
          if (timestrap > exp) {
            console.log('timeout');
            return res.status(401).json({
              err: 'err'
            })
          }
          next();
        }
      })
    } else {
      return res.status(403).json({
        err: 'err'
      })
    }
  }
}