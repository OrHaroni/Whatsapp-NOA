const mongoose = require('mongoose');
// const defaultPic = require('../../src/pictures');
const Message = require('./message.js');

const Schema = mongoose.Schema;

const Chat = new Schema({
    id: {
        type: Number,
        require: true
    },
    users: [{
        username: {
            type: String,
            require: true
        },
        displayName: {
            type: String,
            require: true
        },
        profilePic: {
            type: String
        }
    },
    {
        username: {
            type: String,
            require: true
        },
        displayName: {
            type: String,
            require: true
        },
        profilePic: {
            type: String
        }
    },],
    messages: [Message]
})


module.exports = mongoose.model('Chat', Chat);