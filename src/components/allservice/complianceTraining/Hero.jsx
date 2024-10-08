import { motion } from "framer-motion";
import { Compliance_Content } from "../index";

const Hero = () => {
  const { title, content } = Compliance_Content[0];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="md:flex md:px-24 py-10 px-4 items-center justify-center gap-36"
    >
      <div className="md:w-[28rem] flex flex-col md:gap-6 gap-2 max-md:mb-4">
        <h1 className="xl:text-5xl lg:text-4xl text-4xl  text-primary font-bold">{title}</h1>
        <p className="xl:text-lg text-sm">{content}</p>
      </div>
      <div>
        <img
          src="https://dummyimage.com/600x400"
          alt="#"
          className="rounded-xl border border-primary shadow-drop"
        />
      </div>
    </motion.div>
  );
};

export default Hero;
