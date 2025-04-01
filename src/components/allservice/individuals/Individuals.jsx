import { Helmet } from "react-helmet";
import Hero from "./Hero";
import Methodology from "./Methodology";
import Programs from "./Programs";
import Skill from "./Skill";
import Training from "./Training";
import { motion } from "framer-motion";
import Cursor from "@/components/Cursor";

const pageVariants = {
  initial: { opacity: 0, y: 0 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: "-100vw" },
};
const pageTransition = {
  type: "linear",
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.4,
};
const Individuals = () => {
  return (
    <>
      <Helmet>
        <title>Individuals | Enrich Minds</title>
        <meta
          name="keywords"
          content="Behavioral skills training,Personal growth,Essential behavioral skills,Communication skills,Emotional intelligence,Professional settings,Personal development,Upskill,Corporate success,"
        />
      </Helmet>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Cursor />
        <Hero />
        <Training />
        <Methodology />
        <Skill />
        <Programs />
      </motion.div>
    </>
  );
};

export default Individuals;
