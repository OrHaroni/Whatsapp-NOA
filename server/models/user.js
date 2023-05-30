const users = [
    { username: '123', password: '123', displayName: '123', profilePic: 123, ChatList: [{
        id: 3,
        user: {
          username: 14141411,
          displayName: "naor",
          profilePic: "NOT REAL PIC"
        },
        lastMessage: null 
        }],  }, 
    
    { username: '124', password: '124', displayName: '124', profilePic: 124, ChatList: [],  },
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