const express = require('express');
const sessionController = require('./controllers/SessionController');

const router = express.Router();

router.get('/session', sessionController.index);
router.post('/session', sessionController.storage);

module.exports = router;