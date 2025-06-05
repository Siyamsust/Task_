const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const http = require('http');
const socketIO = require('socket.io');
const chatRoutes = require('./routes/chatRoutes');
const authRoutes = require('./routes/authRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const errorHandler = require('./middleware/errorHandler');
const toursRoutes = require('./routes/tours');
const tourController = require('./controllers/tour');
const companyRoutes = require('./routes/company');
const reviewRoutes = require('./routes/reviewRoutes');
const weatherRoute = require('./routes/weatherRoutes'); 
//Admin Section
const adminAuthRoutes = require('./routes/adminauth');
// <-- register route



require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Define allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3003',
  'http://localhost:3004'
];

// Updated CORS configuration
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
}));

// Socket.IO configuration with CORS
const io = require('socket.io')(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
// Routes
app.use('/company/auth', companyRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/wishlist', wishlistRoutes);


app.use('/api/bookings', bookingRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/reviews', reviewRoutes);
// Socket.IO setup


// Add this test route at the top of your routes
app.get('/api/test', (req, res) => {
  console.log('Test route hit');
  res.json({ message: 'API is working' });
});

const PORT = process.env.PORT || 4000;



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
app.use('/api/bookings', bookingRoutes);
// Admin Routes
app.use('/api/admin', adminAuthRoutes);

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





app.use(errorHandler);
// ✅ Make sure this matches your filename

app.use(express.json());
app.use('/api', weatherRoute); // ✅ using a valid router
app.get('/', (req, res) => {
  res.send('Backend is running!');
});
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://kaoser614:0096892156428@cluster0.2awol.mongodb.net/")
  .then(result => {
    const server = http.createServer(app);
    const io = require('./socket').init(server);
    
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });


