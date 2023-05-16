import React, { useRef } from 'react';
import './Modal.css';
import '../noa.css';
import { AddChatPreview } from '../chat/chat.js';
import { isDisNameExist } from '../register/register';
import { sendSwal } from '../chat/chat';
import { userList } from '../database/Database';



function Modal({ setOpenModal, user }) {

    const ClickEnter = (event) => {
        if (event.key === 'Enter') {
            setOpenModal(false);
            AddChatPreview(user, modaltxt.current.value);
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
                    <span className="label-text">Contact's identifier:</span>
                    <input onKeyUp={ClickEnter} ref={modaltxt} type="Modal-txt" id="identifier" name="identifier"></input>

                </div>
                <div className="footer our-btn">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                            AddChatPreview(user, modaltxt.current.value);
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