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
        const teacher = await Teacher.findById(teacherId);
        const classroom = await Classroom.findById(classroomId);

        if (!teacher || !classroom) {
            return res.status(404).json({ message: 'Teacher or Classroom not found' });
        }

        const existingAssignment = await Classroom.findOne({ teacher: teacherId });
        if (existingAssignment) {
            return res.status(400).json({ message: 'Teacher is already assigned to another classroom' });
        }

        classroom.teacher = teacherId;
        await classroom.save();

        teacher.classroom = classroomId;
        await teacher.save();

        const updatedClassroom = await Classroom.findById(classroomId).populate('teacher');

        res.status(200).json(updatedClassroom);
    } catch (error) {
        console.error('Error assigning teacher to classroom:', error);
        res.status(500).json({ message: 'Error assigning teacher to classroom', error: error.message });
    }
});

export default router;