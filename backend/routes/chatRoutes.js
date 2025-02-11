const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Define Chat Schema if not already defined
const Chat = mongoose.models.Chat || mongoose.model('Chat', new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  chatType: { type: String, enum: ['companies', 'users'], required: true },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', default: null },
  lastMessage: { type: String, default: '' },
  lastMessageTime: { type: Date, default: Date.now },
}, { timestamps: true }));

// Define Message Schema if not already defined
const Message = mongoose.models.Message || mongoose.model('Message', new mongoose.Schema({
  chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true }));

// Fetch chats by type
router.get('/:chatType', async (req, res) => {
  try {
    const { chatType } = req.params;
    const userId = req.user._id; // Assuming authentication middleware is used

    const chats = await Chat.find({
      participants: userId,
      chatType
    }).populate('participants', 'name avatar');

    res.json(chats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).json({ message: error.message, stack: error.stack });
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

// Send a message
router.post('/:chatId/messages', async (req, res) => {
  try {
    const { chatId } = req.params;
    const { senderId, content } = req.body;

    const message = await Message.create({ chatId, senderId, content });

    // Update last message in chat
    await Chat.findByIdAndUpdate(chatId, {
      lastMessage: content,
      lastMessageTime: Date.now()
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
