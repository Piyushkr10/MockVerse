import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";

// ✅ Import Background & Test Images
import backgroundImage from "/back2.jpg";
import tcsImage from "../assets/tcs.png";
import wiproImage from "../assets/wipro.png";
import infosysImage from "../assets/infosys.png";

// ✅ CardItem Component
const CardItem = ({ item, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="p-5 bg-white shadow-lg rounded-lg cursor-pointer"
    >
      <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-t-lg" />

      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
        <p className="text-gray-600">{item.description}</p>
        <p className="text-gray-500">Duration: {item.duration}</p>

        {/* ✅ View Details Button */}
        <button
          className="mt-3 w-full px-4 py-2 bg-blue-500 text-white rounded-lg transition-all hover:bg-blue-700"
          onClick={onClick}
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};

function Home() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const dropdownRef = useRef(null);

  // ✅ Redirect to login if not authenticated
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("Users"));
    if (!user) {
      navigate("/login");
    } else {
      setUserName(user.name);
    }
  }, [navigate]);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Handle logout
  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
    window.location.reload();
  };

  // ✅ Corrected Test Data
  const testItems = [
    {
      name: "TCS Mock Test",
      category: "Aptitude",
      description: "Practice for TCS placement exams.",
      duration: "60 mins",
      image: tcsImage,
    },
    {
      name: "Wipro Online Test",
      category: "Logical Reasoning",
      description: "Prepare for Wipro recruitment rounds.",
      duration: "45 mins",
      image: wiproImage,
    },
    {
      name: "Infosys Coding Test",
      category: "Programming",
      description: "Solve coding challenges for Infosys hiring.",
      duration: "90 mins",
      image: infosysImage,
    },
  ];

  // ✅ Function to handle "View Details" click
  const handleCardClick = (testName) => {
    const formattedName = testName.toLowerCase().replace(/\s+/g, "-");
    navigate(`/test/${formattedName}`);
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* ✅ Navbar */}
      <nav className="bg-blue-500 p-4 flex justify-between items-center">
        <h1 className="text-white text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
          MockVerse
        </h1>

        {/* ✅ Welcome Message */}
        <motion.div
          className="text-white text-lg font-semibold flex items-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <span>Welcome to</span>
          <motion.span
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="text-yellow-300 font-bold"
          >
            {userName}
          </motion.span>
        </motion.div>

        {/* ✅ Profile Section */}
        <div className="relative flex items-center space-x-3" ref={dropdownRef}>
          <FaUserCircle className="text-white text-3xl cursor-pointer hover:opacity-80" onClick={() => setDropdownOpen(!dropdownOpen)} />

          {/* ✅ Dropdown Menu */}
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 5 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <ul className="text-gray-700 divide-y divide-gray-300">
                <li className="p-3 cursor-pointer hover:bg-blue-500 hover:text-white transition" onClick={() => navigate("/dashboard")}>
                  Dashboard
                </li>
                <li className="p-3 cursor-pointer hover:bg-green-500 hover:text-white transition" onClick={() => navigate("/results")}>
                  Your Score
                </li>
                <li className="p-3 bg-white text-red-500 font-bold cursor-pointer hover:bg-red-500 hover:text-white transition" onClick={handleLogout}>
                  Logout
                </li>
              </ul>
            </motion.div>
          )}
        </div>
      </nav>

      {/* ✅ Test Cards Section */}
      <div className="pt-20 flex flex-col items-center min-h-screen">
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
          {testItems.map((item, index) => (
            <CardItem key={index} item={item} onClick={() => handleCardClick(item.name)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

