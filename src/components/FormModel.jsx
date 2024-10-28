/* eslint-disable react/prop-types */

import { motion } from "framer-motion";

const FormModel = ({ message, onClose, children }) => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center m-auto p-2 bg-black bg-opacity-50 z-[50]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white md:p-6 p-10 rounded-lg shadow-lg md:w-[60rem] md:h-[35rem] relative border-2 border-primary ">
        <div>{message}</div>
        <motion.button
          whileHover={{ scale: 1.3 }}
          onClick={onClose}
          className="absolute top-2 right-4 text-4xl font-bold text-gray-700 cursor-none"
        >
          &times;
        </motion.button>
        {children}
      </div>
    </motion.div>
  );
};

export default FormModel;
