import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import PrincipalView from './components/PrincipalView';
import TeacherView from './components/TeacherView';
import StudentView from './components/StudentView';
import Courses from './components/Courses';
import Pages from './components/Pages';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import Content from './components/Content'

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <div className="flex flex-col min-h-screen App">
                <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Content />} />
                        <Route path="/principal" element={<PrincipalView />} />
                        <Route path="/teacher" element={<TeacherView />} />
                        <Route path="/student" element={<StudentView />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/courses" element={<Courses />} />
                        <Route path="/pages" element={<Pages />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
