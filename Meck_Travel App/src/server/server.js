const { app, port } = require('./app.js');

// Callback to debug
function listening() {
    console.log('server running');
    console.log('running on localhost:'+port);
};

// Spin up the server
const server = app.listen(port, listening);

module.exports = { server };