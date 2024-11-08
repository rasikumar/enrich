/* eslint-disable react/prop-types */
export const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div className="bg-white p-6 rounded-lg w-[90%] h-[30rem] overflow-y-scroll scrollbar-hide">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 font-bold mb-4 float-right"
        >
          Close
        </button>
        {children}
      </div>
    </div>
  );
};
