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
  try {
    return await UserPassName.findOne({ username, password }).exec();
  } catch (error) {
    console.log("there is an error!");
    console.error(error);
  }
};

const findUserByUsername = async (username) => {
  try {
    console.log("in findUserByUsername");
    return await UserPassName.findOne({ username}).exec();
  } catch (error) {
    console.log("there is an error!");
    console.error(error);
  }
};


module.exports = {
  createUser, getUser, findUserByUsername
}