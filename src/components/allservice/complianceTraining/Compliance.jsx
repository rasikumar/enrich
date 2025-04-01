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
const Businesses = () => {
  return (
    <>
      <Helmet>
        <title>Compliance | Enrich Minds</title>
        <meta
          name="keywords"
          content="Corporate training,Soft skills training,Team dynamics,Workplace effectiveness,Employee engagement,Leadership training,Customized programs,Professional development,Behavioral skills for workplace,Organizational performance,"
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

export default Businesses;
