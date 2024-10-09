import AnchorLink from "react-anchor-link-smooth-scroll";
// import { heroimg } from "../assets";
import { motion } from "framer-motion";
import "../index.css";

const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      id="hero"
      className="bg-Hero bg-no-repeat -mt-[5.4rem] bg-cover bg-center p-4 md:p-10 py-26 flex flex-col-reverse md:flex-row justify-evenly items-center min-h-64 z-0 h-[520px] xl:h-[620px] "
    >
      <motion.div
        initial={{ x: -50 }}
        animate={{ x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full md:w-[480px] flex flex-col gap-2 hero-content mt-5"
      >
        <h1 className="text-2xl md:text-4xl xl:text-4xl text-center font-semibold text-secondary">
          Enrich Your Life
          {/* <br /> */}
          {/* Be Your Best Self */}
        </h1>
        <p className="xl:text-2xl md:text-sm text-white mb-3 text-center">
          Enhance Your Skills, Nurture Your Talent, and Be Your Best Self
        </p>
        <AnchorLink
          href="#getIn"
          className="btn-primary text-center transform transition duration-300 hover:scale-105"
        >
          Get In Touch
        </AnchorLink>
      </motion.div>

      {/* <motion.div
        className="relative"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <img
          src={heroimg}
          className="w-full md:w-80 h-auto md:h-80 object-cover rounded-lg drop-shadow-2xl hover:drop-shadow-none hover:scale-95 xl:w-[420px] xl:h-96 transition delay-75 -z-20 hero-image"
          alt="Hero"
        />
      </motion.div> */}
    </motion.div>
  );
};

export default Hero;
