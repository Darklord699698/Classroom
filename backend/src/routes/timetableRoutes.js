import express from 'express';
import { saveTimetable } from '../controllers/timetableController.js';

const router = express.Router();

router.put('/', saveTimetable);

export default router;
