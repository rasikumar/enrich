import { useState } from "react";
import Instance from "../Admin/Instance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const [successMessage, setSuccessMessage] = useState(""); // New success message state
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Email validation regex: checks for valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setSuccessMessage(""); // Clear previous success message

    if (email.length < 3 || email.length > 254) {
      toast.error("Email must be between 3 and 254 characters long.");
      setLoading(false); // Stop loading
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Invalid email format.");
      setLoading(false); // Stop loading
      return;
    }

    try {
      const response = await Instance.post("/admin/requestPasswordReset", {
        email,
      });
      if (response.status === 200) {
        setSuccessMessage(response.data.message); // Set success message
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/admin"); // Redirect to the admin dashboard after 2 seconds
        }, 2000);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Email is not registered");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-center">Forgot Password</h2>
        {successMessage && (
          <div className="text-green-500 text-center">{successMessage}</div>
        )}
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
              disabled={loading} // Disable button while loading
              className={`w-full py-2 px-4 text-white rounded-md ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Reset Link"
              )}
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
