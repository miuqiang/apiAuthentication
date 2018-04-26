const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();


// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/users'));

// Server

const port = app.get('port') || 3000;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
