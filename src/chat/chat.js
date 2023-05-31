import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../noa.css';
import Login from '../login/Login';
import { root } from '../index.js';
import logo from '../pictures/LOGO.png';
import addbtn from '../pictures/add-chat.png';
import ChatPreview from '../chatPreview/ChatPreview.js';
import Message from '../message/Message.js';
import { userList } from '../database/Database';
import Modal from '../ModalAddChat/Modal';
import { getUserPersonel, getUserChats, addChat, getChat } from '../serverCalls/chat';
import { sendMessage, getMessages } from '../serverCalls/message';

export function sendSwal(message, icon) {
  /* eslint-disable no-undef */
  Swal.fire({
    text: message,
    icon: icon,
  });
}


export const AddChatPreview = (chat, setUserChatList) => {
  // // Update the userChatList state with the new chat preview
  // console.log("ChatSchema in AddChatPreview: ");
  // console.log(ChatSchema);

  // console.log(ChatSchema.users[1]);
  // const otherUser = ChatSchema.users[1];
  // const chat = {
  //   id: ChatSchema.id,
  //   username: otherUser.username,
  //   lastMessage: "hey",
  //   messages: ChatSchema.messages,
  //   displayName: otherUser.displayName,
  //   profilePic: otherUser.profilePic
  // };
  // console.log("chat in AddChatPreview: ");
  // console.log(chat);
  setUserChatList((prevChatList) => [...prevChatList, chat]);
}

