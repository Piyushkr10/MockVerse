import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    // Store user details with password
    localStorage.setItem("Users", JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password
    }));

    localStorage.setItem("loggedIn", "true"); // ✅ Store login status
    toast.success("Signed up successfully!");
    navigate("/"); // ✅ Redirect to home page
  };
  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border mb-3 rounded"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}

          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border mb-3 rounded"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border mb-3 rounded"
            {...register("password", { required: "Password is required", minLength: 6 })}
          />
          {errors.password && <span className="text-red-500">Password must be at least 6 characters</span>}

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-2 border mb-3 rounded"
            {...register("confirmPassword", {
              required: "Confirm password is required",
              validate: (value) => value === watch("password") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}

          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
            Sign Up
          </button>
        </form>

        <p className="mt-4">
          Already have an account? <a href="/login" className="text-blue-500">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;