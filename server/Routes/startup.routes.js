const express = require('express');
const startupAuth = require('../Controllers/startupAuth.contoller')
const startupEdit = require('../Controllers/startupEdit.controller')

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

// getdetails


module.exports = router