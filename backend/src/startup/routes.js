const express = require('express');
const category = require('../routes/category');
const user = require('../routes/user');
const auth = require('../routes/auth');
const  post = require('../routes/post');
const images = require('../routes/images');
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/category', category);
    app.use('/api/user', user);
    app.use('/api/auth', auth);
    app.use('/api/post', post);
    app.use('/api/images', images);
    app.use(error);
}