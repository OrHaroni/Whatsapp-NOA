const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')

//Register
router.route('/api/Users').post(userController.createUser);

//Login
router.route('/api/Tokens').post(userController.login);




module.exports = router;