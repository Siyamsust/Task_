import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSocket } from './SocketContext';
import { useAuth } from './AuthContext';

const ChatContext = createContext();

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const socket = useSocket();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchChats('companies'); // Default to company chats
    }
  }, [user]);

  useEffect(() => {
    if (socket) {
      socket.on('new_message', handleNewMessage);
      socket.on('chat_created', handleNewChat);
    }

    return () => {
      if (socket) {
        socket.off('new_message');
        socket.off('chat_created');
      }
    };
  }, [socket]);

  const fetchChats = async (chatType) => {
    try {
      const response = await fetch(`http://localhost:4000/api/chats/${chatType}`);
      const data = await response.json();
      setChats(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching chats:', error);
      setLoading(false);
    }
  };

  const createChat = async (companyId) => {
    try {
      const response = await fetch('http://localhost:4000/api/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          companyId,
          chatType: 'companies'
        }),
      });
      const chat = await response.json();
      setChats(prev => [...prev, chat]);
      return chat;
    } catch (error) {
      console.error('Error creating chat:', error);
      throw error;
    }
  };

  const handleNewMessage = (message) => {
    setChats(prevChats => 
      prevChats.map(chat => 
        chat._id === message.chatId 
          ? {
              ...chat,
              lastMessage: message.content,
              lastMessageTime: message.createdAt,
              unreadCount: chat._id === activeChat?._id ? 0 : chat.unreadCount + 1
            }
          : chat
      )
    );
  };

  const handleNewChat = (chat) => {
    setChats(prev => [...prev, chat]);
  };

  const value = {
    chats,
    activeChat,
    setActiveChat,
    loading,
    createChat,
    fetchChats
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}; 