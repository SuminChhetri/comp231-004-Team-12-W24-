const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://sghartic:sumingc@etutor.564tdky.mongodb.net/?retryWrites=true&w=majority&appName=eTutor';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); 
  }
};

module.exports = connectDB;
