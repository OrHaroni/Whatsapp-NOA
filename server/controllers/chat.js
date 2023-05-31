const chatService = require('../servies/chat.js');
const userService = require('../servies/user.js')
const jwt = require('jsonwebtoken');

const CreateChat = async (req, res) => {
    try {
        console.log("In creat chat controller");
        const me = decode(req.headers.authorization);
        const username = req.body.username;
        const firstUser = await userService.findUserByUsername(me);
        const secondUser = await userService.findUserByUsername(username);
        res.json(await chatService.CreateChat(firstUser, secondUser));
    }
    catch (error) {
        console.error(error);
        //invalid request from server
        res.status(500);
    }
};

const getAllChats = async (req, res) => {
    try {
        const username = decode(req.headers.authorization);
        res.status(200).json(await chatService.getAllChats(username));
    } catch (error) {
        console.error(error);
        //Not found any chat list
        res.status(404);
    }
}

const getChatById = async (req, res) => {
    try {
        const username = decode(req.headers.authorization);
        const id = req.params;
        console.log("In getChatById controller id ::::::");
        console.log(id);
        res.status(200).json(await chatService.getChatById(username, id.id));
    } catch (error) {
        console.error(error);
        res.status(404);
    }
}

const deleteChat = async (req, res) => {
    try {
        const username = decode(req.headers.authorization);
        const id = req.params;
        //Check if chat exist and a chat of user
        if (getChatById(username, id)) {
            res.status(200).json(await chatService.deleteChat(username, id));
        } else {
            //404 tells that not found this chat.
            res.status(404);
        }
    } catch (error) {
        console.error(error);
        res.status(400);
    }
}

const sendMessage = async (req, res) => {
    try {
        const username = decode(req.headers.authorization);
        const id = req.params;
        const msg = req.body.msg;
        console.log("server sendMessage msg :::");
        console.log(msg);
        console.log("server sendMessage id  :::");
        console.log(id.id);
        console.log("server sendMessage username :::");
        console.log(username);
        //Check if chat exist and a chat of user
        if (getChatById(username, id)) {
            res.status(200).json(await chatService.sendMessage(username, id.id, msg));
        } else {
            //404 tells that not found this chat.
            res.status(404);
        }
    }
    catch (error) {
        console.error(error);
        res.status(400);
    }
}
const getMessageArray = async (req, res) => {
    try {
        const username = decode(req.headers.authorization);
        const id = req.params;
        return await getChatById(username, id).messages;
    }
    catch(error) {
        console.error(error);
        res.status(404);
    }
 }

module.exports = {
    CreateChat, getAllChats, getChatById, deleteChat, sendMessage, getMessageArray
};

function decode(token) {
    return jwt.verify(token, "key").username;
}