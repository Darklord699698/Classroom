import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Footer = () => {
    return (
        <footer className="py-10 text-white bg-gray-800">
            <div className="container px-4 mx-auto">
                <div className="flex flex-wrap justify-between">
                    {/* Quick Links */}
                    <div className="w-full mb-8 md:w-1/3">
                        <h3 className="mb-4 text-xl font-bold">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="hover:underline">Home</Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:underline">About</Link>
                            </li>
                            <li>
                                <Link to="/courses" className="hover:underline">Courses</Link>
                            </li>
                            <li>
                                <Link to="/contact" className="hover:underline">Contact</Link>
                            </li>
                            <li>
                                <Link to="/pages" className="hover:underline">Pages</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="w-full mb-8 md:w-1/3">
                        <h3 className="mb-4 text-xl font-bold">Contact Us</h3>
                        <p className="mb-2">123 eLearning St.</p>
                        <p className="mb-2">City, State, ZIP</p>
                        <p className="mb-2">Email: <a href="mailto:info@elearning.com" className="hover:underline">info@elearning.com</a></p>
                        <p className="mb-2">Phone: <a href="tel:+1234567890" className="hover:underline">+1 (234) 567-890</a></p>
                    </div>

                    {/* Social Media */}
                    <div className="w-full mb-8 md:w-1/3">
                        <h3 className="mb-4 text-xl font-bold">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                                <FaFacebookF size={24} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                                <FaTwitter size={24} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700">
                                <FaInstagram size={24} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
                                <FaLinkedinIn size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 text-center">
                    <p className="text-sm">&copy; {new Date().getFullYear()} eLearning. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
