import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem("Users"));

    if (user && user.email === email && user.password === password) {
      localStorage.setItem("loggedIn", "true"); // ✅ Set login status correctly
      toast.success("Login successful!");
      navigate("/"); // ✅ Redirect to Home page
      window.location.reload(); // ✅ Force re-render to apply login status
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="w-full p-2 bg-green-500 text-white rounded">
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;