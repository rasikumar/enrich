import { useNavigate } from "react-router-dom";

const SessionExpired = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-semibold text-red-600">Session Expired</h1>
        <p className="text-gray-600 mt-2">
          Your session has expired due to inactivity or token expiration. Please log in again to continue.
        </p>
        <button
          onClick={() => navigate("/admin")}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default SessionExpired;
