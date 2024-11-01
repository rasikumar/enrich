/* eslint-disable react/prop-types */
// import { FaBook } from "react-icons/fa";
import FormModel from "./FormModel";
import { useState } from "react";
// import PsychometricForm from "./allservice/psychometric/components/PsychometricForm";
import { motion } from "framer-motion";
import { GrSchedule } from "react-icons/gr";
import Discovery from "./forms/Discovery";

const BookSession = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed z-50 bottom-40 right-0 bg-secondary py-2 px-3 rounded-tl-xl">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={toggleModal}
        className="flex items-center flex-col gap-2"
      >
        <GrSchedule className="text-2xl" />
        {/* <div className="flex leading-4 items-center">
          <span>B</span>
          <span>o</span>
          <span>o</span>
          <span>k</span>
        </div> */}
        {/* <span>a</span> */}
        <div className="flex leading-5">
          <span>C</span>
          <span>o</span>
          <span>n</span>
          <span>s</span>
          <span>u</span>
          <span>l</span>
          <span>t</span>
        </div>
      </motion.button>
      {isOpen && <FormModel onClose={toggleModal}>{<Discovery />}</FormModel>}
    </div>
  );
};

export default BookSession;
