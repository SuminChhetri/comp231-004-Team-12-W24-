const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');
const { authenticateAdmin } = require('../middlewares/authenticateJWT.js');

router.post('/login', adminController.adminLogin);
router.post('/register', adminController.adminRegister);
