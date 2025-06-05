const express = require('express');
const router = express.Router();
const Company = require('../models/company');
const authMiddleware = require('../middleware/authMiddleware');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new company
// Register User
router.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if user already exists
      let company = await Company.findOne({ email });
      if (company) {
        return res.status(400).json({ message: 'Company already exists' });
      }
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create new user
      company = new Company({
        name,
        email,
        password: hashedPassword
      });
  
      await company.save();
  
      // Create JWT token
      const token = jwt.sign(
        { companyId: company._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
  
      res.status(201).json({
        token,
        company: {
          _id: company._id,
          name: company.name,
          email: company.email
        }
      });
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Login User
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const company = await Company.findOne({ email });
      if (!company) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Verify password
      const isMatch = await bcrypt.compare(password, company.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Create JWT token
      const token = jwt.sign(
        { companyId: company._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
  
      res.json({
        token,
        company: {
          _id: company._id,
          name: company.name,
          email: company.email
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  router.put('/update', authMiddleware, async (req, res) => {
    try {
      const { name, email, phone } = req.body;
      const companyId = req.user.companyId; // From auth middleware
  
      // Find user and update
      let company = await Company.findById(companyId);
      if (!company) {
      return res.status(404).json({ message: 'Company not found' });
      }
  
      // Update fields if they are provided
      if (name) company.name = name;
      if (email) company.email = email;
      if (phone) company.phone = phone;
  
      await company.save();
  
      res.json({
        user: {
          _id: company._id,
          name: company.name,
          email: company.email,
          phone: company.phone
        }
      });
    } catch (error) {
      console.error('Update error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  router.get('/search', async (req, res) => {
    try {
      const { query } = req.query;
      
      if (!query) {
        return res.status(400).json({ message: 'Search query is required' });
      }

      // Create a case-insensitive regex pattern for the search
      const searchPattern = new RegExp(query, 'i');

      // Search in company name and description
      const companies = await Company.find({
        $or: [
          { name: searchPattern },
          { description: searchPattern }
        ],
        
      }).select('_id name description logo email phone website') // Select only necessary fields
        .limit(10); // Limit results to 10 companies

      res.json({
        success: true,
        companies: companies
      });
    } catch (error) {
      console.error('Search error:', error);
      res.status(500).json({ 
        success: false,
        message: 'Error searching companies' 
      });
    }
  });
  // Get all companies (for dashboard analytics)
  router.get('/companies', async (req, res) => {
    try {
      const companies = await Company.find();
      res.json({ success: true, companies });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch companies', error: error.message });
    }
  });
  module.exports = router; 
