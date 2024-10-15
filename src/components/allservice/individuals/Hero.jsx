import { motion } from "framer-motion";
import { Individuals_Content } from "../index";
import { IndividualHero } from "../../../assets";

const Hero = () => {
  const { title, content } = Individuals_Content[0];

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeScale = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="md:flex md:px-24 py-10 px-4 items-center justify-center gap-2 "
      transition={{ staggerChildren: 0.3 }} // Staggering child animations
    >
      <motion.div
        className="md:w-[28rem] flex flex-col md:gap-6 gap-2 max-md:mb-4"
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <motion.h1
          className="xl:text-5xl lg:text-4xl text-4xl text-primary font-bold"
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="xl:text-lg text-sm text-justify"
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }} // Slight delay after title
        >
          {content}
        </motion.p>
      </motion.div>

      <motion.div
        variants={fadeScale}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img
          src={IndividualHero}
          alt="#IndividualHero"
          width=""
          height=""
          className="rounded-xl "
        />
      </motion.div>
    </motion.div>
  );
};

export default Hero;
