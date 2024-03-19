const Tutor = require('../models/tutor');
const Availability = require('../models/availability');

// Update tutor's availability
exports.updateAvailability = async (req, res) => {
    try {
        const { tutorId, dayOfWeek, startTime, endTime } = req.body;

        // Find the tutor by ID
        const tutor = await Tutor.findById(tutorId);

        // Check if tutor exists
        if (!tutor) {
            return res.status(404).json({ message: 'Tutor not found' });
        }

        // Create a new availability instance
        const availability = new Availability({
            tutor: tutorId,
            dayOfWeek,
            startTime,
            endTime
        });

        // Save the availability to the database
        await availability.save();

        // Respond with success message
        res.status(200).json({ message: 'Availability updated successfully', availability });
    } catch (error) {
        // Handle errors
        console.error('Error updating availability:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
