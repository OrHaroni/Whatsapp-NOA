import React from 'react';
import './noa.css';
import Login from './Login';
import { root } from './index.js'



function Chat() {
  const ClickLogout = () => {  
    root.render(<Login />);
  };
  return (
    <>
     <div className="upper-bg">
            <button onClick={ClickLogout} id="logout-btn" type="button" className="btn btn-danger btn-logout">Logout</button>
            <img src="pictures\LOGO.png" className="logo"></img>
        </div>

            <div id="main-chat" className=" form-container p-4 rounded in-chat">
              <div id="contacts-list" className="contacts-list">
                <header id="contacts-header" className="user-in-chat">
                  <div id="user-in-chat-left">
                    <img src="pictures\naor-nahman-profile.jpg" className="rounded-circle profile-pic-in-div" />    
                  </div>
                  <span style={{position: 'absolute', left: '20%', top: '35%', width: '250px', height: '20px', fontWeight: 'bold'}}>Naor Nahman</span>
                  <div id="user-in-chat-right">
                    <img type="button" src="pictures\add-chat.png" alt="image" id="add-btn" className="rounded-circle" data-bs-toggle="modal" data-bs-target="#imageModal" />
                    <div className="modal fade" id="imageModal" tabIndex={-1} aria-labelledby="imageModalLabel" aria-hidden="true">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="imageModalLabel">Add new contact</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                          </div>
                          <div className="modal-body">
                            <label htmlFor="identifier">Contact's identifier:</label>
                            <input type="text" id="identifier" name="identifier" />
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary our-btn">Add</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div></header> 
                <ul className="list-unstyled chat-list mb-0" id="chat-list">
                  <li className=" chat-tag" id="chat-example">
                    <div>
                      <img src="pictures\or-haroni-profile.jpg" className="rounded-circle chat-profile-pic" />
                    </div>
                    <div>
                      <span className="chat-tag-label">Or The King</span>
                    </div>
                    <div>
                      <span className="chat-tag-label">November 16th, 1999 12:30 PM UTC</span>
                    </div>
                  </li>
                  <li className="chat-tag" id="chat-example" style={{backgroundColor: 'gray', fontWeight: 'bold'}}>
                    <div>
                      <img src="pictures\Three-musketeers.jpg" className="rounded-circle chat-profile-pic" />
                    </div>
                    <div>
                      <span className="chat-tag-label">The three musketeers</span>
                    </div>
                    <div>
                      <span className="chat-tag-label">January 24th, 2023 21:38 PM UTC</span>
                    </div>
                  </li>
                </ul>           
              </div>
              <div id="chat" className="chat-container">
                <div id="current-chat-info">
                  <img src="pictures\Three-musketeers.jpg" className="rounded-circle profile-pic-in-div" />
                  <span id="chat-name">The three musketeers</span>
                </div>
                <div id="active-chat" className="chat-history">
                  <ul id="active-chat-list" className="list-unstyled chat-list mb-0">
                    <li id="first-message-example" className="clearfix">
                      <img src="pictures\naor-nahman-profile.jpg" className="rounded-circle profile-pic-in-div" />
                      <div className="card text-white bg-primary mb-3" style={{maxWidth: '18rem', left: '10%'}}>
                        <div className="card-body">
                          <p className="card-text">hey</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <img src="pictures\or-haroni-profile.jpg" className="rounded-circle sender-pic-in-div" />
                      <div className="card text-white bg-secondary mb-3" style={{maxWidth: '18rem', float: 'right', right: '10%'}}>
                        <div className="card-body">
                          <h5 className="card-title">Or Haroni</h5>
                          <p className="card-text">Hello guys</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div id="send-area">
                  <div id="chat-input" className="input-group">
                    <input id="textbox-input" type="text" className="form-control" placeholder="New message here..." />
                    <div className="input-group-append">
                      <button id="send-btn" className="btn btn-outline-secondary our-btn" type="button">Send</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </>
          );
        }
export default Chat;
