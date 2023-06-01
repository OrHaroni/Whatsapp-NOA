import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import '../noa.css';
import Login from '../login/Login';
import { root } from '../index.js';
import logo from '../pictures/LOGO.png';
import addbtn from '../pictures/add-chat.png';
import ChatPreview from '../chatPreview/ChatPreview.js';
import Message from '../message/Message.js';
import Modal from '../ModalAddChat/Modal';
import { getUserPersonel, getUserChats, addChat, getChat , deleteChat} from '../serverCalls/chat';
import { sendMessage, getMessages } from '../serverCalls/message';
import { io } from 'socket.io-client';


// Initialize the socket connection
// this io is the io from the index.html file on the public folder
<script src="http://127.0.0.1:8080/socket.io/socket.io.js"></script>
const socket = io('http://127.0.0.1:8080', { transports: ['websocket'] });


export function sendSwal(message, icon) {
  /* eslint-disable no-undef */
  Swal.fire({
    text: message,
    icon: icon,
  });
}

export const AddChatPreview = (chat, setUserChatList, status) => {
  if (status === 200) {
    setUserChatList((prevChatList) => [...prevChatList, chat]);
  } else if (status === 404) {
    sendSwal("User isnt found", "warning");
  } else if (status === 501) {
    sendSwal("Cant add youself", "warning");
  } else if (status === 500) {
    sendSwal("You already have chat with this user", "warning");
  }
}

function Chat(props) {
  //state of the id of the opened chat.
  const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);
  const [activeChatId, setActiveChatId] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [ChatClicked, setChatClicked] = useState(null);
  const [userChatList, setUserChatList] = useState([]);
  const [chat, setChat] = useState(null);
  const textbox = useRef();


//Naor's Socket changes !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//   socket.on('newMessage', (message) => {
//     // Handle the new message
//     console.log('New message received:', message);
//     // Update the chat messages state by adding the new message
//     setChat((prevChat) => ({
//       ...prevChat,
//       messages: [...prevChat.messages, message],
//     }));
//     // Call paintAll after receiving a new message
//     paintAll(activeChatId);
//   });

//   function findChat(username,otherUsername) {
//     let chat = null;
//     userChatList.forEach((oneChat) => {
//       if ((oneChat.users[0].username === username && oneChat.users[1].username === otherUsername ) || (oneChat.users[0].username === otherUsername && oneChat.users[1].username === username)) {
//         chat = oneChat;
//       }
//     });
//     return chat;
//   }

      

//   // use effect to listen to the socket if he gets a message
//   useEffect(async() => {
//     socket.on('newMessage', (message) => {
//       console.log(message);
//       // search the chat that this message belongs to, by the user message.sender and the activeChatId
//       const chat =  findChat(user?.username,message.sender.username);
//       // check if both the user,the message.sender both connectedUsers





