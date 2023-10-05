import React, { useEffect } from 'react'
import { useState } from 'react';
import ScrollToBottom from "react-scroll-to-bottom";
//icons
import {BsSend} from "react-icons/bs"
import { FaCarrot } from "react-icons/fa";
//css
import '../Chat/Chat.css'

function Chat({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {// make this func to be async because we actually wait for the func to be sent.
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };
            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    }
    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log("receive data",data);
            setMessageList((list) => [...list, data]);
        })
    })
    return (
        
        <div className='chat-window'>
            <div className='chat-header'>
                <FaCarrot className='carrot'/>
                <p>Chat</p>
            </div>
            <div className='chat-body'>
                <ScrollToBottom className='message-container'>
                    {messageList.map((messageContent) => {
                        return (
                            <div className='message' 
                            id={username === messageContent.author ? "you" : "other"}>
                                <div>
                                    <div className='message-content'>
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className='message-meta'>
                                        <p id='time'>{messageContent.time}</p>
                                        <p id='author'>{messageContent.author}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    {/* <FaLongArrowAltDown/> */}
                </ScrollToBottom>
            </div>
            <div className='chat-footer'>
                <input
                    type="text"
                    value={currentMessage}
                    placeholder="Hi..."
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => { event.key === "Enter" && sendMessage(); }}
                />
                
                <button onClick={sendMessage}><BsSend/></button>
            </div>
        </div>
    )
}

export default Chat