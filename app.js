const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ApiAuthentication');

const app = express();

// static
app.use('/media', express.static('media'));

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api/users', require('./routes/users'));

app.use((err, req, res, next) => {
  return res.status(err.status || 500).send({
    err_code: err.status,
    message: err.message || '服务器内部错误'
  })
})
// Server
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Server listening at ${port}`);
