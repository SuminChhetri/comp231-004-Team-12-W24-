const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');
const { authenticateAdmin } = require('../middlewares/authenticateJWT.js');

// Admin login route
router.post('/login', adminController.login);

// Admin can add student
router.post('/student/add', authenticateAdmin, adminController.addStudent);

// Admin can edit student
router.put('/student/:studentId/edit',authenticateAdmin, adminController.editStudent);

// Admin can delete student
router.delete('/student/:studentId/delete', authenticateAdmin, adminController.deleteStudent);

// Admin can add tutor
router.post('/tutor/add', authenticateAdmin, adminController.addTutor);

// Admin can edit tutor
router.put('/tutor/:tutorId/edit',authenticateAdmin, adminController.editTutor);

// Admin can delete tutor
router.delete('/tutor/:tutorId/delete', authenticateAdmin, adminController.deleteTutor);

// Admin can add college
router.post('/college/add', authenticateAdmin, adminController.addCollege);

// Admin can edit college
router.put('/college/:collegeId/edit', authenticateAdmin, adminController.editCollege);

// Admin can delete college
router.delete('/college/:collegeId/delete', authenticateAdmin, adminController.deleteCollege);

// Admin can delete bookings
router.delete('/booking/:bookingId/delete',authenticateAdmin, adminController.deleteBooking);

module.exports = router;
