import React, { useState,useEffect } from 'react';
import ChatList from '../../Components/Chat/ChatList';
import ChatWindow from '../../Components/Chat/ChatWindow';
import {useAuth} from  '../../Context/AuthContext'
import './ChatPage.css';

const ChatPage = () => {
  const [chatType, setChatType] = useState('comuse'); // 'companies' or 'admin'
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats,setChats]=useState([]);
  const {user} = useAuth();
  console.log(user); 
  useEffect(() => {
    if (user) {
      console.log("Current logged in user:", user);
    }
  }, [user]);
  const userId = user?.user?._id;
  const username = user?.user?.name;
  console.log(userId," + ",username);
  let response,responseData;
  useEffect(()=>{
    const fetchChats=async()=>{

      try {
        console.log("useEffect triggered. Token:", user.token, "User ID:", userId);
        const authtoken=localStorage.getItem('token');
        console.log("token",authtoken);
        if(!authtoken){
          throw new Error('No token found');
        }
        console.log(authtoken)
         response=await fetch(`http://localhost:4000/api/chat/get-user-chat/${userId}?query=${'aduse'}`
, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authtoken}`
          },
      
        }
         )
        responseData=await response.json();
        console.log(responseData);
        if(!response.ok){
          throw new Error('Failed to fetch chats');
        }
        setChats(responseData || []);
      }
      catch(error){
        console.error('Error fetching chats:',error);
        setChats([]);
      }
                         
    }
    if (userId) {
      fetchChats();
    }
  },[userId]);
console.log("finally ok:  "+chats);
  // Admin chat data
  let adminChat;
  console.log(chats);
  if(chats.length>0)
  {
    
    adminChat=chats[0];
   console.log(adminChat);
  }
else
   {adminChat = {
    _id: null,
    messages:[],
    userId:userId,
    userName:username,
    chatType:'aduse',
    name: 'Admin Support',
    avatar: '/admin-avatar.png',
    online: true
  };
}

  return (
    <div className="chat-page">
      <div className="chat-type-selector">
        <button 
          className={`type-btn ${chatType === 'comuse' ? 'active' : ''}`}
          onClick={() => {
            setChatType('comuse');
            setSelectedChat(null);
          }}
        >
          Tour Companies
        </button>
        <button 
          className={`type-btn ${chatType === 'aduse' ? 'active' : ''}`}
          onClick={() => {
            setChatType('aduse');
            setSelectedChat(adminChat);
          }}
        >
          Admin Support
        </button>
      </div>

      <div className="chat-container">
        {chatType === 'comuse' ? (
          <>
            <div className={selectedChat ? 'chat-list-sidebar' : 'chat-list-full'}>
              <ChatList 
                chatType={chatType}
                selectedChat={selectedChat}
                setSelectedChat={setSelectedChat}
                userId={userId}
                username={username}
              />
            </div>
            {selectedChat && (
              <ChatWindow 
                chatType={chatType}
                selectedChat={selectedChat}
                userId={userId}
              />
            )}
          </>
        ) : (
          <div className="admin-chat-container">
            <ChatWindow 
              chatType={chatType}
              selectedChat={adminChat}
              userId={userId}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage; 