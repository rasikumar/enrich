// /* eslint-disable react/prop-types */
// import { useState, useRef, useEffect } from "react";
// import { gsap } from "gsap";
// // import { behavioral, compliance, corporate } from "../../assets";
// import { Link } from "react-router-dom";

import { useState } from "react";
import { serviceList } from "../../constant";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion } from "framer-motion";

// // Arrow Icon Component
// // eslint-disable-next-line react/prop-types
// const ArrowIcon = ({ isOpen }) => (
//   <svg
//     className={`transform transition-transform duration-300 ${
//       isOpen ? "rotate-90" : "rotate-0"
//     }`}
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M9 18L15 12L9 6"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// // eslint-disable-next-line react/prop-types
// const Services = ({
//   question,
//   image,
//   answer,
//   title,
//   link,
//   btn,
//   index,
//   currentIndex,
//   setCurrentIndex,
//   subTitleFirst,
//   subTitleSecond,
//   subContentFirst,
//   subContentSecond,
// }) => {
//   const answerRef = useRef(null);
//   const itemRef = useRef(null);
//   const isOpen = currentIndex === index;

//   useEffect(() => {
//     const tl = gsap.timeline();
//     if (isOpen) {
//       tl.to(answerRef.current, { height: "auto", opacity: 1, duration: 0.3 });
//     } else {
//       tl.to(answerRef.current, { height: 0, opacity: 0, duration: 0.3 });
//     }
//   }, [isOpen]);

//   const handleToggle = () => {
//     if (isOpen) {
//       setCurrentIndex(null);
//     } else {
//       setCurrentIndex(index);
//     }
//   };

//   const handleMouseEnter = () => {
//     gsap.to(itemRef.current, { scale: 1.05, duration: 0.3 });
//   };

//   const handleMouseLeave = () => {
//     gsap.to(itemRef.current, { scale: 1, duration: 0.3 });
//   };

