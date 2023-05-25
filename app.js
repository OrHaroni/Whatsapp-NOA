//Making a server
const express = require('express');
var app = express();

//Using bodyParser midware to use "body" in POST calls
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json());

//Using cors midware, I dont know why
const cors = require('cors');
app.use(cors());

//Using env to get rid of magic strings and use local and test in config
const customENV = require('custom-env');
customENV.env(process.env.NODE_ENV, './config');

//Log the url and port:
console.log(process.env.CONNECTION_STRING);
console.log(process.env.PORT);

const mongoose = require('mongoose');




