/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ScrollIndicator = ({ color = "#203B93", showText = false }) => {
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setProgressWidth(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full ">
      <motion.div
        className="h-1 fixed z-50"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${progressWidth}%` }}
        transition={{ ease: "easeOut", duration: 0.5 }}
      >
        {showText && (
          <span className="text-sm ml-2">{Math.round(progressWidth)}%</span>
        )}
      </motion.div>
    </div>
  );
};

export default ScrollIndicator;
