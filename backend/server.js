import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './src/config/db.js';
import classroomRoutes from './src/routes/classroomRoutes.js';
import timetableRoutes from './src/routes/timetableRoutes.js';
import studentRoutes from './src/routes/studentsRoutes.js';
import teacherRoutes from './src/routes/teacherRoutes.js'; // Import teacher routes

// App configuration
const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

// Routes
app.get('/', (req, res) => {
    res.send("API Working");
});

// API Routes
app.use('/api/classrooms', classroomRoutes); // Route for classroom operations
app.use('/api/timetable', timetableRoutes); // Route for timetable operations
app.use('/api/students', studentRoutes); // Route for student operations
app.use('/api/teachers', teacherRoutes); // Route for teacher operations

// 404 Handler for unknown routes
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Start server
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
