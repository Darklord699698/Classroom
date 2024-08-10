import { Teacher } from '../models/Teacher.js';

// Fetch all teachers
export const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find().populate('classroom');
        res.status(200).json(teachers);
    } catch (error) {
        console.error('Error fetching teachers:', error);
        res.status(500).json({ message: 'Error fetching teachers', error: error.message });
    }
};

// Create a new teacher
export const createTeacher = async (req, res) => {
    try {
        const { name, email, classroom } = req.body;
        const newTeacher = new Teacher({ name, email, classroom });
        await newTeacher.save();
        res.status(201).json(newTeacher);
    } catch (error) {
        console.error('Error creating teacher:', error);
        res.status(500).json({ message: 'Error creating teacher', error: error.message });
    }
};

// Update a teacher by ID
export const updateTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const teacher = await Teacher.findByIdAndUpdate(id, updates, { new: true });
        if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
        res.status(200).json(teacher);
    } catch (error) {
        console.error('Error updating teacher:', error);
        res.status(500).json({ message: 'Error updating teacher', error: error.message });
    }
};

// Delete a teacher by ID
export const deleteTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const teacher = await Teacher.findByIdAndDelete(id);
        if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
        res.status(200).json({ message: 'Teacher deleted successfully' });
    } catch (error) {
        console.error('Error deleting teacher:', error);
        res.status(500).json({ message: 'Error deleting teacher', error: error.message });
    }
};
