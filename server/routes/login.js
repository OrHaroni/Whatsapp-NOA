const express = require('express');
const router = express.Router();
const register = require('../controllers/login')

router.route('/Register').post(register.createUser);

router.get('/login', register.login);

router.get('/', () => {
    console.log("get!");
})


module.exports = router;