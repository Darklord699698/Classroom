import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PrincipalView = () => {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [newClassroomName, setNewClassroomName] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedClassroom, setSelectedClassroom] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [timetable, setTimetable] = useState({});
  const [newTeacherName, setNewTeacherName] = useState("");
  const [newTeacherEmail, setNewTeacherEmail] = useState("");
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentEmail, setNewStudentEmail] = useState("");
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchTeachers();
    fetchStudents();
    fetchClassrooms();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("https://classroom-nbzw.onrender.com/api/teachers");
      setTeachers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get("https://classroom-nbzw.onrender.com/api/students");
      setStudents(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchClassrooms = async () => {
    try {
      const response = await axios.get("https://classroom-nbzw.onrender.com/api/classrooms");
      setClassrooms(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching classrooms:", error);
    }
  };

  const handleCreateClassroom = async () => {
    try {
      console.log("Creating classroom with name:", newClassroomName); // Log payload
      const response = await axios.post(
        "https://classroom-nbzw.onrender.com/api/classrooms",
        { name: newClassroomName }
      );
      setNewClassroomName("");
      fetchClassrooms(); // Refresh classroom list
    } catch (error) {
      console.error(
        "Error creating classroom:",
        error.response ? error.response.data : error.message
      );
      setErrorMessage(
        "Error creating classroom: " +
          (error.response ? error.response.data.message : error.message)
      );
    }
  };

  const handleCreateTeacher = async () => {
    try {
      await axios.post("https://classroom-nbzw.onrender.com/api/teachers", {
        name: newTeacherName,
        email: newTeacherEmail,
      });
      setNewTeacherName("");
      setNewTeacherEmail("");
      fetchTeachers(); // Refresh teacher list
    } catch (error) {
      setErrorMessage(
        "Error creating teacher: " +
          (error.response ? error.response.data.message : error.message)
      );
    }
  };

  const handleCreateStudent = async () => {
    try {
      await axios.post("https://classroom-nbzw.onrender.com/api/students", {
        name: newStudentName,
        email: newStudentEmail,
      });
      setNewStudentName("");
      setNewStudentEmail("");
      fetchStudents(); // Refresh student list
    } catch (error) {
      console.error("Error creating student:", error);
      setErrorMessage(
        "Error creating student: " +
          (error.response ? error.response.data.message : error.message)
      );
    }
  };

  const handleAssignClassroom = async () => {
    try {
      console.log(
        "Assigning classroom with teacherId:",
        selectedTeacher,
        "and classroomId:",
        selectedClassroom
      );
      const response = await axios.post(
        "https://classroom-nbzw.onrender.com/api/classrooms/assign",
        {
          teacherId: selectedTeacher,
          classroomId: selectedClassroom,
        }
      );

      if (response.status === 200) {
        fetchClassrooms();
        fetchTeachers();
        alert("Teacher assigned to classroom successfully.");
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;
      console.error("Error assigning classroom:", errorMessage);
      alert("Failed to assign teacher: " + errorMessage);
    }
  };

  const handleAssignStudent = async () => {
    try {
      const response = await axios.post(
        "https://classroom-nbzw.onrender.com/api/students/assign",
        {
          studentId: selectedStudent,
          teacherId: selectedTeacher,
        }
      );

      if (response.status === 200) {
        fetchStudents(); // Refresh student list
        fetchTeachers(); // Refresh teacher list
        alert("Student assigned to teacher successfully.");
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;
      console.error("Error assigning student:", errorMessage);
      alert("Failed to assign student: " + errorMessage);
    }
  };

  const handleEditTeacher = async () => {
    if (editingTeacher) {
      try {
        await axios.put(
          `https://classroom-nbzw.onrender.com/api/teachers/${editingTeacher._id}`,
          {
            name: editingTeacher.name,
            email: editingTeacher.email,
          }
        );
        setEditingTeacher(null);
        fetchTeachers(); // Refresh teacher list
        alert("Teacher updated successfully.");
      } catch (error) {
        setErrorMessage(
          "Error updating teacher: " +
            (error.response ? error.response.data.message : error.message)
        );
      }
    }
  };

  const handleEditStudent = async () => {
    if (editingStudent) {
      try {
        await axios.put(
          `https://classroom-nbzw.onrender.com/api/students/${editingStudent._id}`,
          {
            name: editingStudent.name,
            email: editingStudent.email,
          }
        );
        setEditingStudent(null);
        fetchStudents(); // Refresh student list
        alert("Student updated successfully.");
      } catch (error) {
        setErrorMessage(
          "Error updating student: " +
            (error.response ? error.response.data.message : error.message)
        );
      }
    }
  };

  const handleDeleteTeacher = async (id) => {
    try {
      await axios.delete(`https://classroom-nbzw.onrender.com/api/teachers/${id}`);
      fetchTeachers(); // Refresh teacher list
      alert("Teacher deleted successfully.");
    } catch (error) {
      console.error("Error deleting teacher:", error);
      alert(
        "Failed to delete teacher: " +
          (error.response ? error.response.data.message : error.message)
      );
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(`https://classroom-nbzw.onrender.com/api/students/${id}`);
      fetchStudents(); // Refresh student list
      alert("Student deleted successfully.");
    } catch (error) {
      console.error("Error deleting student:", error);
      alert(
        "Failed to delete student: " +
          (error.response ? error.response.data.message : error.message)
      );
    }
  };

  return (
    <div className="relative mt-8 ml-4">
      <Link
        to="/"
        className="relative inline-block px-4 py-2 mb-6 font-medium group"
      >
        <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
        <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
        <span className="relative text-black group-hover:text-white">
          Back to Home Page
        </span>
      </Link>

      {errorMessage && (
        <div className="p-4 mb-6 text-red-700 bg-red-100 border border-red-400 rounded">
          {errorMessage}
        </div>
      )}

      {/* Create Classroom */}
      <div className="mb-6">
        <h2 className="mb-4 text-2xl font-semibold">Create a Classroom</h2>
        <input
          type="text"
          value={newClassroomName}
          onChange={(e) => setNewClassroomName(e.target.value)}
          placeholder="Classroom Name"
          className="px-4 py-2 border border-gray-300"
        />
        <button
          onClick={handleCreateClassroom}
          className="px-4 py-2 ml-4 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Create
        </button>
      </div>
      <div className="mb-6">
        <h2 className="mb-4 text-2xl font-semibold">Classrooms</h2>
        <table className="min-w-full mb-6 border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Teacher</th>
            </tr>
          </thead>
          <tbody>
            {classrooms.length > 0 ? (
              classrooms.map((classroom) => {
                // Find the teacher by ID, default to empty object if not found
                const teacher =
                  teachers.find((t) => t._id === classroom.teacher?._id) || {};
                return (
                  <tr key={classroom._id}>
                    <td className="px-4 py-2 border">{classroom.name}</td>
                    <td className="px-4 py-2 border">
                      {teacher.name || "None"}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="2" className="px-4 py-2 text-center border">
                  No classrooms found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Create Teacher */}
      <div className="mb-6">
        <h2 className="mb-4 text-2xl font-semibold">Create a Teacher</h2>
        <input
          type="text"
          value={newTeacherName}
          onChange={(e) => setNewTeacherName(e.target.value)}
          placeholder="Teacher Name"
          className="px-4 py-2 border border-gray-300"
        />
        <input
          type="email"
          value={newTeacherEmail}
          onChange={(e) => setNewTeacherEmail(e.target.value)}
          placeholder="Teacher Email"
          className="px-4 py-2 ml-4 border border-gray-300"
        />
        <button
          onClick={handleCreateTeacher}
          className="px-4 py-2 ml-4 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Create
        </button>
      </div>
      {/* Teachers Table */}
      <div className="mb-6">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">Teachers</h2>
        <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-teal-100">
            <tr>
              <th className="px-4 py-3 font-bold text-left text-gray-600 border-b">
                Name
              </th>
              <th className="px-4 py-3 font-bold text-left text-gray-600 border-b">
                Email
              </th>
              <th className="px-4 py-3 font-bold text-left text-gray-600 border-b">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher._id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{teacher.name}</td>
                <td className="px-4 py-3">{teacher.email}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => setEditingTeacher(teacher)}
                    className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTeacher(teacher._id)}
                    className="px-3 py-1 ml-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Assign Classroom */}
      <div className="mb-6">
        <h2 className="mb-4 text-2xl font-semibold">Assign Classroom</h2>
        <select
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
          className="px-4 py-2 border border-gray-300"
        >
          <option value="">Select Teacher</option>
          {teachers.map((teacher) => (
            <option key={teacher._id} value={teacher._id}>
              {teacher.name}
            </option>
          ))}
        </select>
        <select
          value={selectedClassroom}
          onChange={(e) => setSelectedClassroom(e.target.value)}
          className="px-4 py-2 ml-4 border border-gray-300"
        >
          <option value="">Select Classroom</option>
          {classrooms.map((classroom) => (
            <option key={classroom._id} value={classroom._id}>
              {classroom.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleAssignClassroom}
          className="px-4 py-2 ml-4 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Assign
        </button>
      </div>

      {/* Assign Student */}
      <div className="mb-6">
        <h2 className="mb-4 text-2xl font-semibold">Assign Student</h2>
        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
          className="px-4 py-2 border border-gray-300"
        >
          <option value="">Select Student</option>
          {students.map((student) => (
            <option key={student._id} value={student._id}>
              {student.name}
            </option>
          ))}
        </select>
        <select
          value={selectedTeacher}
          onChange={(e) => setSelectedTeacher(e.target.value)}
          className="px-4 py-2 ml-4 border border-gray-300"
        >
          <option value="">Select Teacher</option>
          {teachers.map((teacher) => (
            <option key={teacher._id} value={teacher._id}>
              {teacher.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleAssignStudent}
          className="px-4 py-2 ml-4 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Assign
        </button>
      </div>
      {/* Create Student */}
      <div className="mb-6">
        <h2 className="mb-4 text-2xl font-semibold">Create a Student</h2>
        <input
          type="text"
          value={newStudentName}
          onChange={(e) => setNewStudentName(e.target.value)}
          placeholder="Student Name"
          className="px-4 py-2 border border-gray-300"
        />
        <input
          type="email"
          value={newStudentEmail}
          onChange={(e) => setNewStudentEmail(e.target.value)}
          placeholder="Student Email"
          className="px-4 py-2 ml-4 border border-gray-300"
        />
        <button
          onClick={handleCreateStudent}
          className="px-4 py-2 ml-4 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Create
        </button>
      </div>

      {/* Students Table */}
      <div className="mb-6">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">Students</h2>
        <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-teal-100">
            <tr>
              <th className="px-4 py-3 font-bold text-left text-gray-600 border-b">
                Name
              </th>
              <th className="px-4 py-3 font-bold text-left text-gray-600 border-b">
                Email
              </th>
              <th className="px-4 py-3 font-bold text-left text-gray-600 border-b">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{student.name}</td>
                <td className="px-4 py-3">{student.email}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => setEditingStudent(student)}
                    className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteStudent(student._id)}
                    className="px-3 py-1 ml-2 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Teacher Modal */}
      {editingTeacher && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="p-6 bg-white rounded shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold">Edit Teacher</h2>
            <input
              type="text"
              value={editingTeacher.name}
              onChange={(e) =>
                setEditingTeacher({ ...editingTeacher, name: e.target.value })
              }
              placeholder="Teacher Name"
              className="px-4 py-2 border border-gray-300"
            />
            <input
              type="email"
              value={editingTeacher.email}
              onChange={(e) =>
                setEditingTeacher({ ...editingTeacher, email: e.target.value })
              }
              placeholder="Teacher Email"
              className="px-4 py-2 ml-4 border border-gray-300"
            />
            <button
              onClick={handleEditTeacher}
              className="px-4 py-2 ml-4 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={() => setEditingTeacher(null)}
              className="px-4 py-2 ml-4 text-white bg-gray-500 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {editingStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="p-6 bg-white rounded shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold">Edit Student</h2>
            <input
              type="text"
              value={editingStudent.name}
              onChange={(e) =>
                setEditingStudent({ ...editingStudent, name: e.target.value })
              }
              placeholder="Student Name"
              className="px-4 py-2 border border-gray-300"
            />
            <input
              type="email"
              value={editingStudent.email}
              onChange={(e) =>
                setEditingStudent({ ...editingStudent, email: e.target.value })
              }
              placeholder="Student Email"
              className="px-4 py-2 ml-4 border border-gray-300"
            />
            <button
              onClick={handleEditStudent}
              className="px-4 py-2 ml-4 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={() => setEditingStudent(null)}
              className="px-4 py-2 ml-4 text-white bg-gray-500 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrincipalView;
