const Chat = require('../models/chat.js');
const Counter = require('../models/Counter.js');
const Message = require('../models/message.js')

var numMessage = 0;

const CreateChat = async (me, username) => {
    const firstUser = { username: me.username, displayName: me.displayName, profilePic: me.profilePic };
    const secondUser = { username: username.username, displayName: username.displayName, profilePic: username.profilePic };

    const newID = await getID();
    const chat = new Chat({id : newID, users: [firstUser, secondUser], messages: [] });
    return await chat.save();
  };
  
const getAllChats = async (username) => {
    return await Chat.find({
        users: {
            $elemMatch: {
                username: username
            }
        }
    });
}

const getChatById = async (username, id) => {
    const chatList = await getAllChats(username);
    var chat = null
      chatList.forEach(item => {
        if (item.id == id) {
            chat = item;
        }
    });
    return chat;
}

const deleteChat = async (username, id) => {
    console.log("in service deleteChat");
    Chat.deleteOne({
        id: id
    })
    console.log("Didnt find a chat with this id: " + id + " , return null!");
    return null;
}

const sendMessage = async (username, id, msg) => {
    console.log("in service send message");
    //Creating a new message into Message DB
    const chat = await getChatById(username, id);
    console.log("chat:");
    console.log(chat);
    const sender = getUserInfo(chat, username);
    console.log("sender:");
    console.log(sender);
    const message = new Message({ id: numMessage, created: new Date().toISOString(), sender: sender, content: msg });
    console.log("message:");
    console.log(message);
    numMessage++;
    //Inserting this message into the chat list
    try {
        return await Chat.findOneAndUpdate(
            {},
            { $push: { messages: message } },
            { new: true }
          ).exec();
      } catch (error) {
        console.log("there is an error!");
        console.error(error);
      }
}

module.exports = {
    CreateChat, getAllChats, getChatById, deleteChat, sendMessage
};

function getUserInfo(chat, me) {
    if (chat.users[0].username === me) {
        return chat.users[0];
    }
    return chat.users[1];
}

async function getID(){
    console.log("In create chat services");
    let chatCounter = await Counter.findOneAndUpdate(
      { name: "chat" },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );
return await chatCounter.count;;
}