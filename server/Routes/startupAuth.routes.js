const express = require('express');
const startupAuth = require('../Controllers/startupAuth.contoller')

const router = express.Router();

router.post('/register', startupAuth.startupRegister);
router.post('/login', startupAuth.startupLogin);


module.exports = router