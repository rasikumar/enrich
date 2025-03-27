import { motion } from "framer-motion";
import { IoArrowBackCircle } from "react-icons/io5";
import "./Program.css";
import { useNavigate } from "react-router-dom";
import { programDisplays } from "../../constant";
import { Suspense } from "react";
import { Helmet } from "react-helmet";
import Cursor from "../Cursor";

const Skeleton = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <img
        src="https://via.placeholder.com/500x500"
        alt="Placeholder"
        className="w-32 h-32"
        loading="lazy"
      />
      <div className="text-center mt-5">
        <p>Loading...</p>
      </div>
    </div>
  );
};

const ProgramDisplay = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Our Programs | Enrich Minds</title>
        <meta
          name="description"
          content="Discover our various programs at Enrich."
        />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="cursor-none"
      >
        <Cursor />
        <h1 className="bg-yellow-500 relative p-10 text-center font-semibold text-3xl">
          <IoArrowBackCircle
            className="text-3xl absolute bottom-11 left-0"
            onClick={() => navigate(-1)}
          />
          Our Programs
        </h1>
        <div className="m-auto w-[90%] ">
          <Suspense fallback={<Skeleton />}>
            <section className="grid md:grid-cols-4 md:grid-rows-2 w-full m-auto">
              {programDisplays.map((programDisplay, index) => (
                <div
                  key={index}
                  className="card group relative w-[250px] h-[250px] m-5 perspective"
                >
                  {/* The box that rotates on hover */}
                  <div className="box relative w-full h-full transition-transform duration-1000 ease-in-out transform-style preserve-3d group-hover:rotate-y-180">
                    {/* Front Side */}
                    <div className="imgBx absolute w-full h-full backface-hidden">
                      <img
                        src={programDisplay.img} // Placeholder image for demonstration
                        alt={programDisplay.content}
                        loading="lazy"
                        className="absolute top-0 left-0 w-full h-full object-cover"
                      />
                      {/* <h2 className="text-lg mb-2 z-20 p-2 absolute text-white w-full">{programDisplay.title}</h2> */}
                    </div>

                    {/* Back Side */}
                    <div className="contentBx absolute w-full h-full bg-gray-800 text-white flex justify-center items-center backface-hidden transform rotate-y-180">
                      <div className="p-5 bg-gradient-to-br from-pink-500/50 to-transparent transform translate-z-[100px]">
                        <h2 className="text-lg mb-2">{programDisplay.title}</h2>
                        <p className="text-xs">{programDisplay.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </Suspense>
        </div>
      </motion.div>
    </>
  );
};

export default ProgramDisplay;
