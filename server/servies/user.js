const users = require('../models/user.js');

const createUser = async (username, password, displayName, profilePic) => {
    console.log("in service");
    const user = new users.UserPassName({"username": username, "password":  password, "displayName": displayName});
    //If there is profile pic
    if(profilePic){
        user.profilePic = profilePic;
    }
    return await user.save();
}

const getUser = async (username, password) => {
    console.log("in getUser");
    const user = users.users.find((item) => item.username === username && item.password === password);
  
    if (user) {
      console.log("worked");
      return user;
    } else {
      console.log("no good");
      return null;
    }
  };
  

module.exports = {
    createUser, getUser
}