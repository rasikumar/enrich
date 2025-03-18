import { useState } from "react";
import Instance from "../Admin/Instance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  // const [message, setMessage] = useState("");
  // const [error, setError] = useState("");
  const validateEmail = (email) => {
    // Email validation regex: checks for valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.length < 3 || email.length > 254) {
      toast.error("Email must be between 3 and 254 characters long.");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Invalid email format.");
      return;
    }

    try {
      const response = await Instance.post("/auth/requestPasswordReset", {
        email,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Email is not registered");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-center">Forgot Password</h2>
        {/* {message && <div className="text-green-500 text-center">{message}</div>} */}
        {/* {error && <div className="text-red-500 text-center">{error}</div>} */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
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
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Send Reset Link
            </button>
            <p className="text-center text-gray-500 text-sm">
              @{new Date().getFullYear()} Powered By Evvi Solutions
            </p>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ForgotPassword;
