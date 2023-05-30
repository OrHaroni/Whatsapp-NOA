//Making a server
const express = require('express');
var app = express();

const userRouts = require('./routes/user');

// Middleware for parsing JSON bodies
app.use(express.json());

//Using bodyParser midware to use "body" in POST calls
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// app.use('/', homepageFunc);
//Using cors midware, I dont know why
const cors = require('cors');
app.use(cors());

// //Using env to get rid of magic strings and use local and test in config
const customENV = require('custom-env');
customENV.env(process.env.NODE_ENV, '../config');

const mongoose = require('mongoose');
mongoose.connect(process.env.CONECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>console.log('connected'))
.catch(e=>console.log(e));
app.use(express.static('../public'));
app.use('/', userRouts);

const key = "Some super secret key shhhhhhhhhhhhhhhhh!!!!!"

app.listen(process.env.PORT);


