const mongoose = require('mongoose');
// const defaultPic = require('../../src/pictures');

const Schema = mongoose.Schema;

const UserPassNameser = new Schema({
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
    UserPassNameser, UserPass, User
}