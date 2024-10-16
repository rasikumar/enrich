import { useRef } from "react";
import { Workplace } from "../../../assets";
import { Corporates_Content } from "../index";
import { motion, useInView } from "framer-motion";

const Skill = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 },
    transition: { duration: 0.6, ease: "easeInOut" },
  };

  const { heading, content } = Corporates_Content[3];
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ staggerChildren: 0.3, duration: 0.6, ease: "easeInOut" }}
      className="md:flex flex-row-reverse items-center justify-between gap-11 lg:px-24 px-4 md:mb-32 mb-8"
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
      <motion.div variants={fadeIn} className="">
        <img
          src={Workplace}
          alt={Workplace}
          className="rounded-xl border border-primary shadow-drop mb-4 xl:w-[500px] xl:h-[400px] h-[300px] "
        />
      </motion.div>
    </motion.div>
  );
};

export default Skill;
