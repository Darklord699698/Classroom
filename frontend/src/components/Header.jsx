import React, { useState } from 'react';
import { FaArrowRight, FaUserCircle } from 'react-icons/fa'; // Import user icon
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Import Link and useNavigate for navigation
import { assets } from '../assets/assets'; // Importing assets

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate(); // Hook to programmatically navigate
    const location = useLocation(); // Hook to get current location

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleNavigation = (path) => {
        setDropdownOpen(false); // Close dropdown
        navigate(path); // Navigate to the specified path
    };

    const handleLoginClick = () => {
        navigate('/login'); // Navigate to login page
    };

    const handleLogout = () => {
        setIsLoggedIn(false); // Update login state
        navigate('/'); // Redirect to home or login page
    };

    const getLinkClassName = (path) => {
        return `hover:underline ${location.pathname === path ? 'underline' : ''}`;
    };

    return (
        <>
            <header className="relative z-10 flex flex-col items-start justify-between px-6 py-4 font-bold text-black bg-sky-100">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-2">
                        <img src={assets.books} alt="Book Icon" className="w-8 h-8" /> {/* Adjust size as needed */}
                        <h1 className="text-2xl">eLearning</h1>
                    </div>
                    <nav className="flex items-center space-x-6">
                        <Link 
                            to="/" 
                            className={getLinkClassName('/')}
                        >
                            Home
                        </Link>
                        <Link 
                            to="/about"
                            className={getLinkClassName('/about')}
                        >
                            About
                        </Link>
                        <Link 
                            to="/courses"
                            className={getLinkClassName('/courses')}
                        >
                            Courses
                        </Link>
                        <Link 
                            to="/pages"
                            className={getLinkClassName('/pages')}
                        >
                            Pages
                        </Link>
                        <Link 
                            to="/contact"
                            className={getLinkClassName('/contact')}
                        >
                            Contact
                        </Link>
                        <div className="relative">
                            <button 
                                onClick={toggleDropdown} 
                                className="hover:underline focus:outline-none"
                            >
                                Dashboard
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 z-50 w-48 mt-2 bg-white border border-gray-300 shadow-lg">
                                    <ul>
                                        <li>
                                            <button 
                                                onClick={() => handleNavigation('/principal')} 
                                                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                            >
                                                Principal View
                                            </button>
                                        </li>
                                        <li>
                                            <button 
                                                onClick={() => handleNavigation('/teacher')} 
                                                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                            >
                                                Teacher View
                                            </button>
                                        </li>
                                        <li>
                                            <button 
                                                onClick={() => handleNavigation('/student')} 
                                                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                            >
                                                Student View
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        {isLoggedIn ? (
                            <button 
                                onClick={handleLogout} 
                                className="flex items-center px-4 py-2 text-white bg-gray-700 rounded hover:bg-gray-800"
                            >
                                <FaUserCircle className="mr-2" />
                                Profile
                            </button>
                        ) : (
                            <button 
                                onClick={handleLoginClick}
                                className="flex items-center px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                            >
                                Join Now
                                <FaArrowRight className="ml-2" />
                            </button>
                        )}
                    </nav>
                </div>
            </header>
        </>
    );
}

export default Header;
