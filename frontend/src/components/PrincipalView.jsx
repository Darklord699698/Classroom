import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import axios from 'axios'; // Import axios for API calls

const PrincipalView = () => {
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [classrooms, setClassrooms] = useState([]);
    const [newClassroomName, setNewClassroomName] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [selectedClassroom, setSelectedClassroom] = useState('');
    const [timetable, setTimetable] = useState({});

    useEffect(() => {
        // Fetch initial data
        fetchTeachers();
        fetchStudents();
        fetchClassrooms();
    }, []);

    const fetchTeachers = async () => {
        try {
            const response = await axios.get('/api/teachers');
            // Ensure response data is an array
            setTeachers(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching teachers:', error);
        }
    };

    const fetchStudents = async () => {
        try {
            const response = await axios.get('/api/students');
            setStudents(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const fetchClassrooms = async () => {
        try {
            const response = await axios.get('/api/classrooms');
            setClassrooms(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching classrooms:', error);
        }
    };

    const handleCreateClassroom = async () => {
        try {
            await axios.post('/api/classrooms', { name: newClassroomName });
            setNewClassroomName('');
            fetchClassrooms();
        } catch (error) {
            console.error('Error creating classroom:', error);
        }
    };

    const handleAssignClassroom = async () => {
        try {
            await axios.put(`/api/teachers/${selectedTeacher}`, { classroomId: selectedClassroom });
            fetchTeachers();
        } catch (error) {
            console.error('Error assigning classroom:', error);
        }
    };

    const handleEditTimetable = async () => {
        try {
            await axios.put('/api/timetable', timetable);
            // Add appropriate feedback
        } catch (error) {
            console.error('Error editing timetable:', error);
        }
    };

    return (
        <div className="relative mt-8 ml-4">
            <Link to="/" className="relative inline-block px-4 py-2 mb-6 font-medium group">
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                <span className="relative text-black group-hover:text-white">Back to Home Page</span>
            </Link>

            {/* Teachers Table */}
            <div className="mb-6">
                <h2 className="mb-4 text-2xl font-semibold">Teachers</h2>
                <table className="min-w-full mb-6 border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Classroom</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teachers.length > 0 ? (
                            teachers.map(teacher => (
                                <tr key={teacher.id}>
                                    <td className="px-4 py-2 border">{teacher.name}</td>
                                    <td className="px-4 py-2 border">{teacher.email}</td>
                                    <td className="px-4 py-2 border">
                                        {teacher.classroom ? teacher.classroom.name : 'None'}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        <button className="text-blue-500 hover:underline">Edit</button>
                                        <button className="ml-2 text-red-500 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-4 py-2 text-center border">No teachers found</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Students Table */}
                <h2 className="mb-4 text-2xl font-semibold">Students</h2>
                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Classroom</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? (
                            students.map(student => (
                                <tr key={student.id}>
                                    <td className="px-4 py-2 border">{student.name}</td>
                                    <td className="px-4 py-2 border">{student.email}</td>
                                    <td className="px-4 py-2 border">
                                        {student.classroom ? student.classroom.name : 'None'}
                                    </td>
                                    <td className="px-4 py-2 border">
                                        <button className="text-blue-500 hover:underline">Edit</button>
                                        <button className="ml-2 text-red-500 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-4 py-2 text-center border">No students found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Create Classroom */}
            <div className="mb-6">
                <h2 className="mb-4 text-2xl font-semibold">Create a Classroom</h2>
                <input
                    type="text"
                    value={newClassroomName}
                    onChange={(e) => setNewClassroomName(e.target.value)}
                    placeholder="Classroom Name"
                    className="px-4 py-2 mr-2 border"
                />
                <button
                    onClick={handleCreateClassroom}
                    className="px-4 py-2 text-white bg-blue-500 rounded"
                >
                    Create Classroom
                </button>
            </div>

            {/* Assign Classroom */}
            <div className="mb-6">
                <h2 className="mb-4 text-2xl font-semibold">Assign Classroom to Teacher</h2>
                <select
                    onChange={(e) => setSelectedTeacher(e.target.value)}
                    className="px-4 py-2 mr-2 border"
                >
                    <option value="">Select Teacher</option>
                    {teachers.map(teacher => (
                        <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                    ))}
                </select>
                <select
                    onChange={(e) => setSelectedClassroom(e.target.value)}
                    className="px-4 py-2 mr-2 border"
                >
                    <option value="">Select Classroom</option>
                    {classrooms.map(classroom => (
                        <option key={classroom.id} value={classroom.id}>{classroom.name}</option>
                    ))}
                </select>
                <button
                    onClick={handleAssignClassroom}
                    className="px-4 py-2 text-white bg-green-500 rounded"
                >
                    Assign Classroom
                </button>
            </div>

            {/* Timetable Management (Optional) */}
            <div>
                <h2 className="mb-4 text-2xl font-semibold">Manage Timetable</h2>
                {/* Timetable management implementation here */}
                <button
                    onClick={handleEditTimetable}
                    className="px-4 py-2 text-white bg-yellow-500 rounded"
                >
                    Save Timetable Changes
                </button>
            </div>
        </div>
    );
}

export default PrincipalView;
