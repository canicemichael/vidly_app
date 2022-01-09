const express = require('express');

const   app = express();

require('./startup/logging')();
require('./startup/validation')();
require('./startup/routes')(app);
require('./startup/config')();

require('./startup/db')();

module.exports = app;