 import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const SignupPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const { name, email, password } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const userRegister = async (e) => {
    e.preventDefault();
    try {
      if (name=== "" || email === "" || password === "") {
        alert("All Fields are mandatory");
      } else {
        const response = await axios.post("http://localhost:5000/api/register", {
          name,
          email,
          password,
        });
        console.log(response.data);
        navigate("/login");
      }
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <form
          className="bg-white border rounded-lg p-6 w-full max-w-sm"
          onSubmit={userRegister}
        >
          <h2 className="text-xl font-semibold mb-4">Register</h2>

          <div className="space-y-4">
            <input
            name="name"
            type="text"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name" 
              onChange={handleChange}
              value={name}
            />

            <input
            name="email"
            type="email"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email" 
              onChange={handleChange}
              value={email}
            />

            <input
              name="password"
              type="password"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              onChange={handleChange}
              value={password}
            />

            <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 duration-100 ease-in-out">
              Login
            </button>
          </div>

          <div className="my-4 border-t" />

          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignupPage