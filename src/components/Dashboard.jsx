import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaLinkedin, FaGithub, FaSignOutAlt, FaUserEdit, FaHome } from "react-icons/fa";
import { motion } from "framer-motion";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    leetcode: "",
    github: "",
    totalScore: "",
  });
  const [stats, setStats] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("Users"));
    if (!user) {
      navigate("/login");
    } else {
      setUserData((prev) => ({
        ...prev,
        name: user.name,
        email: user.email,
      }));
    }

    // Fetch stats data (Dummy API for now)
    fetch("https://dummyjson.com/products/1")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error fetching stats:", err));
  }, [navigate]);

  // Close profile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("UserDetails", JSON.stringify(userData));
    alert("Details Saved!");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ Navbar */}
      <nav className="bg-blue-500 p-4 flex justify-between items-center shadow-md">
        {/* Logo/Home */}
        <h1 
          className="text-white text-xl font-bold cursor-pointer flex items-center space-x-2"
          onClick={() => navigate("/")}
        >
          <FaHome className="mr-2" /> MockVerse
        </h1>

        {/* User Profile Section */}
        <div className="relative" ref={profileRef}>
          <FaUserCircle 
            className="text-white text-3xl cursor-pointer hover:opacity-80"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          />
          
          {/* ✅ Dropdown Menu */}
          {showProfileMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 5 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2"
            >
              <button 
                className="flex items-center w-full p-2 hover:bg-gray-100 text-gray-700"
                onClick={() => navigate("/profile")}
              >
                <FaUserEdit className="mr-2" /> View Profile
              </button>
              <button 
                className="flex items-center w-full p-2 hover:bg-gray-100 text-gray-700"
                onClick={() => navigate("/edit-profile")}
              >
                <FaUserEdit className="mr-2" /> Edit Profile
              </button>
              <button 
                className="flex items-center w-full p-2 hover:bg-red-500 hover:text-white text-red-600 transition"
                onClick={() => {
                  localStorage.removeItem("loggedIn");
                  navigate("/login");
                }}
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </motion.div>
          )}
        </div>
      </nav>

      {/* ✅ Dashboard Content */}
      <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">User Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-gray-600">Username</label>
            <input type="text" value={userData.name} disabled className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="text-gray-600">Email ID</label>
            <input type="email" value={userData.email} disabled className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="text-gray-600">Phone Number</label>
            <input type="text" name="phone" value={userData.phone} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>

          <div className="flex items-center">
            <FaLinkedin className="text-blue-700 mr-2" />
            <input type="text" name="linkedin" value={userData.linkedin} onChange={handleChange} placeholder="LinkedIn ID" className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="text-gray-600">LeetCode ID</label>
            <input type="text" name="leetcode" value={userData.leetcode} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>

          <div className="flex items-center">
            <FaGithub className="text-gray-800 mr-2" />
            <input type="text" name="github" value={userData.github} onChange={handleChange} placeholder="GitHub ID" className="w-full p-2 border rounded" />
          </div>

          <div>
            <label className="text-gray-600">Total Score</label>
            <input type="text" name="totalScore" value={userData.totalScore} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
        </div>

        <button 
          onClick={handleSave} 
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded transition hover:bg-green-700"
        >
          Save Details
        </button>

        {/* ✅ Stats Section */}
        {stats && (
          <div className="mt-6 p-4 bg-gray-200 rounded">
            <h3 className="text-xl font-semibold">Performance Stats</h3>
            <p>Performance Score: {stats.rating}</p>
            <p>Test Taken: {stats.stock}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
