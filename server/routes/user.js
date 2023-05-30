const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')

//Register
router.route('/api/Users').post(userController.createUser);

router.get('/login', userController.login);



module.exports = router;