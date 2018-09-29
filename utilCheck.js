const validator = require('validator');

module.exports = {
  checkSignup: (req, res, next) => {
    const {
      email
    } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        err_code: 400,
        message: '请输入邮箱'
      });
    } else {
      next();
    }
  }
}