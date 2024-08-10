import express from 'express';
import { Student } from '../models/Student.js'; // Named import
import { Teacher } from '../models/Teacher.js'; // Named import
import validator from 'validator';

const router = express.Router();

// Get all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find().populate('teacherId', 'name'); // Populate teacher details
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students: ' + error.message });
    }
});

// Create a new student
router.post('/assign', async (req, res) => {
    const { studentId, teacherId } = req.body;
    try {
        // Validate studentId and teacherId
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(400).json({ message: 'Invalid student ID' });
        }
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            return res.status(400).json({ message: 'Invalid teacher ID' });
        }

        // Update student with the teacherId
        student.teacherId = teacherId;
        await student.save();

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a student by ID
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).populate('teacherId', 'name');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student: ' + error.message });
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
        // Validate teacherId
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

        res.json(student);
    } catch (error) {
        res.status(500).json({ message: 'Error updating student: ' + error.message });
    }
});

// Delete a student by ID
router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting student: ' + error.message });
    }
});

export default router;
