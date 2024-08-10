import express from 'express';
import Contact from '../models/Contact.js'; // Correct import path

const router = express.Router();

// POST request to submit contact form data
router.post('/', async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(201).json({ message: 'Contact information saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save contact information' });
    }
});

export default router;
