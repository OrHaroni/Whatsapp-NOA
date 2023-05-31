const mongoose = require('mongoose');
// const defaultPic = require('../../src/pictures');
const Message = require('./message.js');

const Schema = mongoose.Schema;

const Chat = new Schema({
    id: {
        type: Number,
        require: true,
        unique: true
    },
    users: [{
        username: {
            type: String,
            require: true,
            unique: true
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
            require: true,
            unique: true
        },
        displayName: {
            type: String,
            require: true
        },
        profilePic: {
            type: String
        }
    },],
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]
})

const ChatCounter = new mongoose.Schema({
    model: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        default: 0
    }
});
const Counter = mongoose.model('Counter', ChatCounter);

module.exports = mongoose.model('Chat', Chat);