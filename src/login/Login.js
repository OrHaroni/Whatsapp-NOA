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
    const u = username.current.value;
    const p = password.current.value;
    let user;
    let statusCode;

    //returns the user and status code
    await fetch(`http://localhost:8080/login?username=${u}&password=${p}`).then(response => response.json().then(data => {
      user = data;
      statusCode = response.status;
    })
      .catch(error => {
        console.error(error);
      }));


    if (username.current.value === '') {
      sendSwal("Please insert username", "warning");
    }
    else if (password.current.value === '') {
      sendSwal("Please insert password", "warning");
    }     //if there is user.
    else if (statusCode === 200) {
      // send with the users token!
      root.render(<Chat user={user}/>)
    }
    else {
      sendSwal("No such user exists", "warning");
    }

  };
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
          <input name="username" onKeyDown={ClickEnter} type="Display Name" className="form-control" ref={username}></input><br></br>
          <label htmlFor="inputPassword5" className="form-label">Password</label><br></br>
          <input name="password" onKeyDown={ClickEnter} type="password" className="form-control" aria-labelledby="passwordHelpBlock" ref={password}></input><br></br>
          <button onClick={ClickLogin} id="buttonLogin" type="submit" value="login" className="btn btn-primary our-btn">Login</button>
          <button onClick={ClickRegister} id="not-reg" type="submit" value="register" className="btn btn-primary our-btn">Not register? Click here to sign up</button>
        </div>
      </div>
    </>
  );
}
export default Login;
