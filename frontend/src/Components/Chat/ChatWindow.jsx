import React, { useState, useEffect } from 'react';
import './ChatWindow.css';
import avatar from '../Assets/chat_avatar.png';
import { useAuth } from '../../Context/AuthContext';

const ChatWindow = ({ selectedChat, userId }) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  console.log(selectedChat);
  console.log(selectedChat.companyName+
    '  '+selectedChat.userName
  );

console.log(selectedChat.chatType);
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    try {
      const authtoken = localStorage.getItem('token');
      const response = await fetch('http://localhost:4000/api/chat/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authtoken}`
        },
        body: JSON.stringify({
          chatId: selectedChat._id,
          content: newMessage,
          userId:userId,
          chatType: selectedChat.chatType,
          companyId:selectedChat.companyId||null,
          companyName:selectedChat.companyName||null,
          userName:selectedChat.userName,
          senderId: userId
        })
      });

      if (response.ok) {
        const updatedChat = await response.json();
        setMessages(prevMessages => [...prevMessages, updatedChat.messages[updatedChat.messages.length - 1]]);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="chat-recipient">
          <img src={selectedChat?.logo || avatar} alt={selectedChat?.name} />
          <div>
            <h3>{selectedChat.companyName}</h3>
            <span className={`status ${selectedChat?.online ? 'online' : 'offline'}`}>
              {selectedChat?.online ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      </div>

      <div className="messages-container">
        {isLoading ? (
          <div className="loading">Loading messages...</div>
        ) : selectedChat.messages.length > 0 ? (
          selectedChat.messages.map((message) => (
            
            <div 
              key={message._id}
              className={`message ${message.senderId === userId ? 'sent' : 'received'}`}
            >
              <div className="message-content">
                {message.content}
              </div>
              <span className="message-time">
                {new Date(message.sentAt).toLocaleTimeString()}
              </span>
            </div>
          ))
        ) : (
          <div className="no-messages">No messages yet. Start the conversation!</div>
        )}
      </div>

      <form className="message-input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

export default ChatWindow; 