const express = require('express');
const evaluatorAuth = require('../Controllers/evaluatorAuth.controller')

const router = express.Router();

router.post('/register', evaluatorAuth.evaluatorRegister );
router.post('/login', evaluatorAuth.evaluatorLogin);


module.exports = router