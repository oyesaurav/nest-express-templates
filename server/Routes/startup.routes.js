const express = require('express');
const startupAuth = require('../Controllers/startupAuth.contoller')
const startupEdit = require('../Controllers/startupEdit.controller')

const router = express.Router();

router.post('/register', startupAuth.startupRegister);
router.post('/login', startupAuth.startupLogin);
router.post('/edit', startupEdit)


module.exports = router