import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import EditProfile from "./components/EditProfile";
import Results from "./components/Results"; // ✅ Import Results Page
import TestDetails from "./components/TestDetails"; // ✅ Import TestDetails Page

function App() {
  const isAuthenticated = localStorage.getItem("loggedIn") === "true";

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/edit-profile" element={isAuthenticated ? <EditProfile /> : <Navigate to="/login" />} />
        <Route path="/results" element={isAuthenticated ? <Results /> : <Navigate to="/login" />} />
        <Route path="/test/:id" element={isAuthenticated ? <TestDetails /> : <Navigate to="/login" />} /> {/* ✅ Added TestDetails Route */}
      </Routes>
    </Router>
  );
}

export default App;
