const express = require('express');
const router = express.Router();
const { signupUser, loginUser } = require('../controllers/userControllers');
//signup user route
router.post('/signup', signupUser);
//login user route
router.post('/login', loginUser);

module.exports = router;