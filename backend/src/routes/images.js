const router = require('express').Router();
const upload = require('../middleware/imagesStorage');

router.post("/", upload.single('file'), async (req, res, next) => {
    if (req.fileValidationError) {
        return res.status(400).send(req.fileValidationError);
    }

    if (req.file) {
        return res.status(200).send(req.file);
    } 

    return res.status(400).send('No image was uploaded');
});


module.exports = router;