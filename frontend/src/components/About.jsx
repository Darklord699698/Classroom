import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-900">
            {/* Dark themed header */}
            <header className="p-4 text-white bg-gray-800">
                <div className="container flex items-center justify-between mx-auto">
                    <Link to="/" className="text-white hover:underline">
                        Back to Home
                    </Link>
                </div>
            </header>
            
            {/* Light themed content box */}
            <div className="flex items-center justify-center min-h-screen">
                <div className="max-w-4xl p-8 mx-auto text-gray-900 rounded-lg shadow-lg bg-cyan-100">
                    <h1 className="mb-6 text-4xl font-bold">About Our School</h1>
                    <p className="mb-4 text-lg">
                        Welcome to [School Name], where excellence in education is our top priority. Our mission is to nurture and empower students to reach their full potential and become lifelong learners.
                    </p>
                    
                    <h2 className="mb-4 text-3xl font-semibold">Our Philosophy</h2>
                    <p className="mb-4 text-lg">
                        At [School Name], we believe in a holistic approach to education. Our curriculum is designed to provide a well-rounded education that fosters critical thinking, creativity, and personal growth. We emphasize the importance of both academic excellence and character development.
                    </p>

                    <h2 className="mb-4 text-3xl font-semibold">Programs and Facilities</h2>
                    <p className="mb-4 text-lg">
                        We offer a diverse range of programs tailored to meet the needs of all students, including:
                    </p>
                    <ul className="mb-4 list-disc list-inside">
                        <li>Early Childhood Education</li>
                        <li>Primary and Secondary Education</li>
                        <li>Specialized Programs in Science, Arts, and Humanities</li>
                        <li>Extracurricular Activities and Clubs</li>
                        <li>State-of-the-Art Facilities including Science Labs, Art Studios, and Sports Complex</li>
                    </ul>

                    <h2 className="mb-4 text-3xl font-semibold">Our Team</h2>
                    <p className="mb-4 text-lg">
                        Our team of dedicated educators and staff are committed to providing a supportive and engaging learning environment. Each member of our team is highly qualified and passionate about fostering student success.
                    </p>

                    <h2 className="mb-4 text-3xl font-semibold">Community Involvement</h2>
                    <p className="mb-4 text-lg">
                        We believe in the importance of community involvement and encourage parents and guardians to participate in school events and activities. Our school is an integral part of the local community, and we strive to build strong partnerships with families and community organizations.
                    </p>
                    <p className="text-lg">
                        We look forward to welcoming you to [School Name] and partnering with you in your child’s educational journey.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;
