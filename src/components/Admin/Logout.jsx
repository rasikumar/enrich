// components/Admin/Logout.js
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert"; // Import confirm alert
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/admin"); // Redirect to admin login
    window.location.reload(); // Refresh the page to clear local storage and force login again
  };

  const showConfirmDialog = () => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-md max-w-sm mx-auto">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p>Are you sure you want to log out?</p>
            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={() => {
                  handleLogout();
                  onClose(); // Close modal after confirmation
                }}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                onClick={onClose} // Close modal on cancel
              >
                No
              </button>
            </div>
          </div>
        </div>
      ),
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
  };

  return (
    <div>
      <button
        onClick={showConfirmDialog} // Show confirmation dialog on click
        className="rounded-lg text-lg bg-red-700 p-2 text-white transition-all"
      >
        <BiLogOut />
      </button>
    </div>
  );
};

export default Logout;
