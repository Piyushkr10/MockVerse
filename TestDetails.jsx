import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";

// ✅ Import Images
import tcsImage from "../assets/tcs.png";
import wiproImage from "../assets/wipro.png";
import infosysImage from "../assets/infosys.png";

// ✅ Test Data with Images
const testDetailsData = {
  "tcs-mock-test": {
    name: "TCS Mock Test",
    category: "Aptitude",
    description:
      "This test includes questions on quantitative aptitude, logical reasoning, and verbal ability to prepare for TCS hiring exams.",
    duration: "60 mins",
    totalQuestions: 20,
    difficulty: "Medium",
    passingScore: "50%",
    image: tcsImage,
  },
  "wipro-online-test": {
    name: "Wipro Online Test",
    category: "Logical Reasoning",
    description:
      "This test evaluates your logical reasoning skills with a mix of puzzles, analytical reasoning, and data interpretation questions.",
    duration: "45 mins",
    totalQuestions: 15,
    difficulty: "Easy",
    passingScore: "60%",
    image: wiproImage,
  },
  "infosys-coding-test": {
    name: "Infosys Coding Test",
    category: "Programming",
    description:
      "Solve coding problems in C, Java, or Python that test problem-solving skills and algorithmic thinking.",
    duration: "90 mins",
    totalQuestions: 10,
    difficulty: "Hard",
    passingScore: "40%",
    image: infosysImage,
  },
};

const TestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [testDetails, setTestDetails] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    setTestDetails(testDetailsData[id]);

    // ✅ Get User Data from LocalStorage
    const user = JSON.parse(localStorage.getItem("Users"));
    if (user) {
      setUserName(user.name);
    } else {
      navigate("/login");
    }
  }, [id, navigate]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
    window.location.reload();
  };

  if (!testDetails) {
    return <div className="text-center text-xl font-bold text-red-500 mt-10">Test not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      {/* ✅ Navbar */}
      <nav className="bg-blue-500 p-4 flex justify-between items-center shadow-md">
        <h1 className="text-white text-xl font-bold">MockVerse</h1>

        {/* ✅ Welcome Message */}
        <motion.div
          className="text-white text-lg font-semibold flex items-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <span>Welcome,</span>
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
          <FaUserCircle
            className="text-white text-3xl cursor-pointer hover:opacity-80"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />

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
                <li
                  className="p-3 cursor-pointer hover:bg-blue-500 hover:text-white transition"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </li>
                <li
                  className="p-3 cursor-pointer hover:bg-green-500 hover:text-white transition"
                  onClick={() => navigate("/results")}
                >
                  Your Score
                </li>
                <li
                  className="p-3 bg-white text-red-500 font-bold cursor-pointer hover:bg-red-500 hover:text-white transition"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </motion.div>
          )}
        </div>
      </nav>

      {/* ✅ Test Info Box */}
      <div className="flex flex-col items-center mt-10 p-6">
        {/* ✅ Test Details Box (90% Width) */}
        <div className="bg-white shadow-lg rounded-lg p-8 w-11/12 max-w-5xl text-center relative">
          <img src={testDetails.image} alt={testDetails.name} className="w-40 h-40 mx-auto mb-4 rounded-lg" />
          <h2 className="text-3xl font-bold text-gray-800">{testDetails.name}</h2>
          <p className="text-gray-600 text-lg">{testDetails.description}</p>
          <p className="text-gray-500 mt-2 text-lg">Duration: {testDetails.duration}</p>
          <p className="text-gray-500 text-lg">Total Questions: {testDetails.totalQuestions}</p>
          <p className="text-gray-500 text-lg">Difficulty: {testDetails.difficulty}</p>
          <p className="text-gray-500 text-lg">Passing Score: {testDetails.passingScore}</p>

          {/* ✅ Buttons at Opposite Ends */}
          <div className="flex justify-between mt-6 w-full px-4">
            {/* Back Button */}
            <button
              className="bg-gray-500 text-white px-6 py-2 rounded-lg text-lg font-semibold transition hover:bg-gray-700 hover:text-yellow-300"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>

            {/* Start Test Button */}
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-lg text-lg font-semibold transition hover:bg-blue-900 hover:text-yellow-300"
              onClick={() => alert("Test Started! (Redirect to test page logic goes here)")}
            >
              Start Test →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDetails;
