const mongoose = require('mongoose');
const companySchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        unique: true,
    },
    email: {
     type: String,
     required: true,
     unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,

    },
    address: {
        type: String,
    },

    website: {
        type: String,
     },
     description: {
        type: String,
     },
     logo: {
        type: String,
     },
     isVerified: {
        type: Boolean,
        default: false,
     },
     verificationStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
     },
     verificationDocuments: {
        type: [String],
     },
     createdAt: {
        type: Date,
        default: Date.now,
     },
   resetToken:String,
  resetTokenExpiration :Date,
    
})
const Company = mongoose.model('Company', companySchema);
module.exports = Company;