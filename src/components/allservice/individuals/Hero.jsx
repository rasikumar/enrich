import { motion } from "framer-motion";
import { Individuals_Content } from "../index";
import { corparates_hero } from "../../../assets";

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
      className="md:flex lg:px-24 px-4 items-center xl:justify-between lg:justify-center gap-2 h-screen -my-10 mb-5 "
      transition={{ staggerChildren: 0.3 }} // Staggering child animations
    >
      <motion.div
        className="md:w-[28rem] xl:w-[40rem] flex flex-col md:gap-6 gap-2 max-md:mb-4"
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <motion.h1
          className="xl:text-5xl lg:text-3xl text-2xl text-primary font-bold"
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
          src={corparates_hero}
          alt="#corparate_image"
          width=""
          height=""
          className="rounded-xl "
        />
      </motion.div>
    </motion.div>
  );
};

export default Hero;
