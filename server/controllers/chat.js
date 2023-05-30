const chatService = require('../servies/chat.js');
const jwt = require('jsonwebtoken');

const CreateChat = async (req, res) => {
    try{
    const me = decode(req.headers.authorization);
    const username = req.body.username;
    res.json(await userService.createChat(me, username));
    }
    catch(error){
        console.error(error);
        //invalid request from server
        res.status(500);
    }
};

const getAllChats = async(req, res) => {
    try{
        const username = decode(req.headers.authorization);
        res.status(200).json(await chatService.getAllChats(username));
    }catch(error){
        console.error(error);
        //Not found any chat list
        res.status(404);
    } 
}

const getChatById = async(req,res) => {
    try{
        const username = decode(req.headers.authorization);
        const id = req.params;
        res.status(200).json(await chatService.getChatById(username, id));
    }catch(error){
        console.error(error);
        res.status(404);
    } 
}

const deleteChat = async(req,res) => {
    try{
        const username = decode(req.headers.authorization);
        const id = req.params;
        //Check if chat exist and a chat of user
        if(getChatById(username, id)){
            res.status(200).json(await chatService.deleteChat(username, id));
        }else{
            //404 tells that not found this chat.
            res.status(404);
        }
    }catch(error){
        console.error(error);
        res.status(400);
    } 
}

const sendMessage = async (req, res) => {
    try{
    const username = decode(req.headers.authorization);
    const id = req.params;
    const msg = req.body.msg;
    //Check if chat exist and a chat of user
    if(getChatById(username, id)){
        res.status(200).json(await chatService.sendMessage(username, id, msg));
    }else{
        //404 tells that not found this chat.
        res.status(404);
    }
    }
    catch(error){
        console.error(error);
        res.status(400);
    }
}

module.exports = {
    CreateChat ,getAllChats, getChatById, deleteChat, sendMessage
};

function decode(token){
    return jwt.verify(token, "key").username;
}