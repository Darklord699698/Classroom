import { Classroom } from '../models/Classroom.js';
import { Teacher } from '../models/Teacher.js';

export const createClassroom = async (req, res) => {
    try {
        const { name } = req.body;

        // Ensure a classroom with the same name doesn't already exist
        const existingClassroom = await Classroom.findOne({ name });
        if (existingClassroom) {
            return res.status(400).json({ message: 'Classroom with this name already exists' });
        }

        const newClassroom = new Classroom({ name });
        await newClassroom.save();

        res.status(201).json(newClassroom);
    } catch (error) {
        console.error('Error creating classroom:', error);
        res.status(500).json({ message: 'Error creating classroom', error });
    }
};

export const assignClassroom = async (req, res) => {
    try {
        const { teacherId, classroomId } = req.body;

        // Ensure valid ObjectId is provided
        if (!teacherId || !classroomId) {
            return res.status(400).json({ message: 'Teacher ID and Classroom ID are required' });
        }

        // Fetch the teacher and check if they already have a classroom
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        if (teacher.classroom) {
            return res.status(400).json({ message: 'Teacher is already assigned to a classroom' });
        }

        // Fetch the classroom and ensure it exists
        const classroom = await Classroom.findById(classroomId);
        if (!classroom) {
            return res.status(404).json({ message: 'Classroom not found' });
        }

        // Assign the teacher to the classroom
        teacher.classroom = classroom._id;
        await teacher.save();

        // Optionally, you could also assign the teacher to the classroom document itself
        classroom.teacher = teacher._id;
        await classroom.save();

        res.status(200).json({ message: 'Classroom assigned successfully', teacher, classroom });
    } catch (error) {
        console.error('Error assigning classroom:', error);
        res.status(500).json({ message: 'Error assigning classroom', error });
    }
};