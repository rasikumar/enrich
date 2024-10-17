/* eslint-disable react/prop-types */
import { FaBook } from "react-icons/fa";
import FormModel from "./FormModel";
import { useState } from "react";
import PsychometricForm from "./allservice/psychometric/components/PsychometricForm";
import { motion } from "framer-motion";

const BookSession = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed z-50 bottom-10 right-10 bg-secondary py-2 px-3 rounded-xl">
      <motion.button 
      
      whileTap={{ scale: 0.95 }}
      onClick={toggleModal} className="flex items-center space-x-2">
        <FaBook />
        <span>Book a Session</span>
      </motion.button>
      {isOpen && (
        <FormModel onClose={toggleModal}>{<PsychometricForm />}</FormModel>
      )}
    </div>
  );
};

export default BookSession;
