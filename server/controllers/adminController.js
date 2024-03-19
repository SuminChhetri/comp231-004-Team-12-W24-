const Student = require('../models/student');
const Tutor = require('../models/tutor');
const College = require('../models/college');
const Booking = require('../models/booking');

exports.login = async (req, res) => {
    try {
        // Extract login credentials from request body
        const { email, password } = req.body;

        // Find the admin by email
        const admin = await Admin.findOne({ email });

        // Check if admin exists and password is correct
        if (!admin || admin.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Respond with success message and admin details
        res.status(200).json({ message: 'Login successful', admin });
    } catch (error) {
        // Handle errors
        console.error('Error logging in admin:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.addStudent = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, password, collegeId, profilePicture } = req.body;

        const student = new Student({
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            college: collegeId,
            profilePicture
        });

        await student.save();

        res.status(201).json({ message: 'Student added successfully', student });
    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.editStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const { firstName, lastName, email, phoneNumber, password, collegeId, profilePicture } = req.body;

        const student = await Student.findByIdAndUpdate(studentId, {
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            college: collegeId,
            profilePicture
        }, { new: true });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({ message: 'Student updated successfully', student });
    } catch (error) {
        console.error('Error editing student:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const { studentId } = req.params;

        const student = await Student.findByIdAndDelete(studentId);

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.addTutor = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, password, collegeId, languages, courses, profilePicture } = req.body;

        const tutor = new Tutor({
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            college: collegeId,
            languages,
            courses,
            profilePicture
        });

        await tutor.save();

        res.status(201).json({ message: 'Tutor added successfully', tutor });
    } catch (error) {
        console.error('Error adding tutor:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.editTutor = async (req, res) => {
    try {
        const { tutorId } = req.params;
        const { firstName, lastName, email, phoneNumber, password, collegeId, languages, courses, profilePicture } = req.body;

        const tutor = await Tutor.findByIdAndUpdate(tutorId, {
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            college: collegeId,
            languages,
            courses,
            profilePicture
        }, { new: true });

        if (!tutor) {
            return res.status(404).json({ message: 'Tutor not found' });
        }

        res.status(200).json({ message: 'Tutor updated successfully', tutor });
    } catch (error) {
        console.error('Error editing tutor:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteTutor = async (req, res) => {
    try {
        const { tutorId } = req.params;

        const tutor = await Tutor.findByIdAndDelete(tutorId);

        if (!tutor) {
            return res.status(404).json({ message: 'Tutor not found' });
        }

        res.status(200).json({ message: 'Tutor deleted successfully' });
    } catch (error) {
        console.error('Error deleting tutor:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.addCollege = async (req, res) => {
    try {
        const { name, location, email, phoneNumber, description, picture } = req.body;

        const college = new College({
            name,
            location,
            email,
            phoneNumber,
            description,
            picture
        });

        await college.save();

        res.status(201).json({ message: 'College added successfully', college });
    } catch (error) {
        console.error('Error adding college:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.editCollege = async (req, res) => {
    try {
        const { collegeId } = req.params;
        const { name, location, email, phoneNumber, description, picture } = req.body;

        const college = await College.findByIdAndUpdate(collegeId, {
            name,
            location,
            email,
            phoneNumber,
            description,
            picture
        }, { new: true });

        if (!college) {
            return res.status(404).json({ message: 'College not found' });
        }

        res.status(200).json({ message: 'College updated successfully', college });
    } catch (error) {
        console.error('Error editing college:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteCollege = async (req, res) => {
    try {
        const { collegeId } = req.params;

        const college = await College.findByIdAndDelete(collegeId);

        if (!college) {
            return res.status(404).json({ message: 'College not found' });
        }

        res.status(200).json({ message: 'College deleted successfully' });
    } catch (error) {
        console.error('Error deleting college:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    
};

exports.deleteBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;

        const booking = await Booking.findByIdAndDelete(bookingId);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

