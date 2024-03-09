const express = require('express');
const connectDB = require('./config/database');
const path = require('path');

const app = express();
require('dotenv').config();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index');
});

// Define port
const PORT = process.env.PORT || 5000;
console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}: http://localhost:${PORT}`));
