const express = require('express');

const { endpoint, masterKey, port } = require('./config');

const app = express();

require('./startup/logging')();
require('./startup/validation')();
require('./startup/routes')(app);
require('./startup/config')();

require('./startup/db')();

app.listen(port, () => {
    console.log(`Listening to http://localhost:${port}`);
});