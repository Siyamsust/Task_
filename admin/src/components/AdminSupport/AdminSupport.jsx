import React, { useState, useEffect, useRef } from 'react';
import './AdminSupport.css';
import avatar from '../Assets/chat_avatar.png'; // Use a default avatar if needed
import { useAuth } from '../../context/AuthContext';

// Default admin ID (MongoDB ObjectId format)
const DEFAULT_ADMIN_ID = '65f1a2b3c4d5e6f7a8b9c0d1'; // Valid 24-character hex string

const AdminSupport = () => {
  const { user } = useAuth();
  const [userChats, setUserChats] = useState([]);
  const [companyChats, setCompanyChats] = useState([]);
  const [filter, setFilter] = useState('users'); // 'users' or 'companies'
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Fetch all aduse chats (user-admin)
    fetch(`http://localhost:4000/api/chat/get-all-admin-chats?query=aduse`)
      .then(res => res.json())
      .then(data => setUserChats(data));

    // Fetch all adcom chats (company-admin)
    fetch(`http://localhost:4000/api/chat/get-all-admin-chats?query=adcom`)
      .then(res => res.json())
      .then(data => setCompanyChats(data));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages]);

  const chatList = filter === 'users' ? userChats : companyChats;

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat) return;

    try {
      const authtoken = localStorage.getItem('token');
      const response = await fetch('http://localhost:4000/api/chat/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authtoken}`
        },
        body: JSON.stringify({
          chatId: activeChat._id,
          content: newMessage,
          userId: activeChat.userId || null,
          companyId: activeChat.companyId || null,
          companyName: activeChat.companyName || null,
          userName: activeChat.userName || null,
          chatType: filter === 'users' ? 'aduse' : 'adcom',
          senderId: user?.id || DEFAULT_ADMIN_ID // Use default admin ID if user.id is not available
        })
      });

      if (response.ok) {
        const updatedChat = await response.json();
        setActiveChat(prev => ({
          ...prev,
          messages: [...(prev.messages || []), updatedChat.messages[updatedChat.messages.length - 1]]
        }));
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="admin-support">
      <div className="support-container">
        {/* Sidebar */}
        <div className="chats-sidebar">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search conversations..."
              // Implement search if needed
              disabled
            />
          </div>

          <div className="filter-tabs">
            <button 
              className={`filter-btn ${filter === 'users' ? 'active' : ''}`}
              onClick={() => setFilter('users')}
            >
              Users
            </button>
            <button 
              className={`filter-btn ${filter === 'companies' ? 'active' : ''}`}
              onClick={() => setFilter('companies')}
            >
              Companies
            </button>
          </div>

          <div className="chat-list">
            {chatList.map(chat => (
              <div 
                key={chat._id}
                className={`chat-item ${activeChat?._id === chat._id ? 'active' : ''}`}
                onClick={() => setActiveChat(chat)}
              >
                <img src={chat.logo || avatar} alt={chat.userName || chat.companyName} className="chat-avatar" />
                <div className="chat-content">
                  <div className="chat-header">
                    <h4>{chat.userName || chat.companyName}</h4>
                    <span className="chat-time">{chat.lastMessageTime && new Date(chat.lastMessageTime).toLocaleTimeString()}</span>
                  </div>
                  <p className="chat-preview">{chat.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="chat-main">
          {activeChat ? (
            <>
              <div className="chat-header">
                <div className="chat-user-info">
                  <img src={activeChat.logo || avatar} alt={activeChat.userName || activeChat.companyName} className="chat-avatar" />
                  <div>
                    <h3>{activeChat.userName || activeChat.companyName}</h3>
                    <span className="status-indicator online">Online</span>
                  </div>
                </div>
                <div className="chat-actions">
                  <button className="action-btn">
                    <i className="fas fa-phone"></i>
                  </button>
                  <button className="action-btn">
                    <i className="fas fa-video"></i>
                  </button>
                  <button className="action-btn">
                    <i className="fas fa-info-circle"></i>
                  </button>
                </div>
              </div>

              <div className="chat-messages">
                {(activeChat.messages || []).map(message => (
                  <div 
                    key={message._id} 
                    className={`message ${message.senderId === DEFAULT_ADMIN_ID ? 'sent' : 'received'}`}
                  >
                    <div className="message-content">
                      <p>{message.content}</p>
                      <span className="message-time">{message.sentAt ? new Date(message.sentAt).toLocaleTimeString() : ''}</span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <form className="message-input" onSubmit={handleSendMessage}>
                <button type="button" className="attachment-btn">
                  <i className="fas fa-paperclip"></i>
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit" className="send-btn">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </>
          ) : (
            <div className="no-chat-selected">
              <h3>Select a conversation</h3>
              <p>Choose a conversation from the list to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSupport; 