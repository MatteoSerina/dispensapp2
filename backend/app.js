const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const config = require('./config');

const catalogRoutes = require('./routes/catalog');
const storageRoutes = require('./routes/storage');
const categoryRoutes = require('./routes/categories');
const apiVersionRoutes = require('./routes/apiVersion');
const userRoutes = require('./routes/user');

const app = express();

mongoose.set('useFindAndModify', false);
mongoose.connect(config.mongoUrl)
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas!');
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas! Check Atlas IP whitelist first');
        console.error(error);
    })

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/api/catalog', catalogRoutes);
app.use('/api/storage', storageRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/version', apiVersionRoutes);
app.use('/api/user', userRoutes);

module.exports = app;