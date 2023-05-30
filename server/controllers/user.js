const userService = require('../servies/user.js');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const displayName = req.body.displayName;
    const profilePic = req.body.profilePic;
    res.json(await userService.createUser(username, password, displayName, profilePic));
};

const login = async (req, res) => {
    const u = req.body.username;
    const p = req.body.password;
    const user = await userService.getUser(u, p);
    if (user) {
      const token = jwt.sign({ username: u }, "key");
      res.json(token);
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  };
  
const getUserPersonel = async (req,res) => {
    const u = req.params.username;
    console.log(u);
    const user = await userService.findUserByUsername(u);
    console.log(user);
    if(user){
        res.status(200).json({username : user.username, displayName : user.displayName, profilePic:user.profilePic});
    }else{
        res.status(401);
    }
}

module.exports = {
    createUser, login, getUserPersonel
};