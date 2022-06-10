import React, { useEffect, useState } from "react";
import "./Chat.css";
import ScrollToBottom from "react-scroll-to-bottom";

//helps in sending and receiving messages from socket io
//in parameters of functional component use name of the props not their value
function Chat({ socket, username, roomID }) {
  const [currentMessages, setCurrentMessages] = useState("");
  const [MessageList, setMessageList] = useState([]);

  const sendData = async () => {
    if (currentMessages !== "") {
      const data = {
        room: roomID,
        author: username,
        message: currentMessages,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("Message", data);
      setMessageList((List) => [...List, data]);
    }
  };

  useEffect(() => {
    socket.on("ReceiveData", (Data) => {
      console.log(Data);
      setMessageList((List) => [...List, Data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>Chat App</h2>
      </div>

      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {MessageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>

                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    {/* <p is="author">{messageContent.author}</p> */}
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="hey hi..."
          onChange={(event) => setCurrentMessages(event.target.value)}
          onKeyPress={(event) => {
            event.key === "Enter" && sendData();
          }}
        />
        <button onClick={sendData}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
