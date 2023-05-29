import React, { useRef } from 'react';
import './Modal.css';
import '../noa.css';
import { sendSwal } from '../chat/chat';
import { addChat } from '../serverCalls/chat';
import { AddChatPreview } from '../chat/chat.js';




function Modal({ setOpenModal, token, func }) {

    

    const ClickEnter = async (event) => {
        if (event.key === 'Enter') {
            setOpenModal(false);
            var txt = modaltxt.current.value;
            //Adding the user to the server
            var [returnVal, status] = await addChat({"token" : token, "username": txt});
            console.log(status);
            if(status === 200){
                AddChatPreview(returnVal, func);
            }
        }
    }

    const modaltxt = useRef();
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                    >
                        X
                    </button>
                </div>
                <div className="title">
                    <h1>Add new contact</h1>
                </div>
                <div className="body">

                    <span className="label-text">Contact's name: </span>
                    <input onKeyUp={ClickEnter} ref={modaltxt} type="Modal-txt" id="identifier" name="identifier"></input>

                </div>
                <div className="footer our-btn">
                    <button
                        onClick={async () => {
                            setOpenModal(false);
                            var txt = modaltxt.current.value;
                            var returnVal = await addChat({"token" : token, "username": txt});
                            AddChatPreview(returnVal, func);
                        }}
                        id="Modal-btn"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Modal;