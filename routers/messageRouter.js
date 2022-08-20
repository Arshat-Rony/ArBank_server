
const { sendMessage } = require('../controllers/messageController');
const authenticate = require("../authenticate")
const router = require('express').Router()


router.post('/message', authenticate, sendMessage)

module.exports = router;