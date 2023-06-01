const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketIO  = require("socket.io");
const io = socketIO(server); 
const path = require('path');
const connectedUsers =require('./models/connectedUsers.js');


// Import the 'cors' package
const cors = require('cors');

// Enable CORS for all routes
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
    console.log(path.join);
  });

io.on('connection', async (socket) => {
  console.log('connect to socket');
  // add user to connected users
  socket.on('userConnected', async(username) => {
    const temp = new connectedUsers({ username: username, socketId: socket.id });
    console.log("user connected:");
      await temp.save();
  });

  socket.on('logout', async() => {
    // remove user from connected users
    await connectedUsers.deleteOne({ socketId: socket.id });
  });

  socket.on('disconnect',async () => {
    // remove user from connected users
    await connectedUsers.deleteOne({ socketId: socket.id });
  });

});

const userRoutes = require('./routes/user.js');
const chatRoutes = require('./routes/chat.js');
const tokenRoutes = require('./routes/token.js');


// Middleware for parsing JSON bodies
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Using cors middleware to enable cross-origin requests
app.use(cors());

// Connecting to MongoDB
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/DB" , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((e) => console.log(e));

app.use(express.static('../public'));


app.use('/api/Users', userRoutes);
app.use('/api/Tokens', tokenRoutes);
app.use('/api/Chats', chatRoutes);

app.listen(process.env.PORT);


server.listen(8080);

module.exports = {
     io
};
