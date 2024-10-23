// components/Admin/Login.js
/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Instance from "./Instance";
import Evvi_new from "../../assets/logo.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [error, setError] = useState("");

  // Helper function to validate email
  const validateEmail = (email) => {
    // Email validation regex: checks for valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if email meets the validation criteria
    if (email.length < 3 || email.length > 254) {
      toast.error("Email must be between 3 and 254 characters long.");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Invalid email format.");
      return;
    }

    try {
      const response = await Instance.post("/admin/login", { email, password });

      if (response.status === 200 && response.data.token) {
        localStorage.setItem("jwtToken", response.data.token);
        onLogin(); // Notify App of successful login
        toast.success(response.data.message || "Login Success!");
        setTimeout(() => {
          navigate("/admindashboard"); // Redirect to the dashboard
        }, 1000);
        console.log(response.data.message);
      } else {
        toast.error("Invalid email or password");
      }
    } catch (err) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
        <img src={Evvi_new} alt="Logo" width={100} className="m-auto" />
        <p className="text-center text-gray-500">
          Please login to your account
        </p>
        {/* {error && (
          <div className="text-red-500 text-center text-sm">{error}</div>
        )} */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="inline-flex relative">
              <label htmlFor="password" className="sr-only">
                Passwords
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-[0.7rem] right-2 z-50"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link
              to="/forgotpassword"
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </Link>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>

          <p className="text-center text-gray-500 text-sm">
            @{new Date().getFullYear()} Powered By EvviSolutions
          </p>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
