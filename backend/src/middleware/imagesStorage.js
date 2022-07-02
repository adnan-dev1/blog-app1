const path = require('path');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (req.body.photo) {
            cb(null, path.join(__dirname, '../public/postImages'));
        } else {
            cb(null, path.join(__dirname, '../public/profileImages'));
        }
    },
    filename: function (req, file, cb) {
        cb(null, req.body.name);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        req.fileValidationError = 'You should upload images only.';
        cb(null, false, new Error('You should upload images only.'));
    }
}

var upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

module.exports = upload;