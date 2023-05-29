const users = [
    {username: "123", password: "123", displayName: "123", profilePic: "123"}
];


const mongoose = require('mongoose');
// const defaultPic = require('../../src/pictures');

const Schema = mongoose.Schema;

const UserPassName = new Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    displayName: {
        type: String,
        require: true
    },
    profilePic: {
        type: String    ,
        // default: defaultPic.user-profile.png
    },

});

const UserPass = new Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

const User = new Schema({
    username: {
        type: String,
        require: true
    },
    displayName: {
        type: String,
        require: true
    },
    profilePic: {
        type: String,
    }
});

module.exports = {
    UserPassName, UserPass, User, users
}