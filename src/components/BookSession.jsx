/* eslint-disable react/prop-types */
// import { FaBook } from "react-icons/fa";
import FormModel from "./FormModel";
// import PsychometricForm from "./allservice/psychometric/components/PsychometricForm";
import { motion } from "framer-motion";
import { MdOutlineDateRange } from "react-icons/md";
import Psychometric from "./forms/PsychometricForm";
import { useModal } from "@/providers/ModalContext";

const BookSession = () => {
  const { isOpen, toggleModal } = useModal();

  return (
    <div className="fixed z-[999] bottom-40 right-0 bg-secondary py-2 px-3 rounded-tl-xl">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={toggleModal}
        className="flex items-center flex-col gap-2  text-primary hover:text-white font-semibold transition-all"
      >
        <MdOutlineDateRange className="text-2xl" />
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
      {isOpen && (
        <FormModel onClose={toggleModal}>{<Psychometric />}</FormModel>
      )}
    </div>
  );
};

export default BookSession;
