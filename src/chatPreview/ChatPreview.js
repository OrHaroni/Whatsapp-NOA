import '../noa.css';


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