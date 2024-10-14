import { useState } from "react";
import Instance from "./Instance";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Instance.post("/auth/requestPasswordReset", {
        email,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        setMessage(response.data.message);
      } else {
        setError("Failed to send password reset link.");
      }
    } catch (err) {
      setError("Error sending password reset link.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-center">Forgot Password</h2>
        {message && <div className="text-green-500 text-center">{message}</div>}
        {error && <div className="text-red-500 text-center">{error}</div>}
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
              @{new Date().getFullYear()} Powered By EvviSolutions
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
