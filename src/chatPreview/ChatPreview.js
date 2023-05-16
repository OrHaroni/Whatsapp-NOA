import '../noa.css';


//Returning the HTML code of a Chat Preview
function ChatPreview(props) {
  const id = "chat-" + props.id;
  
  if (props.messageList.length === 0) {
    return (
      <li onClick={props.onClick} onMouseEnter={props.in} onMouseLeave={props.out} className="chat-tag" id={id}>
        <div>
          <img src={props.img} className="rounded-circle chat-profile-pic" />
        </div>
        <div>
          <span className="chat-tag-label">{props.name}</span>
        </div>
      </li>
    )


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
    )

  }

}

export default ChatPreview;