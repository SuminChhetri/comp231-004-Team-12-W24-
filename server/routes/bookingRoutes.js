

const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { authenticateTutor } = require('../middlewares/authenticateJWT');
const { authenticateStudent } = require('../middlewares/authenticateJWT');


router.post('/book', authenticateStudent, bookingController.bookSession);
module.exports = router;
