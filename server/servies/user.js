const users = require('../models/user');

const createUser = async (username, password, displayName, profilePic) => {
    console.log("in service");
    const user = new users.User({"username": username, "password":  password, "displayName": displayName});
    //If there is profile pic
    if(profilePic){
        user.profilePic = profilePic;
    }
    return await user.save();
}

module.export = {
    createUser
}