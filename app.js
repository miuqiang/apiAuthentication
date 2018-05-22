const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/ApiAuthentication');

const app = express();


// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/users', require('./routes/users'));

// Server
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Server listening at ${port}`);
