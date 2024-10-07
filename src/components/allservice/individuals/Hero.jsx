import { motion } from "framer-motion";
import { Individuals_Content } from "../index";

const Hero = () => {
  const { title, content } = Individuals_Content[0];
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}

    className="flex md:p-24 p-10 items-center justify-center gap-36">
      <div className="md:w-[28rem] flex flex-col gap-6">
        <h1 className="md:text-5xl text-3xl text-primary font-bold">{title}</h1>
        <p className="md:text-lg text-sm">{content}</p>
      </div>
      <div className="hidden md:flex">
        <img src="https://dummyimage.com/600x400" alt="#" className="rounded-xl border border-primary shadow-drop" />
      </div>
    </motion.div>
  );
};

export default Hero;