//       if (message.chatId === activeChatId) {
//         setChat((prevChat) => {
//           const updatedChat = { ...prevChat };
//           updatedChat.messages.push(message);
//           return updatedChat;
//         });
//       }
//     });
//   }, []);

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
  }, [activeChatId, deleteButtonClicked, paintAll]);

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
  }, [deleteButtonClicked])

  //Updating the chatpreview's by date
  function sortListPreview() {
    // Sort the userChatList based on lastMessage.created
    setUserChatList(prevChatList => {
      const updatedChatList = [...prevChatList];
      updatedChatList.sort((a, b) => {
        const tmpA = getLastMessageCreatedSorting(a.messages);
        const tmpB = getLastMessageCreatedSorting(b.messages);
        // Check if lastMessage exists for both items
        if (tmpB && tmpA) {
          const dateA = new Date(tmpA);
          const dateB = new Date(tmpB);
          return dateB - dateA;
        }

        // Handle cases where lastMessage is null or undefined
        if (!tmpA && tmpB) {
          return 1; // b comes before a
        }

        if (tmpA && !tmpB) {
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
    // send to the server that the user is logged out
   // socket.emit('logout',user.username);
    root.render(<Login />);
  };

  const ClickSend = async () => {
    if (textbox.current.value !== '') {
      const msg = await sendMessage({ "id": activeChatId, "token": activeUserToken, "msg": textbox.current.value });
      textbox.current.value = '';
      // Update the chat messages state by adding the new message
      setChat(await getChat({"token": activeUserToken, "id" : activeChatId}));
      paintAll(activeChatId); // Call paintAll after sending a message
    }
  };

  const ClickEnter = (event) => {
    if (event.key === 'Enter') {
      ClickSend();
    }
  };

  const ClickDelete = async (event) => {
    event.stopPropagation();
    const selectedItem = event.currentTarget;
    var selectedId = selectedItem.parentNode.id;
    console.log("the id of the chat we want to delete is : ");
    console.log(selectedId);
    setDeleteButtonClicked(true);
    await deleteChat(activeUserToken, selectedId);
    
}
  const ClickPreview = async (event) => {
    if(!deleteButtonClicked){
    //change the state of the chat because the user entered the first chat
    setChatClicked(true);

    // // Set the background color of the clicked li element to rgb(122, 130, 159)
    const selectedItem = event.currentTarget;
    var selectedId = selectedItem.id; // Access the "id" attribute using dataset

 
    //Getting only the number out of the id
    selectedId = selectedId.match(/\d+$/)[0];
    setActiveChatId(selectedId);

    console.log("in preview!!");
    //updating the userChatPreviewList from the server
    //Setting the new chat.
    var tmpChat = await getChat({ "token": activeUserToken, "id": selectedId });
    setChat(tmpChat);
    }
    setDeleteButtonClicked(false);
  };

  //Getting the active user and token from log in
  const user = props.user;
  const activeUserToken = props.token;

  //reversing the messages list
  const reversedList = chat?.messages.slice().reverse();


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

  function getLastMessageCreated(messages) {
    if(messages){
    let highestId = -Infinity;
    let lastMessage = null;
  
    messages.forEach(message => {
      if (message.id > highestId) {
        highestId = message.id;
        lastMessage = message;
      }
    });
  
    return lastMessage?.created;
  }
  return "";
  }
  function getLastMessagecontent(messages) {
    if(messages){
    let highestId = -Infinity;
    let lastMessage = null;
  
    messages.forEach(message => {
      if (message.id > highestId) {
        highestId = message.id;
        lastMessage = message;
      }
    });
  
    return lastMessage?.content;
  }
  return "";
  }

  function getLastMessageCreatedSorting(messages) {
    if(messages){
    let highestId = -Infinity;
    let lastMessage = null;
  
    messages?.forEach(message => {
      if (message.id > highestId) {
        highestId = message.id;
        lastMessage = message;
      }
    });
  
    return lastMessage?.created;
  }
  return "";
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
            {reversedList ? reversedList?.map((message) => (
  <Message
    id={message.id}
    me={user.username}
    senderUsername={message.sender?.username} // Extract the necessary properties
    senderProfilePic={message.sender?.profilePic}
    senderDisplayName={message.sender?.displayName}
    messageText={message.content}
    img={user.profilePic}
    time={message.created}
  />
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
              <li onClick={ClickPreview} onMouseEnter={HoverIn} onMouseLeave={HoverOut} className="chat-tag" id={chatpreview.id}>
              <ChatPreview
                lastMessage={getLastMessagecontent(chatpreview.messages)}
                img={getOtherUserPic(chatpreview, user)}
                name={getOtherUserDisplayName(chatpreview, user)}
                created={getLastMessageCreated(chatpreview.messages)}
                token={activeUserToken}
                deleteButtonClicked={deleteButtonClicked}
                setDeleteButtonClicked={setDeleteButtonClicked}
                />
                <button onClick={ClickDelete} type="button" class="btn btn-danger delete-b">X</button>
              </li>
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
