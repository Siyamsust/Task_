import React, { useState, useEffect, useRef } from 'react';
import './AdminSupport.css';

const AdminSupport = () => {
  const [activeChat, setActiveChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [filter, setFilter] = useState('all');
  const messagesEndRef = useRef(null);
  
  // Sample data for support requests
  const [supportRequests, setSupportRequests] = useState([
    {
      id: 1,
      user: {
        id: 101,
        name: 'Rahul Ahmed',
        type: 'user',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        status: 'online'
      },
      lastMessage: 'I need help with my booking refund',
      timestamp: '10:30 AM',
      unread: true,
      priority: 'high',
      messages: [
        { id: 1, sender: 'user', text: 'Hello, I need help with my booking refund for Cox\'s Bazar tour.', time: '10:25 AM' },
        { id: 2, sender: 'user', text: 'I cancelled my booking 7 days before the tour but haven\'t received my refund yet.', time: '10:26 AM' },
        { id: 3, sender: 'user', text: 'The booking ID is #BK78945. Can you please help?', time: '10:30 AM' },
      ]
    },
    {
      id: 2,
      user: {
        id: 102,
        name: 'Travel Buddy Ltd',
        type: 'company',
        avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
        status: 'online'
      },
      lastMessage: 'We need approval for our new tour package',
      timestamp: '9:45 AM',
      unread: true,
      priority: 'medium',
      messages: [
        { id: 1, sender: 'user', text: 'Good morning, we\'ve submitted a new tour package for approval.', time: '9:40 AM' },
        { id: 2, sender: 'user', text: 'It\'s a 5-day Sundarbans tour with special wildlife photography sessions.', time: '9:42 AM' },
        { id: 3, sender: 'user', text: 'The package ID is #TP45678. Can you expedite the approval process?', time: '9:45 AM' },
      ]
    },
    {
      id: 3,
      user: {
        id: 103,
        name: 'Sabina Akter',
        type: 'user',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        status: 'offline'
      },
      lastMessage: 'Issue with payment gateway',
      timestamp: 'Yesterday',
      unread: false,
      priority: 'high',
      messages: [
        { id: 1, sender: 'user', text: 'Hi, I\'m having trouble with the payment gateway.', time: 'Yesterday, 3:15 PM' },
        { id: 2, sender: 'user', text: 'I tried to pay for my Sylhet tour but the transaction failed twice.', time: 'Yesterday, 3:17 PM' },
        { id: 3, sender: 'admin', text: 'Hello Sabina, I\'m sorry to hear about the payment issues. Can you please provide your booking reference number?', time: 'Yesterday, 3:25 PM' },
        { id: 4, sender: 'user', text: 'My booking reference is #BK34567', time: 'Yesterday, 3:30 PM' },
        { id: 5, sender: 'admin', text: 'Thank you. I can see that there was an issue with the payment gateway. Please try again now, we\'ve reset the payment status for your booking.', time: 'Yesterday, 3:40 PM' },
      ]
    }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: 'admin',
      text: newMessage,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    };

    setActiveChat(prev => ({
      ...prev,
      messages: [...prev.messages, newMsg]
    }));
    setNewMessage('');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages]);

  const filteredChats = supportRequests.filter(chat => {
    const matchesSearch = chat.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'users' && chat.user.type === 'user') ||
                         (filter === 'companies' && chat.user.type === 'company');
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="admin-support">
      <div className="support-container">
        {/* Sidebar */}
        <div className="chats-sidebar">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-tabs">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
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
            {filteredChats.map(chat => (
              <div 
                key={chat.id}
                className={`chat-item ${activeChat?.id === chat.id ? 'active' : ''}`}
                onClick={() => setActiveChat(chat)}
              >
                <img src={chat.user.avatar} alt={chat.user.name} className="chat-avatar" />
                <div className="chat-content">
                  <div className="chat-header">
                    <h4>{chat.user.name}</h4>
                    <span className="chat-time">{chat.timestamp}</span>
                  </div>
                  <p className="chat-preview">{chat.lastMessage}</p>
                  <div className="chat-meta">
                    <span className={`user-type-label ${chat.user.type}`}>
                      {chat.user.type === 'user' ? 'User' : 'Company'}
                    </span>
                    <span className={`priority-badge ${chat.priority}`}>
                      {chat.priority.charAt(0).toUpperCase() + chat.priority.slice(1)}
                    </span>
                  </div>
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
                  <img src={activeChat.user.avatar} alt={activeChat.user.name} className="chat-avatar" />
                  <div>
                    <h3>{activeChat.user.name}</h3>
                    <span className={`status-indicator ${activeChat.user.status}`}>
                      {activeChat.user.status}
                    </span>
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
                {activeChat.messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`message ${message.sender === 'admin' ? 'sent' : 'received'}`}
                  >
                    <div className="message-content">
                      <p>{message.text}</p>
                      <span className="message-time">{message.time}</span>
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