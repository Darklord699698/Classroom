import express from 'express';
import { Student } from '../models/Student.js'; // Named import
import { Teacher } from '../models/Teacher.js'; // Named import
import validator from 'validator';

const router = express.Router();

// Get all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find().populate('teacherId', 'name'); // Populate teacher details
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students', error: error.message });
    }
});

// Create a new student
router.post('/', async (req, res) => {
    const { name, email, teacherId, classroomId } = req.body;

    // Validate email format
    if (email && !validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
        // Validate teacherId if provided
        if (teacherId) {
            const teacher = await Teacher.findById(teacherId);
            if (!teacher) {
                return res.status(400).json({ message: 'Invalid teacher ID' });
            }
        }

        // Create a new student
        const newStudent = new Student({
            name,
            email,
            teacherId,
            classroomId // Assuming you also have classroomId in Student model
        });

        // Save the student to the database
        await newStudent.save();

        // Return the created student
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(500).json({ message: 'Error creating student', error: error.message });
    }
});

// Get a student by ID
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).populate('teacherId', 'name');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student', error: error.message });
    }
});

// Update a student by ID
router.put('/:id', async (req, res) => {
    const { name, email, teacherId } = req.body;

    // Validate email format
    if (email && !validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
        // Validate teacherId if provided
        if (teacherId) {
            const teacher = await Teacher.findById(teacherId);
            if (!teacher) {
                return res.status(400).json({ message: 'Invalid teacher ID' });
            }
        }

        const student = await Student.findByIdAndUpdate(
            req.params.id,
            { name, email, teacherId },
            { new: true }
        ).populate('teacherId', 'name');

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Error updating student', error: error.message });
    }
});

// Delete a student by ID
router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting student', error: error.message });
    }
});

// Assign student to a teacher
router.post('/assign', async (req, res) => {
    const { studentId, teacherId } = req.body;

    try {
        // Validate studentId
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(400).json({ message: 'Invalid student ID' });
        }

        // Validate teacherId
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            return res.status(400).json({ message: 'Invalid teacher ID' });
        }

        // Check if the teacher is already assigned to another student
        const existingStudent = await Student.findOne({ teacherId: teacherId });
        if (existingStudent) {
            return res.status(400).json({ message: 'Teacher is already assigned to another student' });
        }

        // Assign student to teacher
        student.teacherId = teacherId;
        await student.save();

        res.status(200).json({ message: 'Student assigned to teacher successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error assigning student', error: error.message });
    }
});

export default router;
