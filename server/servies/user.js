const UserPassName = require('../models/user.js');

const createUser = async (username, password, displayName, profilePic) => {
  console.log("in service");
  const user = new UserPassName({ username: username, password: password, displayName: displayName });
  //If there is profile pic
  if (profilePic) {
    user.profilePic = profilePic;
  }
  console.log(user);
  return await user.save();
}

const getUser = async (username, password) => {
  console.log("in getUser");
  const user = UserPassName.find((item) => item.username === username && item.password === password);
  if (user) {
    console.log("worked");
    //needs to return token
    return user;
  } else {
    console.log("no good");
    return null;
  }
};

module.exports = {
  createUser, getUser
}