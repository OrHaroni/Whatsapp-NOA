
import '../noa.css';


//Returning the HTML code of a Chat Preview
function ChatPreview(props) {
  const id = "chat-" + props.id;
  console.log(props.messageList);
  if (props.lastMessage) {
    var datetimeString = props.lastMessage.created;
    var dateObj = new Date(datetimeString);
    var hour = dateObj.getHours();
    var minutes = dateObj.getMinutes();
    var day = dateObj.getDate();
    var month = dateObj.getMonth() + 1; // Adding 1 because months are zero-based
    // Pad day and month with leading zeros if necessary
    var paddedDay = day < 10 ? "0" + day : day;
    var paddedMonth = month < 10 ? "0" + month : month;

    var dateString = paddedDay + "/" + paddedMonth;

    return (
      <li onClick={props.onClick} onMouseEnter={props.in} onMouseLeave={props.out} className="chat-tag" id={id}>
        <div>
          <img src={props.img} className="rounded-circle chat-profile-pic" />
        </div>
        <div>
          <span className="chat-tag-label">{props.name}</span>
        </div>
        <div>
          <span className="chat-tag-label">{hour}:{minutes}, {dateString}</span>
        </div>
        <div className='pre-chat-con'>
          <span className="chat-tag-label" style={{ textAlign: "center" }}>{props.lastMessage.content}</span>
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
        <div>
          <span className="chat-tag-label"></span>
        </div>
      </li>
    );
  }
}

export default ChatPreview;