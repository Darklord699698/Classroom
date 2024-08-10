import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'; // Correct path to your User model

const authRoutes = express.Router();

// Login Route
authRoutes.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log(`Login attempt with email: ${email}`);
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password mismatch');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Error in login:', error.message);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Registration Route
authRoutes.post('/register', async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ email, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ message: 'User created' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default authRoutes;
