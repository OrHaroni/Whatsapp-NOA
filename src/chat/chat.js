import React, { useState } from 'react';
import '../noa.css';
import Login from '../login/Login';
import { root } from '../index.js';
import logo from '../pictures/LOGO.png';
import naor_pic from '../pictures/naor-nahman-profile.jpg';
import three_pic from '../pictures/Three-musketeers.jpg';
import addbtn from '../pictures/add-chat.png';
import Message from '../message/Message.js';
import ChatPreview from '../chatPreview/ChatPreview.js';
import { useUserList } from '../database/Database.js';
import { useChatList } from '../chatPreview/ChatPreview.js';

function Chat() {
  const ClickLogout = () => {
    root.render(<Login />);
  };

  const [userList, addUser, getUserById] = useUserList();
  const [chatList, addChatPreview, getChatByName] = useChatList();

  //Getting the active user by the id
  const user = getUserById(1);
  
  //Getting the chat that we want to display by the name of the chat we want to open.
  const chat = user.chatList.find((chatPreview) => chatPreview.name === "Naor Nahman");


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
            <span style={{ position: 'absolute', left: '20%', top: '35%', width: '250px', height: '20px', fontWeight: 'bold' }}>Naor Nahman</span>
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
            {user.chatList?.map((chatPreview) => (
              <ChatPreview img={chatPreview.img} name={chatPreview.name} date={chatPreview.date} />
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
              {chat.messageList.map((message) => (
                <Message sender={message.sender} messageText={message.messageText} img={message.img} />
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
