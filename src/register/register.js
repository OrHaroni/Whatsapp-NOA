import React, { useState, useRef } from 'react';
import '../noa.css';
import Login from '../login/Login';
import Chat from '../chat/chat';
import { root } from '../index.js'
import logo from "../pictures/LOGO.png"
import default_picture from "../pictures/naor-nahman-profile.jpg";
import { isUserExist } from '../login/Login';
import { userList } from '../database/Database';



export function isDisNameExist(userList, name){
  var output = false;
  userList.forEach(user => { 
    if(user.name === name){
      output = true;
    }
  })
return output;
};



function Register() {
  const ClickEnter = (event) => {
    if (event.key === 'Enter') {
      ClickRegister();
    }
  };

  const ClickRegister = () => {
    var usernametxt = username.current.value;
    var passwordtxt = password.current.value;
    var displaytxt = displayname.current.value;
    var imgurl = img.current.value;
    if(isUserExist(userList, usernametxt) || usernametxt === '')
    {
      alert("Username is taken, try different one.");
    } else if(isDisNameExist(userList, displaytxt) || displaytxt === ''){
      alert("Display name is taken, try different one.");
    }
    else{
      //Add the User and enter him to the chat.
      const user = { id: String(userList.length + 1), usernametxt, passwordtxt, displaytxt, imgurl, chatList };
      userList.push(user);
      console.log(userList);
      
    root.render(<Chat user={user}/>);
    }
    //One of the things get wrong, 
  };


  const username = useRef(null);
  const password = useRef(null);
  const displayname = useRef(null);
  const img = useRef(null);
  const chatList = null;

  
    const ClickLogin = () => {
      root.render(<Login />);
    }

  return (
    <>
    <div className="upper-bg">
      <img src={logo} className="logo"></img>
  </div>

    <div className="background d-flex justify-content-center align-items-center">
      <div className="form-container p-4 rounded in-register">
        <header className="reg-head">Create an account</header><br></br>
        <label htmlFor="exampleFormControlInput1" className="form-label">Username</label><br></br>
        <input onKeyDown={ClickEnter} ref={username} type="Username" className="form-control" ></input> <br></br>
        <label htmlFor="inputPassword5" className="form-label">Password</label><br></br>
        <input onKeyDown={ClickEnter} ref={password} type="password" className="form-control" aria-labelledby="passwordHelpBlock"></input><br></br>
        <label htmlFor="exampleFormControlInput1" className="form-label">Display Name</label><br></br>
        <input onKeyDown={ClickEnter} ref={displayname} type="Display Name" className="form-control" id="exampleFormControlInput1"></input><br></br>
        <label htmlFor="formFile" className="form-label">Picture</label><br></br>
        <input ref={img} className="form-control" type="file"></input><br></br>
        <img src={default_picture} className="prof-pic"></img>
          <button onClick={ClickRegister} type="submit" className="btn btn-primary our-btn">Register</button>
          <button id="have-acc" onClick={ClickLogin} type="submit" className="btn btn-primary our-btn">I already have an account</button>
      </div>
    </div>
   </>
  );
}
export default Register;
