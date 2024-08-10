// src/models/timetable.js
import mongoose from 'mongoose';

const timetableSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export default mongoose.model('Timetable', timetableSchema);
