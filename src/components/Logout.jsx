import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn"); // Remove login status
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Are you sure you want to log out?</h2>
      <button 
        onClick={handleLogout} 
        className="px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;