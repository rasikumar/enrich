import { motion, useInView } from "framer-motion";
import { Comprehensive_Psychometric } from "../../../assets";
import { Psychometric_Content } from "../index";
import { useRef } from "react";

const Training = () => {
  const { heading, content } = Psychometric_Content[1];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className="md:flex flex-row-reverse items-center justify-between gap-11 lg:px-24 px-4 md:mb-32 mb-8"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ staggerChildren: 0.3, duration: 0.6, ease: "easeInOut" }}
    >
      <motion.div
        variants={fadeIn}
        className="md:w-[30rem] xl:w-[32rem] lg:w-[30rem] flex flex-col md:gap-6 gap-2 max-md:mb-4"
      >
        <motion.h1
          variants={fadeIn}
          className="xl:text-3xl lg:text-2xl text-lg text-primary font-medium"
        >
          {heading}
        </motion.h1>
        <motion.p variants={fadeIn} className="text-justify xl:text-lg text-sm">
          {content}
        </motion.p>
      </motion.div>
      <motion.div variants={fadeIn} className="flex">
        <img
          src={Comprehensive_Psychometric}
          alt="Comprehensive_Psychometric"
          width=""
          height=""
          className="rounded-xl border border-primary shadow-drop xl:w-[500px] xl:h-[400px] h-[300px]"
        />
      </motion.div>
    </motion.div>
  );
};

export default Training;
