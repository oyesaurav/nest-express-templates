const express = require('express');
const jwtMiddleware = require('../Middleware/auth.middleware')
const startupAuth = require('../Controllers/startupAuth.contoller')
const startupEdit = require('../Controllers/startupEdit.controller')
const startupGet = require('../Controllers/startupGet.controller')

const router = express.Router();

router.post('/register', startupAuth.startupRegister);
router.post('/login', startupAuth.startupLogin);
router.post('/edit', startupEdit.startupEdit);
router.post('/delpins', startupEdit.delPinnedUpdates);
router.post('/addpins', startupEdit.addPinnedUpdates);
router.post('/addteam', startupEdit.addTeam);
router.post('/delteam', startupEdit.delTeam);
// addhighlight
// delhighlight
// edithighlight

router.get('/get', jwtMiddleware, startupGet.getStartupDetails);


module.exports = router