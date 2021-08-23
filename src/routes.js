const express = require('express');

const sessionController = require('./controllers/SessionController');
const userController = require('./controllers/UserController');
const { auth } = require('./middlewares/index');

const router = express.Router();

router.get('/user', auth, userController.index);
router.post('/user', userController.storage);

router.post('/session', sessionController.create);

module.exports = router;