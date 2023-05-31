const Chat = require('../models/chat.js');
const Counter = require('../models/Counter.js');
const Message = require('../models/message.js')

var numMessage = 0;

const CreateChat = async (me, username) => {
    const firstUser = { username: me.username, displayName: me.displayName, profilePic: me.profilePic };
    const secondUser = { username: username.username, displayName: username.displayName, profilePic: username.profilePic };

    const newID = await getID();
    const chat = new Chat({id : newID, users: [firstUser, secondUser], messages: [] });
    console.log("Chat Object:");
    console.log(chat);
  
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
    console.log("in service getChatById");
    const chatList = await getAllChats(username);
    chatList.forEach(item => {
        if (item.id === id) {
            return item;
        }
    });
    console.log("Didnt find a chat with this id: " + id + " , return null!");
    return null;
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
    numMessage++;
    //Inserting this message into the chat list
    Chat.findOneAndUpdate(
        { $push: { messages: message } },
        { new: true }, // Return the updated document
        (error, updatedChat) => {
            if (error) {
                console.error(error);
            } else {
                console.log(updatedChat);
            }
        }
    );
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