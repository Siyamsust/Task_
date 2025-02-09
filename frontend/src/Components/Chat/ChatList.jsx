import React from 'react';
import './ChatList.css';
import avatar from '../Assets/chat_avatar.png';
const ChatList = ({ chatType, selectedChat, setSelectedChat }) => {
  // Dummy data for chats
  const dummyChats = [
    {
      _id: '1',
      name: 'Alpine Adventures',
      avatar: 'https://placekitten.com/100/100',
      lastMessage: 'Thank you for your interest in our tour package!',
      lastMessageTime: new Date(),
      unreadCount: 2,
      online: true
    },
    {
      _id: '2',
      name: 'Seaside Tours',
      avatar: 'https://placekitten.com/101/101',
      lastMessage: 'The beach tour starts at 9 AM sharp.',
      lastMessageTime: new Date(),
      unreadCount: 0,
      online: false
    },
    {
      _id: '3',
      name: 'Mountain Expeditions',
      avatar: 'https://placekitten.com/102/102',
      lastMessage: 'Please confirm your booking details.',
      lastMessageTime: new Date(),
      unreadCount: 1,
      online: true
    }
  ];

  return (
    <div className="chat-list">
      <div className="chat-list-header">
        <h2>{chatType === 'companies' ? 'Tour Companies' : 'Admin Support'}</h2>
        {chatType === 'companies' && (
          <button className="new-chat-btn">
            <i className="fas fa-plus"></i>
          </button>
        )}
      </div>

      <div className="chats">
        {dummyChats.map(chat => (
          <div 
            key={chat._id}
            className={`chat-item ${selectedChat?._id === chat._id ? 'active' : ''}`}
            onClick={() => setSelectedChat(chat)}
          >
            <div className="chat-avatar">
              <img src={avatar} alt={chat.name} />
              <span className={`status ${chat.online ? 'online' : 'offline'}`}></span>
            </div>
            <div className="chat-info">
              <h3>{chat.name}</h3>
              <p>{chat.lastMessage}</p>
            </div>
            {chat.unreadCount > 0 && (
              <span className="unread-count">{chat.unreadCount}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList; 