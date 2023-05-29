const userService = require('../servies/user');


const createUser = async (req, res) => {
    console.log("in controller");
    const username = req.body.username;
    const password = req.body.password;
    const displayName = req.body.displayName;
    const profilePic = req.body.profilePic;
    res.json(await userService.createUser({"username" : username, "password" : password, "displayName" : displayName, "profilePic": profilePic}));
};

module.exports = {
    createUser
};