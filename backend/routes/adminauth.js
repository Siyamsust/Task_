// routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin'); // Adjust the path as necessary

const router = express.Router();

// Sign Up Endpoint
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newAdmin = new Admin({ email, password: hashedPassword });
    try {
        await newAdmin.save();
        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        res.status(400).json({ error: 'Error creating admin' });
    }
});

// Login Endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    
    if (admin && (await bcrypt.compare(password, admin.password))) {
        const token = jwt.sign({ id: admin._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token, user: { id: admin._id, email: admin.email } });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

module.exports = router;