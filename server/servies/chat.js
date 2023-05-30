const Chat = require('../models/chat.js');
const Message = require('../models/message.js')

const numChat = 0;
const numMessage = 0;

const CreateChat = async (me, username) => {
    console.log("in service");
    const user = new Chat({ id: numChat, users: [me, username], messages: [] });
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
    const chat = await getChatById(username, id);
    const sender = getSender(chat);
    const message = new Message({id : numMessage, created : new Date().toISOString(),sender : sender, content : msg });

    Chat.findOneAndUpdate
}

module.exports = {
    CreateChat, getAllChats, getChatById, deleteChat, sendMessage
};

function getSender(chat, me){

    if(chat.users[0].username === me){
        return chat.users[0];
    }
    return chat.users[1];

}