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
      className="absolute -z-50 w-full h-[200vw]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <svg
        width="1000"
        height="2000"
        viewBox="0 0 1000 2000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -top-36 left-0 w-full h-full squiggle md:flex hidden"
      >
        <path
          //   d="M-24.5 101C285 315 5.86278 448.291 144.223 631.238C239.404 757.091 559.515 782.846 608.808 617.456C658.101 452.067 497.627 367.073 406.298 426.797C314.968 486.521 263.347 612.858 322.909 865.537C384.086 1125.06 79.3992 1007.94 100 1261.99C144.222 1807.35 819 1325 513 1142.5C152.717 927.625 -45 1916.5 1191.5 1852"
          d="M1,106C293.6990093311958,156.98197064989517,319.39801866239156,207.96394129979035,282,250C244.6019813376084,292.03605870020965,144.10693468162947,325.1262054507337,89,388C33.89306531837054,450.8737945492663,24.174242611090563,543.5312368972745,18,666C11.82575738890944,788.4687631027255,9.196094874008299,940.7488469601676,13,1056C16.8039051259917,1171.2511530398324,27.04137789287624,1249.4733752620546,71,1351C114.95862210712376,1452.5266247379454,192.6383935544868,1577.3576519916141,242,1659C291.3616064455132,1740.6423480083859,312.40504788917667,1779.0960167714886,268,1879C223.59495211082336,1978.9039832285114,113.74141488880667,2140.258280922432,88,2337C62.25858511119333,2533.741719077568,120.62929255559666,2765.8708595387843,179,2998"
          stroke="#CD3C2F"
          strokeWidth="10"
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
