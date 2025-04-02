import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const NotFound = () => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
        <div className="flex justify-center mb-4">
          <FaExclamationTriangle className="text-red-500 text-6xl" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          404 - Page Not Found
        </h1>
        <p className="text-gray-500 mb-6">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <button
          onClick={() => navigate(-1)} // Navigate back to the previous route
          className="inline-block px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-200"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
