const express = require('express');
const jwtMiddleware = require('../Middleware/auth.middleware')
const updates = require('../Controllers/updates.controller')

const router = express.Router();

router.post('/post', jwtMiddleware, updates.postUpdate)
router.get('/get', jwtMiddleware, updates.getUpdates)
router.delete('/delete', jwtMiddleware, updates.deleteUpdate)
router.post('/edit', jwtMiddleware, updates.editUpdate)


module.exports = router