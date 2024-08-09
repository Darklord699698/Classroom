import React from 'react';
import { Link } from 'react-router-dom';

const Section = ({ title, content }) => (
    <div className="p-6 mb-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold">{title}</h2>
        <p className="text-lg">{content}</p>
    </div>
);

const Pages = () => {
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
                <h1 className="mb-6 text-4xl font-bold">School Information</h1>
                <Section
                    title="Discipline"
                    content="Our school takes discipline seriously and ensures that every student follows a code of conduct that promotes respect, responsibility, and integrity. We believe that a disciplined environment is essential for academic and personal growth."
                />
                <Section
                    title="Sports"
                    content="We offer a variety of sports programs to encourage physical fitness, teamwork, and competitive spirit. From soccer and basketball to swimming and track, our students have the opportunity to excel in their chosen sport."
                />
                <Section
                    title="Decorum"
                    content="Maintaining a respectful and polite atmosphere is a priority at our school. We emphasize the importance of good manners, proper behavior, and positive interactions among students, staff, and the community."
                />
                <Section
                    title="Other Activities"
                    content="Our school provides numerous extracurricular activities that cater to a wide range of interests, including arts, music, drama, and community service. These activities help students develop new skills, discover their passions, and contribute to the community."
                />
            </div>
        </div>
    );
};

export default Pages;
