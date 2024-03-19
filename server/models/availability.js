// models/availability.js
const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
    tutor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tutor',
        required: true
    },
    dayOfWeek: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
});

const Availability = mongoose.model('Availability', availabilitySchema);

module.exports = Availability;
