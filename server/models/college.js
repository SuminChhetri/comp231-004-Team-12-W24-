const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  collegeName: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  email: String,
  phoneNumber: String,
  description: String,
  picture: String
});

const College = mongoose.model('College', collegeSchema);

module.exports = College;
