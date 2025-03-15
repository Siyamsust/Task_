// Update Tour Schema
const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    packageCategories: [{
      type: String,
      required: true,
      set: value => value.replace(/["']/g, '') // Remove quotes when saving
    }],
    customCategory: {
      type: String
    },
    tourType: {
      single: {
        type: Boolean,
        default: false
      },
      group: {
        type: Boolean,
        default: false
      }
    },
    duration: {
      days: {
        type: Number,
        required: true,
        min: 1,
        
      },
      nights: {
        type: Number,
        required: true,
        min: 0,
       
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
      enum: ['draft', 'pending', 'approved','rejected'],
      default: 'draft'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;