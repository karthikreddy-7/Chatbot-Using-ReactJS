import React, { useState, useEffect, useRef } from "react";
import "./chatbot.css";
import axios from "axios";

function Chatbot() {
  // UseState for updating the Messages Array everytime a user or bot enters.
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);
  function handleInputChange(event) {
    setInputValue(event.target.value);
  }
  function handleFormSubmit(event) {
    event.preventDefault();
    const newMessages = [...messages];
    newMessages.push({ text: inputValue, user: true });
    setMessages(newMessages);
    setInputValue("");
    // For now, since the backend is not connected, just push a default message
    newMessages.push({ text: "Backend is not yet connected", user: false });
    setMessages(newMessages);
    // Uncomment this once the backend is connected
    /*
    axios.post('/api/chatbot', { message: inputValue })
      .then(response => {
        newMessages.push({ text: response.data.answer, user: false });
        setMessages(newMessages);
      })
      .catch(error => {
        console.error(error);
      });
    */
  }
  //handleclear function which deletes the entire messages and clears the chat
  function handleClear() {
    setMessages([]);
  }

  // useEffect to generate a starting text from the Bot
  useEffect(() => {
    setMessages([
      {
        text: "Hello! I'm chatbot here to help you with your Queries. What do you need help with today?",
        user: false,
      },
    ]);
  }, []);

  // UseEffect to automatically Scroll to the latest messages
  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatbot">
      <div className="chatbot-header">
        <div className="chatbot-avatar">
          <img src="/images/bot-avatar.png" alt="Chatbot Avatar" />
        </div>
        <div className="chatbot-name">Chatbot</div>
        <div className="chatbot-button">
          <button onClick={handleClear}>Clear</button>
        </div>
      </div>
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.user ? "user" : "bot"}`}
          >
            <p>
              {message.text}
              {message && (
                <small>
                  {new Date().toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </small>
              )}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="chatbot-form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chatbot;
