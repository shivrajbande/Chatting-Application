import React from "react";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

export default function App() {
  const [name, setName] = useState("Shiraj");
  const [room, setRoom] = useState("123");
  const [show, setShow] = useState(false);

  const joinRoom = () => {
    if (name !== "" && room !== "") {
      socket.emit("join_Room", room);
      setShow(true);
    }
  };
  return (
    <div className="App">
      <h3>Join chat</h3>
      {!show ? (
        <div>
          <input
            type="text"
            placeholder="keshav"
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="text"
            placeholder="Room-Id"
            onChange={(event) => setRoom(event.target.value)}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={name} roomID={room} />
      )
    } 
    </div>
  );
}
