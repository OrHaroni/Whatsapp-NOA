import React from 'react';
import '../noa.css';
import Login from '../login/Login';
import Chat from '../chat/chat';
import { root } from '../index.js'
import logo from "../pictures/LOGO.png"
import default_picture from "../pictures/naor-nahman-profile.jpg"



function Register() {

  const ClickRegister = () => {  
    root.render(<Chat />);
  };
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
        <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label><br></br>
        <input type="Username" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"></input> <br></br>
        <label htmlFor="inputPassword5" className="form-label">Password</label><br></br>
        <input type="password" id="inputPassword5" className="form-control" aria-labelledby="passwordHelpBlock"></input><br></br>
        <label htmlFor="exampleFormControlInput1" className="form-label">Display Name</label><br></br>
        <input type="Display Name" className="form-control" id="exampleFormControlInput1"></input><br></br>
        <label htmlFor="formFile" className="form-label">Picture</label><br></br>
        <input className="form-control" type="file" id="formFile"></input><br></br>
        <img src={default_picture} className="prof-pic"></img>
          <button onClick={ClickRegister} type="submit" className="btn btn-primary our-btn">Register</button>
          <button onClick={ClickLogin} type="submit" className="btn btn-primary our-btn">I already have an account</button>
      </div>
    </div>
   </>
  );
}
export default Register;
