const express = require('express');
const router = express.Router();
const tutorController = require('../controllers/tutorController');
const { authenticateTutor } = require('../middlewares/authenticateJWT');


//Import multer
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Set the directory where the files should be saved
  },
  filename: function (req, file, cb) {
    // Create a unique filename with the original name and the current date
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/register', upload.single('profilePicture'), tutorController.register);


router.post('/login', tutorController.login);
router.get('/logout', authenticateTutor, tutorController.logout);

router.get('/tutors', tutorController.getTutors);

router.get('/bookings', authenticateTutor, tutorController.getTutorBookings);

router.put('/profile', authenticateTutor, tutorController.editProfile);
router.get('/profile', authenticateTutor, tutorController.getProfile);

router.delete('/profile', authenticateTutor, tutorController.deleteProfile);
router.get('/bookings', authenticateTutor, tutorController.getTutorBookings);
router.get('/search', tutorController.searchTutors);

module.exports = router;
