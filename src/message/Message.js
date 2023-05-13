import { useState } from 'react';
import or_pic from '../pictures/or-haroni-profile.jpg';
import naor_pic from '../pictures/naor-nahman-profile.jpg';

  

  //Returning the HTML of a message.
function Message(props) {

    if (props.sender == "me") {
        return (
            <li id="first-message-example" className="clearfix">
                <img src={props.img} className="rounded-circle profile-pic-in-div" />
                <div className="card text-white bg-primary mb-3" style={{ maxWidth: '18rem', left: '10%' }}>
                    <div className="card-body">
                        <p className="card-text">{props.messageText}</p>
                    </div>
                </div>
            </li>
        );
    }
    else {
        return (
            <li>
                <img src={props.img} className="rounded-circle sender-pic-in-div" />
                <div className="card text-white bg-secondary mb-3" style={{ maxWidth: '18rem', float: 'right', right: '10%' }}>
                    <div className="card-body">
                        <h5 className="card-title">{props.sender}</h5>
                        <p className="card-text">{props.messageText}</p>
                    </div>
                </div>
            </li>
        )
    }
}
export default Message;