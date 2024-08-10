import express from 'express';
import { Classroom } from '../models/Classroom.js';

const router = express.Router();

// Fetch all classrooms
router.get('/', async (req, res) => {
    try {
        const classrooms = await Classroom.find();
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

export default router;
