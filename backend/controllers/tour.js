const Tour = require('../models/tours');

const fs = require('fs');
exports.createTour=async (req, res) => {
    try {
      // Process the uploaded data
      let tourData = {
        ...req.body,
        destinations: JSON.parse(req.body.destinations),
        meals: JSON.parse(req.body.meals),
        transportation: JSON.parse(req.body.transportation),
        includes: JSON.parse(req.body.includes),
        excludes: JSON.parse(req.body.excludes)
      };
  
      // Process packageCategories
      if (req.body.packageCategories) {
        // If it's a string, parse it
        if (typeof req.body.packageCategories === 'string') {
          try {
            tourData.packageCategories = JSON.parse(req.body.packageCategories);
          } catch (e) {
            // If it's a comma-separated string, split it
            tourData.packageCategories = req.body.packageCategories
              .split(',')
              .map(cat => cat.trim().toLowerCase()); // Normalize categories
          }
        }
        // Ensure it's an array
        if (!Array.isArray(tourData.packageCategories)) {
          tourData.packageCategories = [tourData.packageCategories];
        }
      }
  
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
  
      // Parse tourType if it exists
      if (req.body.tourType) {
        tourData.tourType = JSON.parse(req.body.tourType);
      }
  
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
  };
  
  // Get all tours
  exports.getTours = async (req, res) => {
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
  };
  
  // Get single tour
  exports.getTourById = async (req, res) => {
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
  };
  
  // Delete tour
  exports.deleteTour = async (req, res) => {
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
  };
  
  // Update tour status
  exports.updateTourStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Validate status
      if (!['approved', 'rejected', 'pending'].includes(status)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid status value'
        });
      }

      const tour = await Tour.findByIdAndUpdate(
        id,
        { status },
        { new: true, runValidators: true }
      );

      if (!tour) {
        return res.status(404).json({
          success: false,
          error: 'Tour not found'
        });
      }

      res.json({
        success: true,
        message: `Tour status updated to ${status}`,
        tour
      });

    } catch (error) {
      console.error('Error updating tour status:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update tour status'
      });
    }
  };
  exports.updateTour = async (req, res) => {
    try {
      const tourId = req.params.id;
      const tourData = { ...req.body };

      // Parse duration properly
      if (typeof req.body.duration === 'string') {
        tourData.duration = JSON.parse(req.body.duration);
      }
      
      // Ensure duration values are numbers
      tourData.duration = {
        days: Number(tourData.duration.days) || 0,
        nights: Number(tourData.duration.nights) || 0
      };

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
      tourData.status='draft';
  
      // Convert string numbers to actual numbers
      tourData.price = Number(tourData.price);
      if (tourData.maxGroupSize) tourData.maxGroupSize = Number(tourData.maxGroupSize);
      if (tourData.availableSeats) tourData.availableSeats = Number(tourData.availableSeats);
  
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
  };
  exports.getTours = async (req, res) => {
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
};
exports.deleteTour =  async (req, res) => {
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
  };
  exports.filterTours = async (req, res) => {
    try {
      const { category, tourType } = req.query;
      console.log('Received filter request:', { category, tourType });
  
      let query = {};
  
      // Handle category filtering
      if (category && category !== 'all') {
        if (category === 'custom') {
          query.customCategory = { $exists: true, $ne: '' };
        } else {
          // Use case-insensitive regex for better matching
          query.packageCategories = {
            $regex: new RegExp(category, 'i')
          };
        }
      }
  
      // Handle tour type filtering
      if (tourType && tourType !== 'all') {
        query[`tourType.${tourType}`] = true;
      }
  
      console.log('MongoDB query:', query);
  
      const tours = await Tour.find(query).sort({ createdAt: -1 });
      
      res.json({
        success: true,
        tours,
        count: tours.length
      });
  
    } catch (error) {
      console.error('Filter endpoint error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch filtered tours',
        details: error.message
      });
    }
  };
exports.getPendingTours = async (req, res) => {
    const tours = await Tour.find({ status: 'pending' });
    res.json({
      tours
    });
  };
