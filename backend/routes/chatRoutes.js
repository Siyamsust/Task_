const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const Message = require('../models/Message');

// Get all chats for a user
router.get('/:chatType', async (req, res) => {
  try {
    const { chatType } = req.params;
    const userId = req.user._id; // Assuming you have authentication middleware

    const chats = await Chat.find({
      participants: userId,
      chatType
    }).populate('participants', 'name avatar');

    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get chat messages
router.get('/:chatId/messages', async (req, res) => {
  try {
    const messages = await Message.find({
      chatId: req.params.chatId
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new chat
router.post('/', async (req, res) => {
  try {
    const { userId, companyId, chatType } = req.body;
    
    // Check if chat already exists
    let chat = await Chat.findOne({
      participants: { $all: [userId, companyId] },
      chatType
    });

    if (!chat) {
      chat = await Chat.create({
        participants: [userId, companyId],
        chatType,
        companyId: chatType === 'companies' ? companyId : null
      });
    }

    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 