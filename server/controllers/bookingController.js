const Booking = require('../models/booking');

// Controller method to book a session
exports.bookSession = async (req, res) => {
  try {
    // Extract booking details from request body
    const { session, sessionDate, sessionLength } = req.body;
    const { student } = req;

    // Create a new booking instance
    const booking = new Booking({
      student: student._id,
      tutor: session.tutor,  // This line is causing the error
      session: session._id,
      sessionDate,
      sessionLength
    });

    // Save the booking to the database
    await booking.save();

    // Respond with success message and booking details
    res.status(201).json({ message: 'Session booked successfully', booking });
  } catch (error) {
    // Handle errors
    console.error('Error booking session:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

