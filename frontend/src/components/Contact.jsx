import React, { useState } from 'react';
import Lottie from 'lottie-react'; // Import Lottie for animations
import { assets } from '../assets/assets'; // Import the assets with Lottie file
import axios from 'axios'; // Import axios for making HTTP requests

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        message: ''
    });
    const [status, setStatus] = useState(''); // State to show success or error messages

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://classroom-nbzw.onrender.com/api/contact', formData);
            setStatus('Form submitted successfully!');
            setFormData({
                name: '',
                email: '',
                mobile: '',
                message: ''
            });
        } catch (error) {
            setStatus('Failed to submit the form.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
            <div className="flex flex-col items-center w-full max-w-lg p-8 bg-gray-800 rounded-lg shadow-lg">
                <h1 className="mb-6 text-3xl font-bold text-white">Contact Us</h1>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col w-full space-y-4"
                >
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="p-4 text-white placeholder-gray-400 bg-gray-700 border border-gray-700 rounded-lg"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="p-4 text-white placeholder-gray-400 bg-gray-700 border border-gray-700 rounded-lg"
                    />
                    <input
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="Mobile No"
                        className="p-4 text-white placeholder-gray-400 bg-gray-700 border border-gray-700 rounded-lg"
                    />
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Message"
                        rows="8"
                        className="p-4 text-white placeholder-gray-400 bg-gray-700 border border-gray-700 rounded-lg"
                    />
                    <button
                        type="submit"
                        className="w-full py-3 text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                        Send Response
                    </button>
                </form>
                {status && <p className="mt-4 text-white">{status}</p>}
                <div className="flex justify-center w-full mt-8">
                    <Lottie animationData={assets.animation2} loop={true} />
                </div>
            </div>
        </div>
    );
}

export default Contact;