//   return (
//     <div
//       ref={itemRef}
//       className="border max-w-2xl m-auto px-4 bg-gray-200 rounded-sm mt-5 py-4 mb-6"
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <button
//         className="w-full text-left focus:outline-none flex items-center justify-between"
//         onClick={handleToggle}
//       >
//         <h3 className="xl:text-2xl text-start font-semibold text-gray-900">
//           {question}
//         </h3>
//         <ArrowIcon isOpen={isOpen} />
//       </button>
//       <div
//         ref={answerRef}
//         className={`overflow-hidden transition-all duration-300`}
//       >
//         {isOpen && (
//           <div className="mt-4 flex flex-col gap-3 ">
//             <img
//               src={image}
//               width={200}
//               alt={title}
//               className="mb-4 mt-2 rounded-md m-auto"
//             />
//             <p className="mt-2 text-sm xl:text-lg text-gray-700">{answer}</p>
//             <p>{subTitleFirst}</p>
//             <p>{subContentFirst}</p>
//             <p>{subTitleSecond}</p>
//             <p>{subContentSecond}</p>
//             <Link
//               to={link}
//               className="text-black xl:text-lg text-sm font-bold transition delay-100 hover:text-yellow-700 hover:font-bold pt-3"
//             >
//               {btn}
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const ServiceList = () => {
//   const [currentIndex, setCurrentIndex] = useState(null);

//   // const list = [
//   //   {
//   //     id: 1,
//   //     question: "Behavioral Skills for Individuals",
//   //     answer:
//   //       "We offer tailor-made training programs to empower individuals and teams through targeted skill enhancement and practical strategies.",
//   //     image: behavioral,
//   //     subTitleFirst: "hello",
//   //     subContentFirst:
//   //       "Focused training aimed at personal growth, emotional intelligence, and effective communication.",
//   //     subTitleSecond: "Second",
//   //     subContentSecond:
//   //       "Focused training aimed at personal growth, emotional intelligence, and effective communication.",
//   //     btn: "Explore Programs",
//   //   },
//   //   {
//   //     id: 3,
//   //     question: "Compliance Training",
//   //     answer:
//   //       "Stay compliant with our specialized training programs, including POSH (Prevention of Sexual Harassment). We guide organizations in creating safe and respectful workplaces, ensuring adherence to legal standards and promoting a positive corporate culture.",
//   //     image: compliance,
//   //     btn: "View Services",
//   //   },
//   //   {
//   //     id: 2,
//   //     question: "Psychometric Assessments & Counseling",
//   //     answer:
//   //       "We provide comprehensive psychometric assessments to gain insights into personality traits and cognitive abilities. Our psychological counseling services, informed by evidence-based practices, support individuals in their journey toward self-discovery and personal growth.",
//   //     image: corporate,
//   //     btn: "Book a Session",
//   //   },

//   //   // {
//   //   //   id: 4,
//   //   //   question: "1:1 Coaching",
//   //   //   answer:
//   //   //     "Achieve excellence with personalized coaching sessions. Whether you're looking to transform behavior, optimize brain function, or focus on self-improvement, our expert coaches are here to guide you.",
//   //   //   image: onetraining,
//   //   //   btn: "Book a Session",
//   //   // },
//   // ];

//   return (
//     <div className="bg-white mt-7">
//       <div className="mx-auto p-4" id="service">
//         <div className="flex flex-col gap-4 px-10">
//           <h2 className="text-black text-4xl font-semibold text-center">
//             Services
//           </h2>
//           <h3 className="text-center xl:text-2xl text-lg w-full font-[600]">
//             Discover Your Journey: Tailored for You
//           </h3>
//           <p className="text-sm xl:text-lg text-gray-500 md:w-[80%] m-auto">
//             We recognize that growth is personal. we are committed to empowering
//             individuals and organizations through targeted training and
//             assessments. Our evidence-based programs foster personal growth and
//             enhance workplace dynamics, paving the way for lasting success.
//           </p>
//         </div>

//         {list.map((item, index) => (
//           <Services
//             key={index}
//             index={index}
//             currentIndex={currentIndex}
//             setCurrentIndex={setCurrentIndex}
//             link={`/ServiceList/${item.id}`}
//             {...item}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ServiceList;

const Services = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="bg-white mt-7">
      {" "}
      <div className="mx-auto p-4">
        {" "}
        <div className="flex flex-col gap-4 px-10">
          {" "}
          <h2 className="text-black text-4xl font-semibold text-center">
            Services{" "}
          </h2>{" "}
          <h3 className="text-center xl:text-2xl text-lg w-full font-[600]">
            Discover Your Journey: Tailored for You{" "}
          </h3>{" "}
          <p className="text-sm xl:text-lg text-gray-500 md:w-[80%] m-auto">
            We recognize that growth is personal. we are committed to empowering
            individuals and organizations through targeted training and
            assessments. Our evidence-based programs foster personal growth and
            enhance workplace dynamics, paving the way for lasting success.{" "}
          </p>{" "}
          {serviceList.map((service, index) => (
            <div
              key={service.id}
              className="border p-4 flex flex-col w-[50%] bg-gray-200 m-auto"
            >
              <div
                className=" cursor-pointer text-lg md:text-xl font-semibold flex justify-between text-center items-center"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-gray-800">{service.question}</h3>
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
                  <p className="text-gray-600 mb-2">{service.answer}</p>

                  {/* Sub-sections if available */}
                  {service.subTitleFirst && (
                    <div className="sub-section mb-4">
                      <h4 className="text-md font-medium">
                        {service.subTitleFirst}
                      </h4>
                      <p className="text-gray-500">{service.subContentFirst}</p>
                      {/* <img
                        src={service.image}
                        alt={service.subContentFirst}
                        width={200}
                        height={200}
                        className="m-auto"
                      /> */}
                      {service.subBtnFirst && (
                        <Link to={service.subBtnFirst}>
                          <button className="mt-2 bg-primary text-white px-4 py-2 rounded-md">
                            {service.subTitleFirst}
                          </button>
                        </Link>
                      )}
                    </div>
                  )}

                  {service.subTitleSecond && (
                    <div className="sub-section mb-4">
                      <h4 className="text-md font-medium">
                        {service.subTitleSecond}
                      </h4>
                      <p className="text-gray-500">
                        {service.subContentSecond}
                      </p>
                      {service.subBtnSecond && (
                        <Link to={service.subBtnSecond}>
                          <button className="mt-2 bg-primary text-white px-4 py-2 rounded-md">
                            {service.subTitleSecond}
                          </button>
                        </Link>
                      )}
                    </div>
                  )}

                  {/* Main Button */}
                  {service.btn && (
                    <Link
                      to={
                        service.path ||
                        "https://survey.evvisolutions.com/webinar/"
                      }
                    >
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
  );
};

export default Services;
