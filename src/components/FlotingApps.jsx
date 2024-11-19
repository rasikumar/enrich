import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaWhatsapp,
  FaLinkedin,
  FaInstagram,
  FaShareAlt,
} from "react-icons/fa";

const FlotingApps = () => {
  const [isClicked, setIsClicked] = useState(false); // State to track click status

  // Animation variants for stagger effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Time between animations of each child
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Toggle visibility of icons on button click
  const handleClick = () => {
    setIsClicked((prev) => !prev); // Toggle the visibility on click
  };

  return (
    <div className="fixed z-50 bottom-10 md:right-24 left-4">
      {/* Floating Button */}
      <div className="relative">
        <motion.button
          className="p-4 text-center justify-center flex items-center bg-secondary text-white rounded-full shadow-lg hover:bg-secondary-dark transition-colors"
          onClick={handleClick} // Toggle visibility on click
        >
          <FaShareAlt className="text-xl" />
        </motion.button>

        {/* Social Media Icons with Framer Motion - Staggered Animation */}
        <motion.div
          className={`absolute right-2 bottom-16 flex flex-col space-y-2 ${
            isClicked ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
          variants={containerVariants}
          initial="hidden"
          animate={isClicked ? "visible" : "hidden"} // Trigger animation based on click state
        >
          <motion.a
            href="https://www.facebook.com/profile.php?id=61558628653247" // Replace with your actual link
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-gray-100 rounded-full hover:scale-110 hover:bg-gray-200"
            variants={itemVariants}
          >
            <FaFacebook className="text-blue-600 text-xl" />
          </motion.a>

          <motion.a
            href="https://wa.me/+919900976464?text=Hello!%20I%20am%20interested%20in%20learning%20more%20about%20your%20company." // Replace with your WhatsApp link
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-gray-100 rounded-full hover:scale-110 hover:bg-gray-200"
            variants={itemVariants}
          >
            <FaWhatsapp className="text-green-500 text-xl" />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/company/enrichminds-consulting/" // Replace with your LinkedIn link
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-gray-100 rounded-full hover:scale-110 hover:bg-gray-200"
            variants={itemVariants}
          >
            <FaLinkedin className="text-blue-700 text-xl" />
          </motion.a>

          <motion.a
            href="https://www.instagram.com/enrichminds4u/" // Replace with your Instagram link
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-gray-100 rounded-full hover:scale-110 hover:bg-gray-200"
            variants={itemVariants}
          >
            <FaInstagram className="text-pink-500 text-xl" />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default FlotingApps;
