import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Components/Chat/Chat';
import Game from './Components/Game/Game';

import React from 'react';

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);// emit event to the server and room refer to data parameter in server side.
      setShowChat(true);
    }
  }
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join the chat</h3>
          <input
            type="text"
            placeholder="Jessica..."
            onChange={(event) => {
              setUsername(event.target.value);
            }} />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join room</button>
        </div>
      )
        :
        (
          <div className='container'>
            <div className='chat'>
              <Chat socket={socket} username={username} room={room} />
            </div>
            <div>
              <Game socket={socket} username={username} room={room}></Game>
            </div>
          </div>
        )}
    </div>
  );
}

export default App;
