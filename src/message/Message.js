

  

  //Returning the HTML of a message.
  function Message(props) {

    //Checking who is the sender of this message
    if (props.sender == props.me) {
        return (
            <li  key={props.key}className="clearfix">
                <img src={props.img} className="rounded-circle profile-pic-in-div" />
                <div className="my-mess card text-white bg-primary mb-3 " style={{ maxWidth: '18rem', left: '10%' }}>
                    <div className="card-body">
                        <p className="card-text">{props.messageText}</p>
                        <small>{props.time}</small>
                    </div>
                </div>
            </li>
        );
    }
    else {
        return (
            <li key={props.key}>
                <img src={props.img} className="rounded-circle sender-pic-in-div" />
                <div className="friend-mes card text-white bg-secondary mb-3  " style={{ maxWidth: '18rem', float: 'right', right: '10%' }}>
                    <div className="card-body">
                        <h5 className="card-title">{props.sender}</h5>
                        <p className="card-text">{props.messageText}</p>
                        <small>{props.content}</small>
                    </div>
                </div>
            </li>
        )
    }
}
export default Message;