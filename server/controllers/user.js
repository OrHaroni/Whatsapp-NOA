const userService = require('../servies/user.js');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    console.log("in controller");
    const username = req.body.username;
    const password = req.body.password;
    const displayName = req.body.displayName;
    const profilePic = req.body.profilePic;
    res.json(await userService.createUser(username, password, displayName, profilePic));
};

const login = async (req ,res) => {
    const u = req.body.username;
    const p = req.body.password;
    const user = await userService.getUser(u, p);
    if(user){
        const token = jwt.sign({ username : u}, "key");
        console.log(token);
        res.status(200).json(token);
    }else{
        res.status(401);
    }
    
}

module.exports = {
    createUser, login
};