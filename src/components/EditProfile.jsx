import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    phone: "",
    linkedin: "",
    leetcode: "",
    github: "",
  });

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("UserDetails"));
    if (userDetails) {
      setUserData(userDetails);
    }
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem("UserDetails", JSON.stringify(userData));
    alert("Profile Updated!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

        <input type="text" name="phone" value={userData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full p-2 border rounded mb-2" />
        <input type="text" name="linkedin" value={userData.linkedin} onChange={handleChange} placeholder="LinkedIn ID" className="w-full p-2 border rounded mb-2" />
        <input type="text" name="leetcode" value={userData.leetcode} onChange={handleChange} placeholder="LeetCode ID" className="w-full p-2 border rounded mb-2" />
        <input type="text" name="github" value={userData.github} onChange={handleChange} placeholder="GitHub ID" className="w-full p-2 border rounded mb-2" />

        <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
      </div>
    </div>
  );
};

export default EditProfile;
