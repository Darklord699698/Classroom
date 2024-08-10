import mongoose from 'mongoose';

const classroomSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true // Trims any whitespace from the name
    },
    teacher: { 
        type: mongoose.Schema.Types.ObjectId, // Changed from String to ObjectId
        ref: 'Teacher', 
        default: null 
    },
    students: [{ 
        type: mongoose.Schema.Types.ObjectId, // Changed from Number to ObjectId
        ref: 'Student' 
    }],
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Index the name field for better performance
classroomSchema.index({ name: 1 });

export const Classroom = mongoose.model('Classroom', classroomSchema);