import React, { useState } from 'react';
import ChatList from '../../Components/Chat/ChatList';
import ChatWindow from '../../Components/Chat/ChatWindow';
import './ChatPage.css';

const ChatPage = () => {
  const [chatType, setChatType] = useState('companies'); // 'companies' or 'admin'
  const [selectedChat, setSelectedChat] = useState(null);

  // Admin chat data
  const adminChat = {
    _id: 'admin',
    name: 'Admin Support',
    avatar: '/admin-avatar.png',
    online: true
  };

  return (
    <div className="chat-page">
      <div className="chat-type-selector">
        <button 
          className={`type-btn ${chatType === 'companies' ? 'active' : ''}`}
          onClick={() => {
            setChatType('companies');
            setSelectedChat(null);
          }}
        >
          Tour Companies
        </button>
        <button 
          className={`type-btn ${chatType === 'admin' ? 'active' : ''}`}
          onClick={() => {
            setChatType('admin');
            setSelectedChat(adminChat);
          }}
        >
          Admin Support
        </button>
      </div>

      <div className="chat-container">
        {chatType === 'companies' ? (
          <>
            <div className={selectedChat ? 'chat-list-sidebar' : 'chat-list-full'}>
              <ChatList 
                chatType={chatType}
                selectedChat={selectedChat}
                setSelectedChat={setSelectedChat}
              />
            </div>
            {selectedChat && (
              <ChatWindow 
                chatType={chatType}
                selectedChat={selectedChat}
              />
            )}
          </>
        ) : (
          <div className="admin-chat-container">
            <ChatWindow 
              chatType={chatType}
              selectedChat={adminChat}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage; 