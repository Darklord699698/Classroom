import express from 'express';
import { Classroom } from '../models/Classroom.js';
import { Teacher } from '../models/Teacher.js';

const router = express.Router();

// Fetch all classrooms, including teacher details
router.get('/', async (req, res) => {
    try {
        const classrooms = await Classroom.find().populate('teacher'); // Populate teacher field
        res.status(200).json(classrooms);
    } catch (error) {
        console.error('Error fetching classrooms:', error);
        res.status(500).json({ message: 'Error fetching classrooms', error: error.message });
    }
});
// Create a new classroom
router.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: 'Classroom name is required' });
        }

        const newClassroom = new Classroom({ name });
        await newClassroom.save();
        res.status(201).json(newClassroom);
    } catch (error) {
        console.error('Error creating classroom:', error);
        res.status(500).json({ message: 'Error creating classroom', error: error.message });
    }
});

// Assign a teacher to a classroom
router.post('/assign', async (req, res) => {
    const { teacherId, classroomId } = req.body;

    try {
        // Check if the teacher is already assigned to another classroom
        const existingAssignment = await Classroom.findOne({ teacher: teacherId });
        if (existingAssignment) {
            return res.status(400).json({ message: 'Teacher is already assigned to another classroom' });
        }

        // Proceed with assigning the teacher to the new classroom
        const classroom = await Classroom.findById(classroomId);
        classroom.teacher = teacherId;
        await classroom.save();

        res.status(200).json({ message: 'Teacher assigned to classroom successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;