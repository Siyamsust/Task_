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
const authRoutes = require('./routes/authRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const errorHandler = require('./middleware/errorHandler');
const toursRoutes = require('./routes/tours');
const tourController = require('./controllers/tour');
const reviewRoutes = require('./routes/reviewRoutes');
const companyRoutes = require('./routes/companyRoutes');
const adminAuth = require('./middleware/adminAuth');

//Admin Section
const adminAuthRoutes = require('./routes/adminauth');
// <-- register route



require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
// Routes
app.use('/company/auth', companyRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/wishlist', wishlistRoutes);

app.use('/api/bookings', bookingRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/reviews', reviewRoutes);
// Socket.IO setup
const io = socketIO(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],  // Allow both origins
    methods: ["GET", "POST"]
  }
});

// Add this test route at the top of your routes
app.get('/api/test', (req, res) => {
  console.log('Test route hit');
  res.json({ message: 'API is working' });
});

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://kaoser614:0096892156428@cluster0.2awol.mongodb.net/")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

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

exports.upload = upload;
app.post('/api/tours', upload.array('images'), tourController.createTour);
  // Update tour
app.put('/api/tours/:id', upload.array('newImages'), tourController.updateTour);
app.use('/api', toursRoutes);
app.use('/api', require('./routes/weatherRoutes'));

// Admin Routes
app.use('/api/admin', adminAuthRoutes);
app.use('/api/admin', adminAuth, adminAuthRoutes);

// Get all tours

// Get single tour


// Delete tour

// Update tour status


// Update tour

// Update the filter endpoint
// app.get('/api/tours/filter', async (req, res) => {
//   try {
//     const { category, tourType } = req.query;
//     console.log('Received filter request:', { category, tourType }); // Debug log

//     let query = {};

//     if (category && category !== 'all') {
//       if (category === 'custom') {
//         query.customCategory = { $exists: true, $ne: '' };
//       } else {
//         query.packageCategories = category;
//       }
//     }

//     if (tourType && tourType !== 'all') {
//       query[`tourType.${tourType}`] = true;
//     }

//     console.log('MongoDB query:', query); // Debug log

//     const tours = await Tour.find(query).sort({ createdAt: -1 });
//     console.log('Found tours:', tours.length); // Debug log

//     res.json({
//       success: true,
//       tours
//     });
//   } catch (error) {
//     console.error('Filter endpoint error:', error);
//     res.status(500).json({
//       success: false,
//       error: 'Failed to fetch filtered tours',
//       details: error.message
//     });
//   }
// });
app.patch('/api/tours/:id/increment-view', tourController.incrementViewCount);
app.patch('/api/tours/:id/increment-booking', tourController.incrementBookingCount);
app.patch('/api/tours/:id/book-seats', tourController.bookSeats);

// Get seat availability
app.get('/api/tours/:id/seat-availability', tourController.getSeatAvailability);

// Release seats (for cancellations)
app.patch('/api/tours/:id/release-seats', tourController.releaseSeats);





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

// Add error handler
app.use(errorHandler);

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const weatherRoute = require('./routes/weatherRoutes'); // ✅ Make sure this matches your filename

app.use('/api', weatherRoute); // ✅ using a valid router

// Routes
const placeRoutes = require('./routes/placeRoutes');
app.use('/api', placeRoutes);


app.get('/', (req, res) => {
  res.send('Backend is running!');
});

