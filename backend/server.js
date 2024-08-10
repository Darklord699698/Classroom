import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './src/config/db.js';
import bcrypt from 'bcryptjs';
import User from './src/models/userModel.js'; // Import the User model
import classroomRoutes from './src/routes/classroomRoutes.js';
import timetableRoutes from './src/routes/timetableRoutes.js';
import studentRoutes from './src/routes/studentsRoutes.js';
import teacherRoutes from './src/routes/teacherRoutes.js';
import contactRoutes from './src/routes/contactRoutes.js'; // Import the new contact routes
import authRoutes from './src/routes/authRoutes.js'; // Import the authentication routes

// App configuration
const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

// Function to create a principal account if it doesn't exist
const createPrincipalAccount = async () => {
    try {
        const existingPrincipal = await User.findOne({ email: 'principal@classroom.com' });
        if (!existingPrincipal) {
            const hashedPassword = await bcrypt.hash('Admin', 12);
            const principal = new User({
                email: 'principal@classroom.com',
                password: hashedPassword,
                role: 'principal' // Adjusted role to match User schema
            });
            await principal.save();
            console.log('Principal account created.');
        } else {
            console.log('Principal account already exists.');
        }
    } catch (error) {
        console.error('Error creating principal account:', error.message);
    }
};

// Call the function to create the principal account on server start
createPrincipalAccount();

// Routes
app.get('/', (req, res) => {
    res.send("API Working");
});

// API Routes
app.use('/api/classrooms', classroomRoutes); // Classroom operations
app.use('/api/timetable', timetableRoutes);  // Timetable operations
app.use('/api/students', studentRoutes);      // Student operations
app.use('/api/teachers', teacherRoutes);      // Teacher operations
app.use('/api/contact', contactRoutes);       // Contact form
app.use('/api/auth', authRoutes);             // Authentication routes

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
