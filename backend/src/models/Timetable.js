import mongoose from 'mongoose';

const timetableSchema = new mongoose.Schema({
    classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom', required: true },
    schedule: {
        Monday: { type: String, default: '' },
        Tuesday: { type: String, default: '' },
        Wednesday: { type: String, default: '' },
        Thursday: { type: String, default: '' },
        Friday: { type: String, default: '' },
    },
});

export const Timetable = mongoose.model('Timetable', timetableSchema);
