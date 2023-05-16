import React, { useState, useRef } from 'react';
import '../noa.css';
import Login from '../login/Login';
import { root } from '../index.js';
import logo from '../pictures/LOGO.png';
import three_pic from '../pictures/Three-musketeers.jpg';
import addbtn from '../pictures/add-chat.png';
import ChatPreview from '../chatPreview/ChatPreview.js';
import Message from '../message/Message.js';
import { userList } from '../database/Database';
import Modal from '../ModalAddChat/Modal';

var numOfChats = 0;

export function sendSwal(message, icon) {
  /* eslint-disable no-undef */
  Swal.fire({
    text: message,
    icon: icon,
  });
}

export const AddChatPreview = (user, Chatname) => {
  if(user.name !== Chatname){
  //Checking if there is a user with this name
  let ConUser = userList.filter((user) => user.name === Chatname)
  console.log("This is the user")
  console.log(ConUser);
  if(ConUser[0]){
    const chat = {
      id: numOfChats++,
      img: ConUser[0].img,
      name: ConUser[0].name,
      messageList: []
    }
    console.log(chat);
    user.chatList.push(chat);
  }
  else{
    sendSwal("user doesnt exist", "warning");
  }
}
else{
  sendSwal("Cant add yourself", "warning");
}
 console.log(user.chatList);
}

function Chat(props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [ChatClicked, setChatClicked] = useState(null);

  const HoverIn = (event) => {
    const selectedItem = event.currentTarget;
    //If its not the active chat
    if(selectedItem.style.backgroundColor != "rgb(122, 130, 159)"){
    selectedItem.style.backgroundColor = "#c2bebe";
    }
  }
  const HoverOut = (event) => {
    const selectedItem = event.currentTarget;
    if(selectedItem.style.backgroundColor != "rgb(122, 130, 159)"){
      selectedItem.style.backgroundColor = "White";
      }
      else{
        selectedItem.style.backgroundColor = "rgb(122, 130, 159)";
      }
  }

  const ClickLogout = () => {
    root.render(<Login />);
  };

  const ClickSend = () => {
    const currentTime = new Date();
    if (textbox.current.value !== '') {
      var message = {
        sender: "me",
        messageText: textbox.current.value,
        img: user.img
      };
      chat?.messageList?.push(message);
      textbox.current.value = '';
      setChat(chat => ({ ...chat, date: currentTime }));
    }
  };

  const ClickEnter = (event) => {
    if (event.key === 'Enter') {
      ClickSend();
    }
  };
  const ClickPreview = (event) => {
    //change the state of the chat because the user entered the first chat
    setChatClicked(true);
    // Reset the background color of all li elements to white
    const selectedItems = event.currentTarget.parentElement.querySelectorAll("li");
    selectedItems.forEach((item) => {
      item.style.backgroundColor = "white";
    });

    // // Set the background color of the clicked li element to rgb(122, 130, 159)
    const selectedItem = event.currentTarget;
    var selectedId = selectedItem.id; // Access the "id" attribute using dataset

    //Getting only the number out of the id
    selectedId = selectedId.match(/\d+$/)[0];

    //Changing the active chat background color to be rgb(122, 130, 159)
    selectedItem.style.backgroundColor = "rgb(122, 130, 159)";

    //Getting the chat with the id we want.
    const selectedChat = user.chatList.find((chat) => chat.id == selectedId);

    //Setting the new chat.
    setChat(selectedChat);
  };
  //Getting the active user by the id
  const user = props.user;

    //Starting with nothing inside chat. 
    //When clicked, we will set the chat.
    const [chat, setChat] = useState();
    var reversedList = chat?.messageList?.slice().reverse() || [];

  const textbox = useRef();

  function ifChatClicked() {
    // if the user clicked on a chat, show the chat
    if (ChatClicked) {
      return (
        <>
          <div id="current-chat-warning">
            <img src={chat?.img} className="rounded-circle profile-pic-in-div" />
            <span id="chat-name">{chat?.name}</span>
          </div>
          <div id="active-chat" className="chat-history">
            <ul id="active-chat-list" className="list-unstyled chat-list mb-0">
              {reversedList ? reversedList?.map((message) => (
                <Message sender={message.sender} messageText={message.messageText} img={message.img} />
              )) : null}
            </ul>
          </div>
          <div id="send-area">
            <div id="chat-input" className="input-group">
              <input onKeyDown={ClickEnter} ref={textbox} type="text" className="form-control" placeholder="New message here..." />
              <div className="input-group-append">
                <button onClick={ClickSend} className="btn btn-outline-secondary our-btn" type="button">Send</button>
              </div>
            </div>
          </div>
        </>
      );
    }
    else {
      return (
        //return the default image untill the user choose a chat to talk to. the image in the noa.css file
          <div class="image-container"></div>
      );
    }
  }

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
              <img src={user.img} className="rounded-circle profile-pic-in-div" />
            </div>
            <span style={{ position: 'absolute', left: '20%', top: '35%', width: '250px', height: '20px', fontWeight: 'bold' }}>{user.name}</span>
            <div id="user-in-chat-right">
              <img onClick={() => {
                setModalOpen(true);
              }}
                type="button" src={addbtn} alt="image" id="add-btn" className="rounded-circle" data-bs-toggle="modal" data-bs-target="#imageModal" />
              {modalOpen && <Modal setOpenModal={setModalOpen} user={user} />}
            </div>
          </header>
          <ul className="list-unstyled chat-list mb-0" id="chat-list">
            {user.chatList ? user.chatList?.map((chatpreview) => (
              <ChatPreview in={HoverIn} out={HoverOut} onClick={ClickPreview} img={chatpreview.img} name={chatpreview.name} date={chatpreview.date} id={chatpreview.id} />
            )) : null}
          </ul>
        </div>
        <div id="chat" className="chat-container">
              {ifChatClicked()}
        </div>
      </div>
    </>
  );
}

export default Chat;
