
import '../noa.css';
import { removeChat } from '../chat/chat';

//Returning the HTML code of a Chat Preview
function ChatPreview(props) {
  const clickDelete = async (event) => {
    removeChat(event, props.token);
  };
  const id =  props.id;
  if (props.lastMessage) {

  

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      
      const formattedDate = date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      
      const formattedTime = date.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit'
      });
      
      return `${formattedDate} ${formattedTime}`;
    };
    const formattedDate = formatDate(props.created);

    return (
      <li onClick={props.onClick} onMouseEnter={props.in} onMouseLeave={props.out} className="chat-tag" id={id}>
        <div>
          <img src={props.img} className="rounded-circle chat-profile-pic" />
        </div>
        <div>
          <span className="chat-tag-label">{props.name}</span>
        </div>
        <div>
          <span className="chat-tag-label">{props.lastMessage}</span>
        </div>
        <button onClick={clickDelete} type="button" class="btn btn-danger delete-b">X</button>
        <div className='pre-chat-con'>
          <span className="chat-tag-label" style={{ textAlign: "center" }}>{formattedDate}</span>
        </div>

      </li>
    );
  }

  else {
    return (
      <li onClick={props.onClick} onMouseEnter={props.in} onMouseLeave={props.out} className="chat-tag" id={id}>
        <div>
          <img src={props.img} className="rounded-circle chat-profile-pic" />
        </div>
        <div>
          <span className="chat-tag-label">{props.name}</span>
        </div>
        <button onClick={clickDelete} type="button" class="btn btn-danger delete-b">X</button>
        <div>
          <span className="chat-tag-label"></span>
        </div>
      </li>
    );
  }
}

export default ChatPreview;


