const Chat = require('../models/chat.js');
const Counter = require('../models/Counter.js');
const Message = require('../models/message.js');
const usingSocket = require('../app.js');
const connectedUsers =require('../models/connectedUsers.js');


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
    const sender = getUserInfo(chat, username);
    const message = new Message({ id: numMessage, created: new Date().toISOString(), sender: sender, content: msg });
    await message.save();
    const pushMessage = { id: numMessage, created: new Date().toISOString(), sender: sender, content: msg };
    // Sending the message to the other user
    const Receiver = getOtherUserInfo(chat, username);
    // check if the receiver is connected
    const ifConnected = await connectedUsers.findOne({username: Receiver.username });
    if (ifConnected)
    {
        console.log("receiver user is connected");
        usingSocket.io.to(userConnected.socketId).emit('newMessage', pushMessage);
    }
    numMessage++;
    //Inserting this message into the chat list
    try {
        await Chat.findOneAndUpdate(
            {id : id},
            { $push: { messages: message } },
            { new: true }
          ).exec();
          return pushMessage;
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
function getOtherUserInfo(chat, me) {
    if (chat.users[0].username === me) {
        return chat.users[1];
    }
    return chat.users[0];
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