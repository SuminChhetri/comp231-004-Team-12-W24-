const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const College = require('../models/college');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Booking = require('../models/booking');
const Student = require('../models/student');
const Tutor = require('../models/tutor');

exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            throw new Error('Please provide both email and password');
        }

        // Find admin by email
        const admin = await Admin.findOne({ email });

        if (!admin) {
            throw new Error('Invalid email or password');
        }

        // Compare provided password with hashed password in the database
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            throw new Error('Invalid email or password');
        }

        // Generate JWT token
        const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET_KEY);

        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
exports.adminRegister = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            throw new Error('Please provide both email and password');
        }

        // Check if admin with the provided email already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            throw new Error('Admin with this email already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin with hashed password
        const newAdmin = new Admin({
            email,
            password: hashedPassword
        });

        // Save the admin to the database
        await newAdmin.save();

        res.status(201).json({ message: 'Admin registration successful' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
