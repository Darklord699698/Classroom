// src/controllers/timetableController.js
import Timetable from '../models/timetable.js';

// Create a new timetable entry
export const createTimetable = async (req, res) => {
    try {
        const { day, time, subject } = req.body;

        // Validate input
        if (!day || !time || !subject) {
            return res.status(400).json({ message: 'Day, time, and subject are required' });
        }

        // Create new timetable entry
        const newTimetable = new Timetable({ day, time, subject });
        await newTimetable.save();

        res.status(201).json(newTimetable);
    } catch (error) {
        console.error('Error creating timetable:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get all timetables
export const getAllTimetables = async (req, res) => {
    try {
        const timetables = await Timetable.find();
        res.status(200).json(timetables);
    } catch (error) {
        console.error('Error fetching timetables:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get a single timetable by ID
export const getTimetableById = async (req, res) => {
    try {
        const timetable = await Timetable.findById(req.params.id);
        if (!timetable) {
            return res.status(404).json({ message: 'Timetable not found' });
        }
        res.status(200).json(timetable);
    } catch (error) {
        console.error('Error fetching timetable by ID:', error);
        res.status(500).json({ message: error.message });
    }
};

// Update a timetable by ID
export const updateTimetable = async (req, res) => {
    try {
        const updatedTimetable = await Timetable.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTimetable) {
            return res.status(404).json({ message: 'Timetable not found' });
        }
        res.status(200).json(updatedTimetable);
    } catch (error) {
        console.error('Error updating timetable:', error);
        res.status(500).json({ message: error.message });
    }
};

// Delete a timetable by ID
export const deleteTimetable = async (req, res) => {
    try {
        const deletedTimetable = await Timetable.findByIdAndDelete(req.params.id);
        if (!deletedTimetable) {
            return res.status(404).json({ message: 'Timetable not found' });
        }
        res.status(200).json({ message: 'Timetable deleted successfully' });
    } catch (error) {
        console.error('Error deleting timetable:', error);
        res.status(500).json({ message: error.message });
    }
};
