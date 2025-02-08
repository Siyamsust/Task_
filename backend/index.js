const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 4000;

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});

mongoose.connect("mongodb+srv://kaoser614:0096892156428@cluster0.2awol.mongodb.net/")

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve images from the 'upload/images' directory

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Update Tour Schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  packageType: {
    type: String,
    required: true,
    enum: ['Single', 'Group', 'Couple (Honeymoon)', 'Family', 'Organizational']
  },
  duration: {
    days: {
      type: Number,
      required: true
    },
    nights: {
      type: Number,
      required: true
    }
  },
  startDate: {
    type: Date,
    required: function() { return this.packageType === 'Group'; }
  },
  endDate: {
    type: Date,
    required: function() { return this.packageType === 'Group'; }
  },
  meals: {
    breakfast: {
      type: Boolean,
      default: false
    },
    lunch: {
      type: Boolean,
      default: false
    },
    dinner: {
      type: Boolean,
      default: false
    }
  },
  transportation: {
    type: {
      type: String,
      required: true
    },
    details: {
      type: String
    }
  },
  tourGuide: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number,
    required: true
  },
  maxGroupSize: {
    type: Number,
    required: function() { return this.packageType === 'Group'; }
  },
  availableSeats: {
    type: Number,
    required: function() { return this.packageType === 'Group'; }
  },
  destinations: [{
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    stayDuration: {
      type: String,
      required: true
    }
  }],
  images: [{
    type: String,  // This will store the image file paths
    required: true
  }],
  includes: [{
    type: String
  }],
  excludes: [{
    type: String
  }],
  specialNote: {
    type: String
  },
  cancellationPolicy: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Tour = mongoose.model('Tour', tourSchema);

// Create new tour API endpoint
app.post('/api/tours', upload.array('images'), async (req, res) => {
  try {
    // Process the uploaded data
    const tourData = {
      ...req.body,
      destinations: JSON.parse(req.body.destinations),
      meals: JSON.parse(req.body.meals),
      transportation: JSON.parse(req.body.transportation),
      includes: JSON.parse(req.body.includes),
      excludes: JSON.parse(req.body.excludes)
    };

    // Add image paths to the tour data
    if (req.files) {
      tourData.images = req.files.map(file => file.path);
    }

    // Convert string numbers to actual numbers
    tourData.price = Number(tourData.price);
    if (tourData.maxGroupSize) tourData.maxGroupSize = Number(tourData.maxGroupSize);
    if (tourData.availableSeats) tourData.availableSeats = Number(tourData.availableSeats);
    tourData.duration = {
      days: Number(tourData.duration.days),
      nights: Number(tourData.duration.nights)
    };

    // Create new tour
    const newTour = new Tour(tourData);
    await newTour.validate(); // Validate before saving
    const savedTour = await newTour.save();

    res.status(201).json({
      success: true,
      message: 'Tour created successfully',
      tour: savedTour
    });
  } catch (error) {
    console.error('Error creating tour:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to create tour'
    });
  }
});

// Get all tours
app.get('/api/tours', async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json({
      success: true,
      tours
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tours'
    });
  }
});

// Get single tour
app.get('/api/tours/:id', async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({
        success: false,
        error: 'Tour not found'
      });
    }
    res.json({
      success: true,
      tour
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch tour'
    });
  }
});
