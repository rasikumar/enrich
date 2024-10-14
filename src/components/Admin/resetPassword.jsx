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
  const [message, setMessage] = useState("");

  // Extract token from the query parameters
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/admin"); // Redirect to login page if token is not present
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const response = await Instance.post(`/auth/resetPassword/${token}`, {
        token,
        newPassword,
      });
      setMessage(response.data.message);
      toast.success(response.data.message);
      navigate("/admin");
    } catch (err) {
      setError("Failed to reset password.", err);
    }
  };

  return (
    <div>
      {token ? (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
          <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center">
              Reset Your Password
            </h2>
            {error && <div className="text-red-500 text-center">{error}</div>}
            {message && (
              <div className="text-green-500 text-center">{message}</div>
            )}
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Reset Password
              </button>
            </form>
            <p className="text-center text-gray-500 text-sm">
              @{new Date().getFullYear()} Powered By EvviSolutions
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ResetPassword;
