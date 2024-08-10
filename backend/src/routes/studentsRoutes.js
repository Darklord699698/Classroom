import express from 'express';
const router = express.Router();

// Define routes here, e.g.,
router.get('/', (req, res) => {
    res.send("List of students");
});

export default router;
