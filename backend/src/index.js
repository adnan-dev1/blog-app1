const winston = require('winston');
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

const app = express();
dotenv.config();

app.use('/public/postImages', express.static(path.join(__dirname, '/public/postImages')));
app.use('/public/profileImages', express.static(path.join(__dirname, '/public/profileImages')));
require('./startup/logging')();
require('./startup/config')();
require('./startup/cors')(app);
require('./startup/db')();
require('./startup/routes')(app);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    winston.info(`Server Started on ${port} ....`);
});

module.exports = server;