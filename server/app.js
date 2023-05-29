//Making a server
const express = require('express');
var app = express();

const userRouts = require('./routes/login');

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
// const customENV = require('custom-env');
// customENV.env(process.env.NODE_ENV, './config');

// //Log the url and port:
// console.log(process.env.CONNECTION_STRING);
// console.log(process.env.PORT);

const mongoose = require('mongoose');


app.use(express.static('../public'));
app.use('/', userRouts);

app.listen(8080);




