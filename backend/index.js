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

// Define Mongoose Schema
const tourSchema = new mongoose.Schema({
    name: String,
    itinerary: String,
    price: Number,
    availability: String,
    startDate: Date,
    endDate: Date,
    destinations: [
      {
        name: String,
        description: String,
      },
    ],
    images: [String],
    discount: String,
    category: [String],
});
const Tour = mongoose.model('Tour', tourSchema);

// Image upload configuration
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
const uploads = multer({ storage });

// Create a New Tour
app.post('/api/tours', uploads.array('images', 10), async (req, res) => {
    try {
        const {
            name,
            itinerary,
            price,
            availability,
            startDate,
            endDate,
            destinations,
            discount,
            category,
        } = req.body;

        const imagePaths = req.files.map((file) => file.path.replace('uploads/', ''));  // Strip 'upload/' for URL

        const newTour = new Tour({
            name,
            itinerary,
            price,
            availability,
            startDate,
            endDate,
            destinations: JSON.parse(destinations),
            images: imagePaths,
            discount,
            category: JSON.parse(category),
        });

        await newTour.save();
        res.status(201).json({ message: 'Tour created successfully', tour: newTour });
    } catch (error) {
        console.error('Error creating tour:', error);
        res.status(500).json({ error: 'Failed to create tour' });
    }
});

// Get All Tours
app.get('/api/tours', async (req, res) => {
    try {
        const tours = await Tour.find();
        res.status(200).json(tours);
    } catch (error) {
        console.error('Error fetching tours:', error);
        res.status(500).json({ error: 'Failed to fetch tours' });
    }
});
