import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/auth/login', { email, password });
            
            if (response.data.token) {
                localStorage.setItem('token', response.data.token); // Store token
                setIsLoggedIn(true); // Update login state
                navigate('/'); // Redirect to home or another page
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            console.error('Login error:', err.response ? err.response.data : err.message); // Log error details
            setError('Invalid credentials');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
                <h2 className="mb-4 text-xl">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <button type="submit" className="p-2 text-white bg-blue-500 rounded">Login</button>
                {error && <p className="mt-4 text-red-500">{error}</p>}
            </form>
        </div>
    );
};

export default Login;
