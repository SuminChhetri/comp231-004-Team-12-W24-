const express = require('express');
const router = express.Router();
const availabilityController = require('../controllers/availabilityController');
const { authenticateTutor } = require('../middlewares/authenticateJWT');

// Update tutor's availability
router.put('/update', authenticateTutor, availabilityController.updateAvailability);

module.exports = router;

