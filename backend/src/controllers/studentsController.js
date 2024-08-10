import { Student } from '../models/Student.js';
import { Teacher } from '../models/Teacher.js'; // Import Teacher model if needed
import validator from 'validator';

// Get all students
export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().populate('teacherId', 'name'); // Populate teacher details
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students', error: error.message });
    }
};

// Create a new student
export const createStudent = async (req, res) => {
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
            classroomId // Assuming classroomId is part of the Student model
        });

        // Save the student to the database
        await newStudent.save();

        // Return the created student
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(500).json({ message: 'Error creating student', error: error.message });
    }
};

// Get a student by ID
export const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).populate('teacherId', 'name');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching student', error: error.message });
    }
};

// Update a student by ID
export const updateStudentById = async (req, res) => {
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
};

// Delete a student by ID
export const deleteStudentById = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting student', error: error.message });
    }
};
