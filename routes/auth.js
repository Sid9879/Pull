const express = require('express');
const router = express.Router();
const { authController} = require('../controller/auth');

// Auth routes
router.post('/login', authController.login);
router.post('/register', authController.register);

// Profile
router.use(authController.authenticateToken);

router.get('/me', authController.getUser);
router.put('/me',  authController.updateUser);

module.exports = router;