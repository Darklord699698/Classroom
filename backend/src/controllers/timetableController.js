import { Timetable } from '../models/Timetable.js';
import { Classroom } from '../models/Classroom.js';

export const saveTimetable = async (req, res) => {
    try {
        const { classroomId, schedule } = req.body;

        const classroom = await Classroom.findById(classroomId);
        if (!classroom) {
            return res.status(404).json({ message: 'Classroom not found' });
        }

        let timetable = await Timetable.findOne({ classroom: classroomId });
        if (!timetable) {
            timetable = new Timetable({ classroom: classroomId, schedule });
        } else {
            timetable.schedule = schedule;
        }

        await timetable.save();
        res.status(200).json({ message: 'Timetable saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving timetable', error });
    }
};
