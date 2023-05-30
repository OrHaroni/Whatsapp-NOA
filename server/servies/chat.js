const Chat = require('../models/chat.js');

const numChat = 0;

const CreateChat = async (me, username) => {
    console.log("in service");
    const user = new Chat({id: numChat, users: [me, username], messages: []});
    numChat++;
    console.log(user);
    return await user.save();
  }

  const getAllChats = async (username) => {
    console.log("in service getAllChats");
    return await Chat.find({
        users: {
          $elemMatch: {
            username: username
          }
        }
      }); 
  }

  module.exports = {
    CreateChat, getAllChats
};