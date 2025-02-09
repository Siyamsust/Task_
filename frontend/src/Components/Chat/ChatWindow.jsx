import React, { useState } from 'react';
import './ChatWindow.css';
import avatar from '../Assets/chat_avatar.png';
const ChatWindow = ({ selectedChat }) => {
  const [newMessage, setNewMessage] = useState('');

  // Dummy messages data
  const dummyMessages = [
    {
      _id: '1',
      content: 'Hello! How can I help you today?',
      createdAt: new Date(Date.now() - 3600000),
      isSender: false
    },
    {
      _id: '2',
      content: 'I\'m interested in the Mountain Trek package.',
      createdAt: new Date(Date.now() - 3000000),
      isSender: true
    },
    {
      _id: '3',
      content: 'Great choice! The Mountain Trek is one of our most popular packages. Would you like to know more about the itinerary?',
      createdAt: new Date(Date.now() - 2400000),
      isSender: false
    },
    {
      _id: '4',
      content: 'Yes, please! I\'d especially like to know about the difficulty level and what equipment is provided.',
      createdAt: new Date(Date.now() - 1800000),
      isSender: true
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    // Here you would normally send the message
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="chat-recipient">
          <img src={avatar} alt={selectedChat.name} />
          <div>
            <h3>{selectedChat.name}</h3>
            <span className={`status ${selectedChat.online ? 'online' : 'offline'}`}>
              {selectedChat.online ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      </div>

      <div className="messages-container">
        {dummyMessages.map((message) => (
          <div 
            key={message._id}
            className={`message ${message.isSender ? 'sent' : 'received'}`}
          >
            <div className="message-content">
              {message.content}
            </div>
            <span className="message-time">
              {message.createdAt.toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>

      <form className="message-input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

export default ChatWindow; 