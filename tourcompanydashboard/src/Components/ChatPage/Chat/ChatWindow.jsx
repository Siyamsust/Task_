import React, { useState, useEffect } from 'react';
import './ChatWindow.css';
import avatar from '../../Assets/chat_avatar.png';
import { useAuth } from '../../../Context/AuthContext';

const ChatWindow = ({ selectedChat, companyId,chatType,username ,socket}) => {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log(selectedChat);

console.log(selectedChat.chatType);
useEffect(() => {
  if (socket) {
    console.log('Socket connected in ChatWindow');
    socket.on('posts', (data) => {
      console.log('Received socket event in ChatWindow:', data);
      if (data.action === 'create' && data.updatedChat) {
        // For company-user chat
        if (chatType === 'comuse' && data.updatedChat.companyId === companyId) {
          console.log('Updating company-user chat messages:', data.updatedChat.messages);
          setMessages(data.updatedChat.messages);
        }
        // For admin-company chat
        else if (chatType === 'adcom' && data.updatedChat.chatType === 'adcom' && 
                data.updatedChat.companyId === companyId) {
          console.log('Updating admin-company chat messages:', data.updatedChat.messages);
          setMessages(data.updatedChat.messages);
        }
      }
    });
  }
  console.log(messages);

  // Cleanup socket listener on component unmount
  return () => {
    if (socket) {
      console.log('Cleaning up socket listener in ChatWindow');
      socket.off('posts');
    }
  };
}, [socket, selectedChat?._id, chatType]);
useEffect(() => {
  if (selectedChat?.messages) {
    setMessages(selectedChat.messages);
  }
}, [selectedChat]);

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
          userId:selectedChat.userId,
          adminId:selectedChat.adminId,
         companyName:selectedChat.companyName,
         userName:selectedChat.userName||null,
          chatType: chatType,
          companyId:selectedChat.companyId||null,
          senderId: companyId,
        })
      });

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
            <h3>{selectedChat?.userName}</h3>
            <span className={`status ${selectedChat?.online ? 'online' : 'offline'}`}>
              {selectedChat?.online ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      </div>

      <div className="messages-container">
        {isLoading ? (
          <div className="loading">Loading messages...</div>
        ) : messages.length > 0 ? (
          messages.map((message) => (
            
            <div 
              key={message._id}
              className={`message ${message.senderId === companyId ? 'sent' : 'received'}`}
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