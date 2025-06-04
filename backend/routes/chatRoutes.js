const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const ChatController =require('../controllers/chat')
const authMiddleware=require('../middleware/authMiddleware');

router.get('/get-chat/:companyId',ChatController.getChat);
router.get('/get-all-admin-chats',ChatController.getAdminchat)
router.get('/get-user-chat/:userId',ChatController.getuserChat);
router.post('/send-message',ChatController.usersendMessage);
router.get('/messages/:id',ChatController.fetchChat);
module.exports = router;
