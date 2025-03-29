import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const navigate = useNavigate();
  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    const results = JSON.parse(localStorage.getItem("TestResults")) || [];
    setTestResults(results);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Test Scores</h2>

      {testResults.length > 0 ? (
        <div className="w-full max-w-2xl">
          {testResults.map((test, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center mb-4">
              {/* Test Name */}
              <span className="text-lg font-semibold text-gray-700">{test.name}</span>

              {/* Test Score */}
              <span className="text-xl font-bold text-blue-600">{test.score} / {test.total}</span>

              {/* Test Date */}
              <span className="text-sm text-gray-500">{test.date}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No test results available.</p>
      )}

      {/* Back to Dashboard Button */}
      <button
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        onClick={() => navigate("/dashboard")}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default Results;
