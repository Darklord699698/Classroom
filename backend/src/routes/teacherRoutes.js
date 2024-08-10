import express from 'express';
import {
    getAllTeachers,
    createTeacher,
    updateTeacher,
    deleteTeacher
} from '../controllers/teacherController.js';

const router = express.Router();

// Get all teachers
router.get('/', getAllTeachers);

// Create a new teacher
router.post('/', createTeacher);

// Update a teacher by ID
router.put('/:id', updateTeacher);

// Delete a teacher by ID
router.delete('/:id', deleteTeacher);

export default router;