const express = require('express')
const fileUpload = require('../Controllers/fileUpload.controller')
const upload = require('../Controllers/fileUpload.controller')

const router = express.Router();

router.get('/:filename', fileUpload.fileViewer);
router.post('/upload', upload.single("file"), fileUpload.fileUploader);

module.exports = router