import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const StudentView = () => {
    const [students, setStudents] = useState([]);
    const [timetable, setTimetable] = useState([]);

    useEffect(() => {
        // Fetch students and timetable on component mount
        fetchStudents();
        fetchTimetable();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('https://classroom-nbzw.onrender.com/api/students'); // Updated to match your route
            setStudents(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const fetchTimetable = async () => {
        try {
            const response = await axios.get('https://classroom-nbzw.onrender.com/api/timetable'); // Updated to match your route
            setTimetable(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching timetable:', error);
        }
    };

    return (
        <div className="relative mt-8 ml-4">
            <Link to="/" className="relative inline-block px-4 py-2 mb-6 font-medium group">
                <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
                <span className="relative text-black group-hover:text-white">Back to Home Page</span>
            </Link>

            {/* Students Table */}
            <div className="mb-6">
                <h2 className="mb-4 text-2xl font-semibold">Classroom Students</h2>
                <table className="min-w-full mb-6 border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? (
                            students.map(student => (
                                <tr key={student._id}>
                                    <td className="px-4 py-2 border">{student.name}</td>
                                    <td className="px-4 py-2 border">{student.email}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="px-4 py-2 text-center border">No students found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Timetable Display */}
            <div>
                <h2 className="mb-4 text-2xl font-semibold">Classroom Timetable</h2>
                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Day</th>
                            <th className="px-4 py-2 border">Time</th>
                            <th className="px-4 py-2 border">Subject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timetable.length > 0 ? (
                            timetable.map((entry) => (
                                <tr key={entry._id}>
                                    <td className="px-4 py-2 border">{entry.day}</td>
                                    <td className="px-4 py-2 border">{entry.time}</td>
                                    <td className="px-4 py-2 border">{entry.subject}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="px-4 py-2 text-center border">No timetable entries found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentView;
