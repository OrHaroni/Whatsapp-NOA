import '../noa.css';
import React, { useState, useRef } from 'react';
import Chat from '../chat/chat';
import Register from '../register/register';
import { root } from '../index.js'
import logo from '../pictures/LOGO.png'
import { userList } from '../database/Database';
import { sendSwal } from '../chat/chat';
import { startSession } from 'mongoose';
import { loginServer } from '../serverCalls/login.js'
import { getUserPersonel } from '../serverCalls/chat';
import { io } from 'socket.io-client';
// Initialize the socket connection
// this io is the io from the index.html file on the public folder
<script src="http://localhost:8080/socket.io/socket.io.js"></script>
const socket = io('http://localhost:8080', { transports: ['websocket'] });


export function isUserExist(userList, name) {
  var output = false;
  userList.forEach(user => {
    if (user.username === name) {
      output = true;
    }
  })
  return output;
};
function isCorrectPass(userList, username, password) {
  var output = false;
  let user = userList.find((user) => user.username === username);
  if (user.password === password) {
    output = true;
  }
  return output;
};
function Login() {
  const username = useRef(null);
  const password = useRef(null);
  const ClickEnter = (event) => {
    if (event.key === 'Enter') {
      ClickLogin();
    }
  };
  const ClickLogin = async () => {
    if (username.current.value === '') {
      sendSwal("Please insert username", "warning");
    }
    else if (password.current.value === '') {
      sendSwal("Please insert password", "warning");
    } else {
      const u = username.current.value;
      const p = password.current.value;
      const data = { "username": u, "password": p };
      //the function returns 2 values
      const [statusNum, userToken] = await loginServer(data);
      if (statusNum === 200) {
        console.log("Login success");
        // sending the server message that the user is connected using the socketIO
        socket.emit('userConnected', u);
        //getting more data or the user
        const userData = await getUserPersonel({ "username": u, "token": userToken });
        // print the user data
        root.render(<Chat user={userData} token={userToken} />)

      }
      else {
        sendSwal("Incorect username or\\and password, please try again.", "warning");
      }
    };
  }
  const ClickRegister = () => {
    root.render(<Register />);
  };
  return (
    <>
      <div className="upper-bg">
        <img src={logo} className="logo"></img>
      </div>
      <div className="background d-flex justify-content-center align-items-center">
        <div className="form-container p-4 rounded in-Login">
          <header className="reg-head">Login</header><br></br>
          <label htmlFor="exampleFormControlInput1" className="form-label">Username</label><br></br>
          <input onKeyDown={ClickEnter} type="Display Name" className="form-control" ref={username}></input><br></br>
          <label htmlFor="inputPassword5" className="form-label">Password</label><br></br>
          <input onKeyDown={ClickEnter} type="password" className="form-control" aria-labelledby="passwordHelpBlock" ref={password}></input><br></br>
          <button onClick={ClickLogin} id="buttonLogin" type="submit" className="btn btn-primary our-btn">Login</button>
          <button onClick={ClickRegister} id="not-reg" type="submit" className="btn btn-primary our-btn">Not register? Click here to sign up</button>
        </div>
      </div>
    </>
  );
}
export default Login;