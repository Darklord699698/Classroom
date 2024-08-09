import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CourseBox = ({ course, onViewMore }) => (
    <div className="p-6 mb-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold">{course.title}</h2>
        <p className="mb-4 text-lg">{course.description}</p>
        <button
            onClick={() => onViewMore(course)}
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
            View More
        </button>
    </div>
);

const Courses = () => {
    const [selectedCourse, setSelectedCourse] = useState(null);

    const handleViewMore = (course) => {
        setSelectedCourse(course);
    };

    const handleClose = () => {
        setSelectedCourse(null);
    };

    // Sample course data
    const coursesData = [
        { id: 1, title: 'React for Beginners', description: 'Learn the basics of React.', details: 'Detailed course information about React for beginners.' },
        { id: 2, title: 'Advanced JavaScript', description: 'Deep dive into JavaScript.', details: 'Detailed course information about advanced JavaScript.' },
        // Add more courses as needed
    ];

    return (
        <div className="min-h-screen p-8 bg-gray-100">
            <header className="p-4 mb-8 text-white bg-gray-800">
                <div className="container flex items-center justify-between mx-auto">
                    <Link to="/" className="text-white hover:underline">
                        Back to Home
                    </Link>
                </div>
            </header>

            <div className="container mx-auto">
                <h1 className="mb-6 text-4xl font-bold">Available Courses</h1>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {coursesData.map(course => (
                        <CourseBox
                            key={course.id}
                            course={course}
                            onViewMore={handleViewMore}
                        />
                    ))}
                </div>

                {selectedCourse && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="relative max-w-lg p-8 mx-auto bg-white rounded-lg shadow-lg">
                            <button
                                onClick={handleClose}
                                className="absolute text-2xl text-gray-500 top-2 right-2 hover:text-gray-700"
                            >
                                &times;
                            </button>
                            <h2 className="mb-4 text-3xl font-bold">{selectedCourse.title}</h2>
                            <p className="mb-4 text-lg">{selectedCourse.details}</p>
                            <button
                                onClick={handleClose}
                                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Courses;
