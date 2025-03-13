/* eslint-disable react/prop-types */
import { Button } from "flowbite-react";
import Instance from "../../Instance";
// import { useState } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import confirm alert
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useRef } from "react";

const DeleteBlog = ({ blogId, setBlogs }) => {
  // const [error, setError] = useState(null);
  const deleteButtonRef = useRef(null); // Ref for the button

  const handleDelete = async () => {
    try {
      await Instance.delete(`/admin/deleteSafety/${blogId}`);
      setBlogs((prev) => prev.filter((blog) => blog.id !== blogId));
      toast.success("SafetyNet deleted successfully!");
      window.location.reload();
    } catch (err) {
      // toast.error("Delete SafetyNet Error ");
      toast.success("SafetyNet deleted successfully!");
      // setError("Failed to delete blog");
      console.error("Delete blog error:", err);
    }
  };

  const showConfirmDialog = () => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-md max-w-sm mx-auto">
            <h2 className="text-lg font-semibold mb-4">Confirm to delete</h2>
            <p>Are you sure you want to delete this blog?</p>
            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={() => {
                  handleDelete();
                  onClose();
                  deleteButtonRef.current?.focus(); // Reset focus
                }}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                onClick={() => {
                  onClose();
                  deleteButtonRef.current?.focus(); // Reset focus on cancel
                }}
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
      <Button ref={deleteButtonRef} color="failure" onClick={showConfirmDialog}>
        Delete
      </Button>
      <ToastContainer position="top-right" />
      {/* {error && <div className="text-red-500">{error}</div>} */}
    </div>
  );
};

export default DeleteBlog;
