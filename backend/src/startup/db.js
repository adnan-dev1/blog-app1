const mongoose = require('mongoose');
const dotenv = require('dotenv');
const winston = require('winston');

dotenv.config();

module.exports = function () {
    const db = process.env.MONGO_URL + '/blog_app';
    mongoose.connect(db).then(() => {
        winston.info(`Mongo Connected on ${db} ...`);
    });
} 