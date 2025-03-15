const express = require('express');
const router = express.Router();
const { upload } = require('../index.js');
const tourController = require('../controllers/tour');
//router.post('/api/tours', upload.array('images'), tourController.createTour);
  // Update tour
//router.put('/api/tours/:id', upload.array('newImages'), tourController.updateTour);
router.get('/tours/approved', tourController.getApprovedTours);
router.get('/tours/filter', tourController.filterTours);
router.get('/pendingtours', tourController.getPendingTours);
router.get('/tours/:id', tourController.getTourById);
router.get('/tours', tourController.getTours);
router.delete('/tours/:id', tourController.deleteTour);
router.patch('/tours/:id/status', tourController.updateTourStatus);
module.exports = router;