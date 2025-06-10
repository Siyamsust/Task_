const mongoose = require('mongoose');
const notification=new mongoose.Schema({
    CompanyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
      },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
       
      }, 
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
       
    },
    bar:{
        content:string
    }





})
module.exports = mongoose.model('notification', Notification);