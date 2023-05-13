import '../noa.css';
import { useState } from 'react';
import or_pic from '../pictures/or-haroni-profile.jpg';
import naor_pic from '../pictures/naor-nahman-profile.jpg';
import three_pic from '../pictures/Three-musketeers.jpg';


export const useChatList = () => {
  //Declare the list of ChatPreviews
  const [chatList, setChatList] = useState([
    { img: or_pic, name: 'Or Haroni', date: 'Now!', messageList: [{sender:"me", messageText: "Message from DB", img: or_pic}] },
    { img: naor_pic, name: 'Naor Nahman', date: 'Yesterday' },
    { img: three_pic, name: 'Three boys', date: '2 days ago' },
    { img: or_pic, name: 'Noomik', date: '4 days ago' }
  ]);

  //Adding a Chat Preview
  const addChatPreview = (img, name, date, messageList) => {
    setChatList([...chatList, { img, name, date, messageList }]);
  };

  //Getting a chat by its name
  const getChatByName = (name) => {
    return chatList.find((chatPreview) => chatPreview.name === name);
  };

  return [chatList, addChatPreview, getChatByName];
};


//Returning the HTML code of a Chat Preview
function ChatPreview(props) {


    return(
        <li className="chat-tag" id="chat-example">
            <div>
              <img src={props.img} className="rounded-circle chat-profile-pic" />
                </div>
                <div>
                  <span className="chat-tag-label">{props.name}</span>
                </div>
                <div>
                  <span className="chat-tag-label">{props.date}</span>
                </div>
              </li>

    );
}

export default ChatPreview;