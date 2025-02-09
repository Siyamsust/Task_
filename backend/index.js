const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const http = require('http');
const socketIO = require('socket.io');
const Message = require('./models/Message');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
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
      required: true,
      min: 1,
      validate: {
        validator: Number.isInteger,
        message: 'Days must be a whole number'
      }
    },
    nights: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: 'Nights must be a whole number'
      }
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
  status: {
    type: String,
    enum: ['draft', 'pending', 'approved'],
    default: 'draft'
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

    // Parse duration values properly
    const duration = JSON.parse(req.body.duration);
    tourData.duration = {
      days: parseInt(duration.days) || 0,
      nights: parseInt(duration.nights) || 0
    };

    // Convert other string numbers to actual numbers
    tourData.price = Number(tourData.price) || 0;
    if (tourData.maxGroupSize) tourData.maxGroupSize = parseInt(tourData.maxGroupSize) || 0;
    if (tourData.availableSeats) tourData.availableSeats = parseInt(tourData.availableSeats) || 0;

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

// Delete tour
app.delete('/api/tours/:id', async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({
        success: false,
        error: 'Tour not found'
      });
    }

    // Delete associated images
    tour.images.forEach(imagePath => {
      try {
        fs.unlinkSync(imagePath);
      } catch (err) {
        console.error('Error deleting image:', err);
      }
    });

    await Tour.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: 'Tour deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete tour'
    });
  }
});

// Update tour status
app.patch('/api/tours/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const tour = await Tour.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

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
      error: 'Failed to update tour status'
    });
  }
});

// Update tour
app.put('/api/tours/:id', upload.array('newImages'), async (req, res) => {
  try {
    const tourId = req.params.id;
    const tourData = { ...req.body };
    
    // Handle existing and new images
    const existingImages = JSON.parse(req.body.existingImages || '[]');
    const newImagePaths = req.files ? req.files.map(file => file.path) : [];
    tourData.images = [...existingImages, ...newImagePaths];

    // Parse JSON strings back to objects
    tourData.destinations = JSON.parse(req.body.destinations);
    tourData.meals = JSON.parse(req.body.meals);
    tourData.transportation = JSON.parse(req.body.transportation);
    tourData.includes = JSON.parse(req.body.includes);
    tourData.excludes = JSON.parse(req.body.excludes);

    // Convert string numbers to actual numbers
    tourData.price = Number(tourData.price);
    if (tourData.maxGroupSize) tourData.maxGroupSize = Number(tourData.maxGroupSize);
    if (tourData.availableSeats) tourData.availableSeats = Number(tourData.availableSeats);
    tourData.duration = {
      days: Number(tourData.duration.days),
      nights: Number(tourData.duration.nights)
    };

    // Remove fields that shouldn't be updated directly
    delete tourData.existingImages;
    delete tourData.newImages;

    const updatedTour = await Tour.findByIdAndUpdate(
      tourId,
      tourData,
      { new: true, runValidators: true }
    );

    if (!updatedTour) {
      return res.status(404).json({
        success: false,
        error: 'Tour not found'
      });
    }

    res.json({
      success: true,
      message: 'Tour updated successfully',
      tour: updatedTour
    });
  } catch (error) {
    console.error('Error updating tour:', error);
    res.status(400).json({
      success: false,
      error: error.message || 'Failed to update tour'
    });
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId;
  
  socket.join(userId);
  
  socket.on('send_message', async (data) => {
    try {
      const { chatId, content, recipientId } = data;
      
      // Save message to database
      const message = await Message.create({
        chatId,
        senderId: userId,
        content
      });

      // Emit to recipient
      io.to(recipientId).emit('receive_message', message);
      
      // Emit to sender
      socket.emit('receive_message', message);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', userId);
  });
});

app.use('/api/chats', chatRoutes);
