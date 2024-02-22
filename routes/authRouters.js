const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/current', passport.authenticate('jwt', { session: false }), authController.getCurrentUser);

module.exports = router;
