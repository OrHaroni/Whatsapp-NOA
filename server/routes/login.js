const express = require('express');
const router = express.Router();
const register = require('../controllers/login')

router.route('/Register').post(register.createUser);

router.route('/Register').get(() =>{
console.log("get!!");
})

router.route('/').get(() =>{
   //getting index.html
    })

module.exports = router;