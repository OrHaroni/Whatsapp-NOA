const chatService = require('../servies/chat.js');
const jwt = require('jsonwebtoken');

const CreateChat = async (req, res) => {
    const token = req.headers.authorization;
    console.log(" this is token in create chat" +token);
    const username = req.body.username;
    const me = jwt.verify(token, "key");
    console.log("token after verify" + me);
    
    res.json(await userService.createChat(me, username));
};

const getAllChats = async(req, res) => {
    try{
        const token = req.headers.authorization;
        console.log(" this is token in get all chats " +token);
        const username = jwt.verify(token, "key").username;
        console.log("this is after verification in getallchats: " + username);
        res.status(200).json(await chatService.getAllChats(username));
    }catch(error){
        console.log("error in get all chats, probably in token");
        console.error(error);
    }
    
}

module.exports = {
    CreateChat ,getAllChats
};