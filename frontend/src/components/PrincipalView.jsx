import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PrincipalView = () => {
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [classrooms, setClassrooms] = useState([]);
    const [newClassroomName, setNewClassroomName] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [selectedClassroom, setSelectedClassroom] = useState('');
    const [selectedStudent, setSelectedStudent] = useState('');
    const [timetable, setTimetable] = useState({});
    const [newTeacherName, setNewTeacherName] = useState('');
    const [newTeacherEmail, setNewTeacherEmail] = useState('');
    const [newStudentName, setNewStudentName] = useState('');
    const [newStudentEmail, setNewStudentEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchTeachers();
        fetchStudents();
        fetchClassrooms();
    }, []);

    const fetchTeachers = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/teachers');
            setTeachers(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching teachers:', error);
        }
    };

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/students');
            setStudents(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const fetchClassrooms = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/classrooms');
            setClassrooms(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching classrooms:', error);
        }
    };

    const handleCreateClassroom = async () => {
        try {
            console.log('Creating classroom with name:', newClassroomName); // Log payload
            const response = await axios.post('http://localhost:4000/api/classrooms', { name: newClassroomName });
            setNewClassroomName('');
            fetchClassrooms(); // Refresh classroom list
        } catch (error) {
            console.error('Error creating classroom:', error.response ? error.response.data : error.message);
            setErrorMessage('Error creating classroom: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    const handleCreateTeacher = async () => {
        try {
            await axios.post('http://localhost:4000/api/teachers', {
                name: newTeacherName,
                email: newTeacherEmail
            });
            setNewTeacherName('');
            setNewTeacherEmail('');
            fetchTeachers(); // Refresh teacher list
        } catch (error) {
            setErrorMessage('Error creating teacher: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    const handleCreateStudent = async () => {
        try {
            await axios.post('http://localhost:4000/api/students', {
                name: newStudentName,
                email: newStudentEmail
            });
            setNewStudentName('');
            setNewStudentEmail('');
            fetchStudents(); // Refresh student list
        } catch (error) {
            setErrorMessage('Error creating student: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    const handleAssignClassroom = async () => {
        try {
            console.log('Assigning classroom with teacherId:', selectedTeacher, 'and classroomId:', selectedClassroom);
            const response = await axios.post('http://localhost:4000/api/classrooms/assign', {
                teacherId: selectedTeacher,
                classroomId: selectedClassroom
            });
    
            if (response.status === 200) {
                fetchClassrooms();
                fetchTeachers();
                alert('Teacher assigned to classroom successfully.');
            }
        } catch (error) {
            console.error('Error assigning classroom:', error.response ? error.response.data : error.message);
            alert('Failed to assign teacher: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    const handleAssignStudent = async () => {
        try {
            console.log('Assigning student with studentId:', selectedStudent, 'and teacherId:', selectedTeacher);
            const response = await axios.post('http://localhost:4000/api/students/assign', {
                studentId: selectedStudent,
                teacherId: selectedTeacher
            });
    
            if (response.status === 200) {
                fetchStudents(); // Refresh student list
                fetchTeachers(); // Refresh teacher list
                alert('Student assigned to teacher successfully.');
            }
        } catch (error) {
            console.error('Error assigning student:', error.response ? error.response.data : error.message);
            alert('Failed to assign student: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    const handleEditTimetable = async () => {
        try {
            await axios.put('http://localhost:4000/api/timetable', timetable);
            // Add appropriate feedback
            alert('Timetable saved successfully.');
        } catch (error) {
            setErrorMessage('Error editing timetable: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    return (
        <div className="relative mt-8 ml-4">
            <Link to="/" className="relative inline-block px-4 py-2 mb-6 font-medium group">
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                <span className="relative text-black group-hover:text-white">Back to Home Page</span>
            </Link>

            {errorMessage && (
                <div className="p-4 mb-6 text-red-700 bg-red-100 border border-red-400 rounded">
                    {errorMessage}
                </div>
            )}

            {/* Create Classroom */}
            <div className="mb-6">
                <h2 className="mb-4 text-2xl font-semibold">Create a Classroom</h2>
                <input
                    type="text"
                    value={newClassroomName}
                    onChange={(e) => setNewClassroomName(e.target.value)}
                    placeholder="Classroom Name"
                    className="px-4 py-2 border border-gray-300"
                />
                <button
                    onClick={handleCreateClassroom}
                    className="px-4 py-2 ml-4 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    Create
                </button>
            </div>

            {/* Create Teacher */}
            <div className="mb-6">
                <h2 className="mb-4 text-2xl font-semibold">Create a Teacher</h2>
                <input
                    type="text"
                    value={newTeacherName}
                    onChange={(e) => setNewTeacherName(e.target.value)}
                    placeholder="Teacher Name"
                    className="px-4 py-2 border border-gray-300"
                />
                <input
                    type="email"
                    value={newTeacherEmail}
                    onChange={(e) => setNewTeacherEmail(e.target.value)}
                    placeholder="Teacher Email"
                    className="px-4 py-2 ml-4 border border-gray-300"
                />
                <button
                    onClick={handleCreateTeacher}
                    className="px-4 py-2 ml-4 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    Create
                </button>
            </div>

            {/* Create Student */}
            <div className="mb-6">
                <h2 className="mb-4 text-2xl font-semibold">Create a Student</h2>
                <input
                    type="text"
                    value={newStudentName}
                    onChange={(e) => setNewStudentName(e.target.value)}
                    placeholder="Student Name"
                    className="px-4 py-2 border border-gray-300"
                />
                <input
                    type="email"
                    value={newStudentEmail}
                    onChange={(e) => setNewStudentEmail(e.target.value)}
                    placeholder="Student Email"
                    className="px-4 py-2 ml-4 border border-gray-300"
                />
                <button
                    onClick={handleCreateStudent}
                    className="px-4 py-2 ml-4 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    Create
                </button>
            </div>

            {/* Classrooms Table */}
            <div className="mb-6">
                <h2 className="mb-4 text-2xl font-semibold">Classrooms</h2>
                <table className="min-w-full mb-6 border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Teacher</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classrooms.length > 0 ? (
                            classrooms.map(classroom => {
                                // Find the teacher by ID, default to empty object if not found
                                const teacher = teachers.find(t => t._id === classroom.teacher?._id) || {};
                                return (
                                    <tr key={classroom._id}>
                                        <td className="px-4 py-2 border">{classroom.name}</td>
                                        <td className="px-4 py-2 border">
                                            {teacher.name || 'None'}
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="2" className="px-4 py-2 text-center border">No classrooms found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Assign Classroom */}
            <div className="mb-6">
                <h2 className="mb-4 text-2xl font-semibold">Assign Classroom to Teacher</h2>
                <select
                    value={selectedTeacher}
                    onChange={(e) => setSelectedTeacher(e.target.value)}
                    className="px-4 py-2 border border-gray-300"
                >
                    <option value="">Select Teacher</option>
                    {teachers.map(teacher => (
                        <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
                    ))}
                </select>
                <select
                    value={selectedClassroom}
                    onChange={(e) => setSelectedClassroom(e.target.value)}
                    className="px-4 py-2 ml-4 border border-gray-300"
                >
                    <option value="">Select Classroom</option>
                    {classrooms.map(classroom => (
                        <option key={classroom._id} value={classroom._id}>{classroom.name}</option>
                    ))}
                </select>
                <button
                    onClick={handleAssignClassroom}
                    className="px-4 py-2 ml-4 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    Assign
                </button>
            </div>

            {/* Assign Student */}
            <div className="mb-6">
                <h2 className="mb-4 text-2xl font-semibold">Assign Student to Teacher</h2>
                <select
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                    className="px-4 py-2 border border-gray-300"
                >
                    <option value="">Select Student</option>
                    {students.map(student => (
                        <option key={student._id} value={student._id}>{student.name}</option>
                    ))}
                </select>
                <select
                    value={selectedTeacher}
                    onChange={(e) => setSelectedTeacher(e.target.value)}
                    className="px-4 py-2 ml-4 border border-gray-300"
                >
                    <option value="">Select Teacher</option>
                    {teachers.map(teacher => (
                        <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
                    ))}
                </select>
                <button
                    onClick={handleAssignStudent}
                    className="px-4 py-2 ml-4 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    Assign
                </button>
            </div>

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
                            teachers.map(teacher => {
                                // Find the classroom by ID, default to empty object if not found
                                const classroom = classrooms.find(c => c._id === teacher.classroom) || {};
                                return (
                                    <tr key={teacher._id}>
                                        <td className="px-4 py-2 border">{teacher.name}</td>
                                        <td className="px-4 py-2 border">{teacher.email}</td>
                                        <td className="px-4 py-2 border">
                                            {classroom.name || 'None'}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            <button className="text-blue-500 hover:underline">Edit</button>
                                            <button className="ml-2 text-red-500 hover:underline">Delete</button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-4 py-2 text-center border">No teachers found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Students Table */}
            <div className="mb-6">
                <h2 className="mb-4 text-2xl font-semibold">Students</h2>
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
                        {students.length > 0 ? (
                            students.map(student => {
                                // Find the classroom by ID, default to empty object if not found
                                const classroom = classrooms.find(c => c._id === student.classroom) || {};
                                return (
                                    <tr key={student._id}>
                                        <td className="px-4 py-2 border">{student.name}</td>
                                        <td className="px-4 py-2 border">{student.email}</td>
                                        <td className="px-4 py-2 border">
                                            {classroom.name || 'None'}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            <button className="text-blue-500 hover:underline">Edit</button>
                                            <button className="ml-2 text-red-500 hover:underline">Delete</button>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-4 py-2 text-center border">No students found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Timetable Editing (Optional) */}
            <div className="mb-6">
                <h2 className="mb-4 text-2xl font-semibold">Edit Timetable</h2>
                {/* Add your timetable editing form here */}
                <button
                    onClick={handleEditTimetable}
                    className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                    Save Timetable
                </button>
            </div>
        </div>
    );
};

export default PrincipalView;
