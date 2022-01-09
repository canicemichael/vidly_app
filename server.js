const { endpoint, masterKey, port } = require('./config');

const app = require('./index');
    app.listen(port, () => {
        console.log(`Listening to http://localhost:${port}`);
    });