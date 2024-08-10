import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classroom',
        default: null
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Index the email field for better performance
teacherSchema.index({ email: 1 });

export const Teacher = mongoose.model('Teacher', teacherSchema);