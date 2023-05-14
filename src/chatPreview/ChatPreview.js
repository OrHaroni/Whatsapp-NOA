import '../noa.css';


//Returning the HTML code of a Chat Preview
function ChatPreview(props) {
  //Getting the current date, hour and minute
  const now = new Date();
  const currentDate = now.toLocaleDateString('en-GB');
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const id = "chat-" + props.id;

    return(
        <li onClick={props.onClick} onMouseEnter={props.in} onMouseLeave={props.out} className="chat-tag" id={id}>
            <div>
              <img src={props.img} className="rounded-circle chat-profile-pic" />
                </div>
                <div>
                  <span className="chat-tag-label">{props.name}</span>
                </div>
                <div>
                  <span className="chat-tag-label">{currentDate}, {currentHour}:{currentMinute}</span>
                </div>
              </li>
    );
}

export default ChatPreview;