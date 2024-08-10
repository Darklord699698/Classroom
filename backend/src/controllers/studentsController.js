import { Student } from '../models/Student.js';

export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().populate('classroom');
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students', error });
    }
};
