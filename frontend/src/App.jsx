import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer'; // Import the Footer component
import Content from './components/Content'; // Import the Content component
import About from './components/About'; // Import the About component
import PrincipalView from './components/Principalview';
import TeacherView from './components/Teacherview';
import StudentView from './components/Studentview';
import Courses from './components/Courses';
import Pages from './components/Pages';
import Contact from './components/Contact';

const App = () => {
    const [showPrincipalView, setShowPrincipalView] = useState(false);

    const handleHomeClick = () => {
        setShowPrincipalView(false);
    };

    return (
        <Router>
            <div className="flex flex-col min-h-screen App">
                <Header showPrincipalView={showPrincipalView} setShowPrincipalView={setShowPrincipalView} />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Content />} />
                        <Route path="/principal" element={
                            <div>
                                <button 
                                    className="absolute z-50 text-2xl text-white top-16 right-4"
                                    onClick={() => setShowPrincipalView(false)}
                                >
                                    &times;
                                </button>
                                <PrincipalView />
                            </div>
                        } />
                        <Route path="/teacher" element={<TeacherView />} />
                        <Route path="/student" element={<StudentView />} />
                        <Route path="/about" element={<About />} /> 
                        <Route path="/courses" element={<Courses />} /> 
                        <Route path="/pages" element={<Pages />} /> 
                        <Route path="/contact" element={<Contact />} /> 
                    </Routes>
                </main>
                <Footer /> {/* Include the Footer component */}
            </div>
        </Router>
    );
}

export default App;
