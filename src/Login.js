import './noa.css';
import React, { useState } from 'react';
import Chat from './chat';
import Register from './register';
import { root } from './index.js'



function Login() {
  const ClickLogin = () => {  
    root.render(<Chat />);
  };

  const ClickRegister = () => {  
    root.render(<Register />);
  };


  return (
    <>
    <div className="upper-bg">
      <img src="pictures\LOGO.png" className="logo"></img>
  </div>

    <div className="background d-flex justify-content-center align-items-center">
    <div className="form-container p-4 rounded in-Login">
      <header className="reg-head">Login</header><br></br>
      <label htmlFor="exampleFormControlInput1" className="form-label">Username</label><br></br>
      <input type="Display Name" className="form-control" id="exampleFormControlInput1"></input><br></br>
      <label htmlFor="inputPassword5" className="form-label">Password</label><br></br>
      <input type="password" id="inputPassword5" className="form-control" aria-labelledby="passwordHelpBlock"></input><br></br>
      <button onClick={ClickLogin} id="buttonLogin" type="submit" className="btn btn-primary our-btn">Login</button>
      <button onClick={ClickRegister} type="submit" className="btn btn-primary our-btn">Not register? Click here to sign up</button>
    </div>
    </div>
    </>
  );
}
export default Login;
