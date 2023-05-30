const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')

//Register
router.route('/api/Users').post(userController.createUser);

//get User pesonel by username
router.route('/api/Users/:username').get(userController.getUserPersonel);

//Login
router.route('/api/Tokens').post(userController.login);




module.exports = router;