function Chat(props) {
  //state of the id of the opened chat.
  const [activeChatId, setActiveChatId] = useState(0)
  const [modalOpen, setModalOpen] = useState(false);
  const [ChatClicked, setChatClicked] = useState(null);
  const [userChatList, setUserChatList] = useState([]);
  const [chat, setChat] = useState(null);
  const [activeChatIndex, setActiveChatIndex] = useState(null);
  const textbox = useRef();

  //Getting for the first time all the users from the server
  useEffect(() => {
    const fetchUserChatList = async () => {
      try {
        const fetchedUserChatList = await getUserChats({ token: props.token });
        setUserChatList(fetchedUserChatList);
        sortListPreview();
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserChatList();
  }, [chat]);

  //painting the active every time even when changing to the top
  useEffect(() => {
    if (activeChatId !== 0) {
      paintAll(activeChatId);
    }
  }, [activeChatId, paintAll]);

  //Updating the chatpreview's by date
  function sortListPreview() {
    // Sort the userChatList based on lastMessage.created
    setUserChatList(prevChatList => {
      const updatedChatList = [...prevChatList];
      updatedChatList.sort((a, b) => {
        // Check if lastMessage exists for both items
        if (a.lastMessage && b.lastMessage) {
          const dateA = new Date(a.lastMessage.created);
          const dateB = new Date(b.lastMessage.created);
          return dateB - dateA;
        }

        // Handle cases where lastMessage is null or undefined
        if (!a.lastMessage && b.lastMessage) {
          return 1; // b comes before a
        }

        if (a.lastMessage && !b.lastMessage) {
          return -1; // a comes before b
        }

        return 0; // Both lastMessage are null or undefined
      });

      return updatedChatList;
    });
  };

  //Paint all li in white except for the li with id 
  function paintAll(id) {
    const list = document.querySelectorAll('.chat-tag');
    list.forEach((li) => {
      if (li.id === id) {
        li.style.backgroundColor = "rgb(122, 130, 159)";
      }
      else {
        li.style.backgroundColor = 'white';
      }
    });
  }
  const HoverIn = (event) => {
    const selectedItem = event.currentTarget;
    //If its not the active chat
    if (selectedItem.style.backgroundColor != "rgb(122, 130, 159)") {
      selectedItem.style.backgroundColor = "#c2bebe";
    }
  }
  const HoverOut = (event) => {
    const selectedItem = event.currentTarget;
    if (selectedItem.style.backgroundColor != "rgb(122, 130, 159)") {
      selectedItem.style.backgroundColor = "White";
    }
    else {
      selectedItem.style.backgroundColor = "rgb(122, 130, 159)";
    }
  }

  const ClickLogout = () => {
    root.render(<Login />);
  };

  const ClickSend = async () => {
    const currentTime = new Date();
    const datev = currentTime.toLocaleDateString('en-GB');
    const hourv = currentTime.getHours();
    const minutev = currentTime.getMinutes();
    if (textbox.current.value !== '') {
      const msg = await sendMessage({ "id": activeChatId, "token": activeUserToken, "msg": textbox.current.value });
      textbox.current.value = '';
      // Update the chat messages state by adding the new message
      setChat(prevChat => {
        const updatedChat = { ...prevChat }; // Create a copy of the chat object
        updatedChat.messages.push(msg); // Add the new message to the messages array
        return updatedChat;
      });
      paintAll(activeChatId); // Call paintAll after sending a message
    }
  };

  const ClickEnter = (event) => {
    if (event.key === 'Enter') {
      ClickSend();
    }
  };
  const ClickPreview = async (event) => {
    //change the state of the chat because the user entered the first chat
    setChatClicked(true);

    // // Set the background color of the clicked li element to rgb(122, 130, 159)
    const selectedItem = event.currentTarget;
    var selectedId = selectedItem.id; // Access the "id" attribute using dataset

    //Getting only the number out of the id
    selectedId = selectedId.match(/\d+$/)[0];
    setActiveChatId(selectedId);

    //updating the userChatPreviewList from the server
    //Setting the new chat.
    var tmpChat = await getChat({ "token": activeUserToken, "id": selectedId });
    setChat(tmpChat);
  };

  //Getting the active user and token from log in
  const user = props.user;
  const activeUserToken = props.token;

  //reversing the messages list
  const reversedList = chat?.messages?.slice().reverse();

  //Getting the other user of the chat img
  function getOtherUserPic(chat, user) {
    if (chat?.users[0]?.username === user.username) {
      return chat?.users[1]?.profilePic;
    }
    return chat?.users[0]?.profilePic;
  }

  //Getting the other user of the chat username
  function getOtherUserDisplayName(chat, user) {
    if (chat?.users[0]?.username === user.username) {
      return chat?.users[1]?.displayName;
    }
    return chat?.users[0]?.displayName;
  }

  function ifChatClicked() {
    // if the user clicked on a chat, show the chat
    if (ChatClicked) {
      return (
        <>
          <div id="current-chat-info">
            <img src={getOtherUserPic(chat, user)} className="rounded-circle profile-pic-in-div" />
            <span id="chat-name">{getOtherUserDisplayName(chat, user)}</span>
          </div>
          <div id="active-chat" className="chat-history">
            <ul id="active-chat-list" className="list-unstyled chat-list mb-0">
              {reversedList?.map((message) => (
                <Message key={message.id} me={user.username} sender={message.sender.username} messageText={message.content} img={message.sender.profilePic} time={message.created} />
              ))}
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
        <div className="image-container"></div>
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
              <img src={user.profilePic} className="rounded-circle profile-pic-in-div" />
            </div>
            <span style={{ position: 'absolute', left: '20%', top: '35%', width: '250px', height: '20px', fontWeight: 'bold' }}>{user.displayName}</span>
            <div id="user-in-chat-right">
              <img onClick={async () => {
                setModalOpen(true);
              }}
                type="button" src={addbtn} alt="image" id="add-btn" className="rounded-circle" data-bs-toggle="modal" data-bs-target="#imageModal" />
              {modalOpen && <Modal setOpenModal={setModalOpen} token={activeUserToken} func={setUserChatList} />}
            </div>
          </header>
          <ul className="list-unstyled chat-list mb-0" id="chat-list">
            {userChatList?.map((chatpreview) => (
              <ChatPreview in={HoverIn} out={HoverOut} onClick={ClickPreview} messages={chatpreview.messages} img={getOtherUserPic(chatpreview, user)} name={getOtherUserDisplayName(chatpreview, user)} id={chatpreview.id} />
            ))}
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
