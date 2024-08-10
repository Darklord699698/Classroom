import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './src/config/db.js';
import classroomRoutes from './src/routes/classroomRoutes.js';
import timetableRoutes from './src/routes/timetableRoutes.js';
import studentRoutes from './src/routes/studentsRoutes.js';
import teacherRoutes from './src/routes/teacherRoutes.js';
import contactRoutes from './src/routes/contactRoutes.js'; // Import the new contact routes

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
app.use('/api/classrooms', classroomRoutes); // Classroom operations
app.use('/api/timetable', timetableRoutes);  // Timetable operations
app.use('/api/students', studentRoutes);      // Student operations
app.use('/api/teachers', teacherRoutes);      // Teacher operations
app.use('/api/contact', contactRoutes);        // New route for contact form

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
