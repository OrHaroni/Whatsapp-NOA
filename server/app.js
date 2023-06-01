//Making a server
const express = require('express');
var app = express();

const userRouts = require('./routes/user.js');
const chatRouts= require('./routes/chat.js');
const tokenRouts= require('./routes/token.js');

// Middleware for parsing JSON bodies
app.use(express.json({limit: '50mb'}));

//Using bodyParser midware to use "body" in POST calls
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '50mb' ,extended: true }));



// app.use('/', homepageFunc);
//Using cors midware, I dont know why
const cors = require('cors');
app.use(cors());

// //Using env to get rid of magic strings and use local and test in config
const customENV = require('custom-env');
customENV.env(process.env.NODE_ENV, '../config');

console.log(process.env.PORT);
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/DB" , {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>console.log('connected'))
.catch(e=>console.log(e));
app.use(express.static('../public'));

app.use('/api/Users', userRouts);
app.use('/api/Tokens', tokenRouts);
app.use('/api/Chats', chatRouts);

app.listen(8080);


