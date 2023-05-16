import React, { useState, useRef } from 'react';
import '../noa.css';
import Login from '../login/Login';
import Chat from '../chat/chat';
import { root } from '../index.js'
import logo from "../pictures/LOGO.png"
import { isUserExist } from '../login/Login';
import { userList } from '../database/Database';
import defaultUserPic from '../pictures/user-profile.png';
import { sendSwal } from '../chat/chat';



export function isDisNameExist(userList, name) {
  var output = false;
  userList.forEach(user => {
    if (user.name === name) {
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
  // function to check if the user choose a picture, if yes show it, otherwise, show nothing.
  function showImage() {
    if (image) {
      return <img src={image} className="prof-pic"></img>;
    }
  }

  const ClickRegister = () => {
    var username = usernamev.current.value;
    var password = passwordv.current.value;
    var name = displaynamev.current.value;
    var img;

    if (!image) {
      img = defaultUserPic;
    }
    else {
      img = image;
    }

    const chatList = [];
    if (isUserExist(userList, username)) {
      sendSwal("username if taken, try a different one", "warning");
    }
    else if (username === '') {
      sendSwal("Please insert username", "warning");

    }
    else if (password === '') {
      sendSwal("Please insert password", "warning");
    }
    else if (isDisNameExist(userList, name)) {
      sendSwal("Display name is taken, try different one.", "warning");
    }
    else if(name === ''){
      sendSwal("Please insert display name", "warning");
    }
    else {
      //Add the User and enter him to the chat.
      const user = { id: String(userList.length + 1), username, password, name, img, chatList };
      userList.push(user);
      console.log(userList);
      root.render(<Chat user={user} />);
    }
    //One of the things get wrong, 
  };


  const usernamev = useRef(null);
  const passwordv = useRef(null);
  const displaynamev = useRef(null);


  const ClickLogin = () => {
    root.render(<Login />);
  }


  // the image state
  const [image, setImage] = useState(null);

  //Convert the image to base64 and make it a string
  function convertToBase64(e) {
    console.log("e");
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    }
    reader.onerror = (error) => {
    }
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
          <input onKeyDown={ClickEnter} ref={usernamev} type="Username" className="form-control" ></input> <br></br>
          <label htmlFor="inputPassword5" className="form-label">Password</label><br></br>
          <input onKeyDown={ClickEnter} ref={passwordv} type="password" className="form-control" aria-labelledby="passwordHelpBlock"></input><br></br>
          <label htmlFor="exampleFormControlInput1" className="form-label">Display Name</label><br></br>
          <input onKeyDown={ClickEnter} ref={displaynamev} type="Display Name" className="form-control" id="exampleFormControlInput1"></input><br></br>
          <label htmlFor="formFile" className="form-label">Picture</label><br></br>
          <input onChange={convertToBase64} className="form-control" type="file"></input><br></br>
          {showImage()}
          <button onClick={ClickRegister} type="submit" className="btn btn-primary our-btn">Register</button>
          <button id="have-acc" onClick={ClickLogin} type="submit" className="btn btn-primary our-btn">I already have an account</button>
        </div>
      </div>
    </>
  );
}
export default Register;