const userService = require('../servies/user.js');

const createUser = async (req, res) => {
    console.log("in controller");
    const username = req.body.username;
    const password = req.body.password;
    const displayName = req.body.displayName;
    const profilePic = req.body.profilePic;
    res.json(await userService.createUser(username, password, displayName, profilePic));
};

const login = async (req ,res) => {
    const u = req.query.username;
    const p = req.query.password;
    const ret = await userService.getUser(u, p);
    if(ret){
        res.status(200).json(ret);
    }else{
        res.status(401);
    }
    
}

module.exports = {
    createUser, login
};