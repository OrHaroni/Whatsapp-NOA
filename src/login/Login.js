import '../noa.css';
import React, { useState, useRef} from 'react';
import Chat from '../chat/chat';
import Register from '../register/register';
import { root } from '../index.js'
import logo from '../pictures/LOGO.png'
import { useUserList } from '../database/Database.js';



function Login() {

  function isUserExist(userList, name){
    var output = false;
    userList.forEach(user => { 
      if(user.username === name){
        output = true;
      }
    })
  return output;
  };

  function isCorrectPass(userList,username, password){
    var output = false;
    let user = userList.find((user) => user.username === username);
    if(user.password === password){
      output = true;
    }
    return output;
  };

  const [userList, addUser, getUserById] = useUserList();
  const username = useRef(null);
  const password = useRef(null);

  const ClickLogin = () => {  
    if(isUserExist(userList, username.current.value)){
      if(isCorrectPass(userList, username.current.value, password.current.value)){
        //Sending the chat the user that entered
        let user = userList.find((user) => user.username === username.current.value);
        root.render(<Chat user={user}/>);
      }
      else{
        alert("Incorect password!");
      }
    } else{
      alert("Incorect username!");
    }
      //alert("Username of password are incorect!\nTry again!");
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
      <input type="Display Name" className="form-control" ref={username}></input><br></br>
      <label htmlFor="inputPassword5" className="form-label">Password</label><br></br>
      <input type="password" className="form-control" aria-labelledby="passwordHelpBlock" ref={password}></input><br></br>
      <button onClick={ClickLogin} id="buttonLogin" type="submit" className="btn btn-primary our-btn">Login</button>
      <button onClick={ClickRegister} type="submit" className="btn btn-primary our-btn">Not register? Click here to sign up</button>
    </div>
    </div>
    </>
  );
}
export default Login;
