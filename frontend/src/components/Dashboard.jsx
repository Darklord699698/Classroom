import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import PrincipalView from './Principalview';
import TeacherView from './Teacherview';
import StudentView from './Studentview';

const Dashboard = () => {
    return (
        <div>
            <nav className="mb-4">
                
            </nav>
            <Routes>
                <Route path="principal" element={<PrincipalView />} />
                <Route path="teacher" element={<TeacherView />} />
                <Route path="student" element={<StudentView />} />
            </Routes>
        </div>
    );
}

export default Dashboard;
