const http = require('http');
const https = require('https');
const fs = require('fs')
const app = require('./app');
const config = require('./config');

const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(config.port || '3100');
app.set('port', port);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

// const server = http.createServer(app);
const privateKeyPath = config.domain ? `/etc/letsencrypt/live/${config.domain}/privkey.pem` : './server.key';
const certificatePath = config.domain ? `/etc/letsencrypt/live/${config.domain}/cert.pem` : './server.cert';
const server = https.createServer({
    key: fs.readFileSync(privateKeyPath),
    cert: fs.readFileSync(certificatePath)
}, app);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);
