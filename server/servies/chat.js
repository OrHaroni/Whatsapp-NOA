const Chat = require('../models/chat.js');
const ChatCounter = require('../models/chat.js');
const Message = require('../models/message.js')

var chatCounter;


const CreateChat = async (me, username) => {
    if(ChatCounter.findOne().count){
    console.log("In create chat services");
    updateCounter();
    console.log(ChatCounter.findOne().count);
    //Removing password field
    const firstUser = {username: me.username, displayName: me.displayName, profilePic: me.profilePic };
    const secondUser = {username: username.username, displayName: username.displayName, profilePic: username.profilePic };
    //console.log(firstUser);
    //console.log(secondUser);
    const chat = new Chat({ id: ChatCounter.count, users: [firstUser, secondUser], messages: [] });
    console.log("in CreateChat in chat.js in servies ");
    return await chat.save();
    }
    else{
        console.log("Create new one")
        chatCounter = new ChatCounter();
        await chatCounter.save();
        CreateChat(me, username);
    }
}

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
    const chatList = getAllChats(username);
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

const sendMessage = async (username, id , msg) => {
    console.log("in service send message");
    //Creating a new message into Message DB
    const chat = await getChatById(username, id);
    const sender = getUserInfo(chat, username);
    const message = new Message({id : numMessage, created : new Date().toISOString(),sender : sender, content : msg });
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

function getUserInfo(chat, me){

    if(chat.users[0].username === me){
        return chat.users[0];
    }
    return chat.users[1];

}

function updateCounter(){
    ChatCounter.findOneAndUpdate(
        { $inc: { count: 1 } },
        { new: true, upsert: true }
      )
}