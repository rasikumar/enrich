import { useState } from "react";
import { serviceList } from "../../constant";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion } from "framer-motion";
import Cursor from "../Cursor";
// import Cursor from "../Cursor";

const Services = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <>
      <div className="bg-white mt-7">
        <Cursor />

        <div className="mx-auto p-4">
          {" "}
          <div className="flex flex-col gap-4 md:px-10">
            {" "}
            <h2 className="text-black md:text-4xl text-2xl font-semibold text-center">
              Services{" "}
            </h2>{" "}
            <h3 className="text-center xl:text-2xl text-lg w-full font-[600]">
              Discover Your Journey: Tailored for You{" "}
            </h3>{" "}
            <p className="text-sm xl:text-lg text-gray-500 md:w-[80%] m-auto text-justify">
              We recognize that growth is personal. we are committed to
              empowering individuals and organizations through targeted training
              and assessments. Our evidence-based programs foster personal
              growth and enhance workplace dynamics, paving the way for lasting
              success.{" "}
            </p>{" "}
            {serviceList.map((service, index) => (
              <div
                key={service.id}
                className="border p-4 flex flex-col md:w-[50%] w-full bg-gray-200 m-auto"
              >
                <div
                  className=" cursor-pointer text-lg md:text-xl font-semibold flex justify-between md:text-center items-center"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-gray-800 max-md:text-base">
                    {service.question}
                  </h3>
                  <span className="text-gray-600">
                    {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </div>

                {/* Answer Section */}
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0.0, 0.6, 1] }}
                    className="faq-answer mt-4 text-justify"
                  >
                    <p className="text-gray-600 mb-2 max-md:text-xs">
                      {service.answer}
                    </p>

                    {/* Sub-sections if available */}
                    {service.subTitleFirst && (
                      <div className="sub-section">
                        {/* <h4 className="text-base font-medium ">
                        {service.subTitleFirst}
                      </h4> */}
                        {/* <img
                        src={service.image}
                        alt={service.subContentFirst}
                        width={200}
                        height={200}
                        className="m-auto"
                      /> */}
                        {service.subBtnFirst && (
                          <Link to={service.subBtnFirst}>
                            <button className="btn-primary">
                              For {service.subTitleFirst}
                            </button>
                          </Link>
                        )}
                        <p className="text-gray-500  max-md:text-xs mb-2">
                          {service.subContentFirst}
                        </p>
                      </div>
                    )}

                    {service.subTitleSecond && (
                      <div className="sub-section mb-4">
                        {/* <h4 className="text-base font-medium">
                        {service.subTitleSecond}
                      </h4> */}
                        {service.subBtnSecond && (
                          <Link to={service.subBtnSecond}>
                            <button className="btn-primary">
                              For {service.subTitleSecond}
                            </button>
                          </Link>
                        )}
                        <p className="text-gray-500  max-md:text-xs">
                          {service.subContentSecond}
                        </p>
                      </div>
                    )}

                    {/* Main Button */}
                    {service.btn && (
                      <Link to={service.path}>
                        <button className="mt-4 btn-primary px-4 py-2 rounded-md">
                          {service.btn}
                        </button>
                      </Link>
                    )}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
