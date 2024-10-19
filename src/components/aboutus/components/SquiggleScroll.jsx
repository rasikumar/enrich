import { useEffect } from "react";
import { motion } from "framer-motion";

const SquiggleScroll = () => {
  useEffect(() => {
    const svg = document.querySelector("svg.squiggle");
    const path = svg.querySelector("path");

    const scroll = () => {
      const distance = window.scrollY;
      const totalDistance = svg.clientHeight - window.innerHeight;
      const percentage = distance / totalDistance;
      const pathLength = path.getTotalLength();

      path.style.strokeDasharray = `${pathLength}`;
      path.style.strokeDashoffset = `${pathLength * (1 - percentage)}`;
    };

    scroll();
    window.addEventListener("scroll", scroll);

    return () => window.removeEventListener("scroll", scroll);
  }, []);

  return (
    <motion.div
      className="absolute -z-10 w-full h-[200vw]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <svg
        width="133"
        height="2659"
        viewBox="0 0 133 2659"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 w-full h-full squiggle md:flex hidden"
      >
        <path
          //   d="M-24.5 101C285 315 5.86278 448.291 144.223 631.238C239.404 757.091 559.515 782.846 608.808 617.456C658.101 452.067 497.627 367.073 406.298 426.797C314.968 486.521 263.347 612.858 322.909 865.537C384.086 1125.06 79.3992 1007.94 100 1261.99C144.222 1807.35 819 1325 513 1142.5C152.717 927.625 -45 1916.5 1191.5 1852"
         d="M1.7185 1C29.0509 45.6766 81.1386 176.232 70.8304 341.039C57.9451 547.048 127.057 725.754 131.743 807.662C135.491 873.187 97.3818 1013.67 77.8587 1075.72C61.8497 1171.69 24.6777 1374.56 4.06128 1418.24C-16.5551 1461.93 72.0018 1596.95 118.857 2659"
          stroke="#CD3C2F"
          strokeWidth="3"
          strokeDasharray="20"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      {/* <svg
          width="600"
          height="800"
          viewBox="0 0 600 800"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-96 left-0 w-full h-full squiggle md:flex hidden"
        >
          <path
            d="M50,700 L150,100 L300,600 L450,150"
            fill="none"
            stroke="blue"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg> */}
    </motion.div>
  );
};

export default SquiggleScroll;
