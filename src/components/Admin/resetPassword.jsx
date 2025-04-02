import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Instance from "./Instance"; // Import your axios instance
import { toast } from "react-toastify";

const ResetPassword = () => {
  const location = useLocation(); // Get the location object
  const navigate = useNavigate(); // Hook for navigation
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState("");

  // Extract token from the query parameters
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/admin"); // Redirect to login page if token is not present
    }
  }, [token, navigate]);

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long.";
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!hasNumber) {
      return "Password must contain at least one number.";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character.";
    }
    return "";
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    const error = validatePassword(password);
    setValidationError(error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validationError) {
      setError(validationError);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError(""); // Clear error if passwords match
    try {
      const response = await Instance.post(`/admin/resetPassword/${token}`, {
        newPassword,
      });
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/admin"); // Redirect to login page
      }, 2000);
    } catch (err) {
      setError("Failed to reset password.", err);
    }
  };

  useEffect(() => {
    if (newPassword === confirmPassword) {
      setError(""); // Clear error when passwords match
    }
  }, [newPassword, confirmPassword]);

  return (
    <div>
      {token ? (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
          <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center">
              Reset Your Password
            </h2>
            {error && <div className="text-red-500">{error}</div>}
            {/* {message && (
              <div className="text-green-500 text-center">{message}</div>
            )} */}
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={handlePasswordChange}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
                {validationError && (
                  <div className="text-red-500 text-sm mt-1">
                    {validationError}
                  </div>
                )}
              </div>
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                  className="mr-2"
                />
                <label htmlFor="showPassword" className="text-sm text-gray-600">
                  Show Password
                </label>
              </div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Reset Password
              </button>
            </form>
            <p className="text-center text-gray-500 text-sm">
              @{new Date().getFullYear()} Powered By Evvi Solutions
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ResetPassword;
