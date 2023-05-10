import React, { useState } from 'react';
import '../noa.css';
import Login from '../login/Login';
import { root } from '../index.js';
import logo from '../pictures/LOGO.png';
import or_pic from '../pictures/or-haroni-profile.jpg';
import naor_pic from '../pictures/naor-nahman-profile.jpg';
import three_pic from '../pictures/Three-musketeers.jpg';
import addbtn from '../pictures/add-chat.png';
import Message from '../message/Message.js';
import ChatPreview from '../chatPreview/ChatPreview.js';

function Chat() {
  const ClickLogout = () => {  
    root.render(<Login />);
  };

  const [chatList, setchatList] = useState([
    { img: or_pic, name: 'Or Haroni', date: 'Now!' },
    { img: naor_pic, name: 'Naor Nahman', date: 'Yesterday' },
    { img: three_pic, name: 'Three boys', date: '2 days ago' }
  ]);

  const addChatPreview = (img, name, date) => {
    setchatList([...chatList, { img, name, date }]);
  };

  const [messageList, setmessageList] = useState([
    { sender: 'me', messegeText: 'I am a message', img: or_pic },
    { sender: 'Naor Nahman', messegeText: 'Text text text', img: naor_pic }
  ]);

  const addMessage = (name, text, img) => {
    setmessageList([...messageList, { name, text, img }]);
  };

  return (
    <>
      <div className="upper-bg">
        <button onClick={ClickLogout} id="logout-btn" type="button" className="btn btn-danger btn-logout">Logout</button>
        <img src={logo} className="logo" alt="Logo" />
      </div>

      <div id="main-chat" className=" form-container p-4 rounded in-chat">
        <div id="contacts-list" className="contacts-list">
          <header id="contacts-header" className="user-in-chat">
            <div id="user-in-chat-left">
              <img src={naor_pic} className="rounded-circle profile-pic-in-div" />    
            </div>
            <span style={{position: 'absolute', left: '20%', top: '35%', width: '250px', height: '20px', fontWeight: 'bold'}}>Naor Nahman</span>
            <div id="user-in-chat-right">
              <img type="button" src={addbtn} alt="image" id="add-btn" className="rounded-circle" data-bs-toggle="modal" data-bs-target="#imageModal" />
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
              </div>
            </header> 
            <ul className="list-unstyled chat-list mb-0" id="chat-list">
              {chatList.map((chatPreview) => (
                <ChatPreview img={chatPreview.img} name={chatPreview.name} message={chatPreview.message} />
              ))}
            </ul>           
          </div>
          <div id="chat" className="chat-container">
            <div id="current-chat-info">
              <img src={three_pic} className="rounded-circle profile-pic-in-div" />
              <span id="chat-name">The three musketeers</span>
            </div>
            <div id="active-chat" className="chat-history">
              <ul id="active-chat-list" className="list-unstyled chat-list mb-0">
                {messageList.map((message) => (
                  <Message name={message.sender} text={message.messegeText} img={message.img} />
                ))}
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
  