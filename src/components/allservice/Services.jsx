

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { behavioral, compliance, corporate, onetraining } from '../../assets';

// Arrow Icon Component
// eslint-disable-next-line react/prop-types
const ArrowIcon = ({ isOpen }) => (
  <svg
    className={`transform transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 18L15 12L9 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// eslint-disable-next-line react/prop-types
const Services = ({ question, image, answer, title, btn, index, currentIndex, setCurrentIndex }) => {
  const answerRef = useRef(null);
  const itemRef = useRef(null);
  const isOpen = currentIndex === index;

  useEffect(() => {
    const tl = gsap.timeline();
    if (isOpen) {
      tl.to(answerRef.current, { height: 'auto', opacity: 1, duration: 0.3 });
    } else {
      tl.to(answerRef.current, { height: 0, opacity: 0, duration: 0.3 });
    }
  }, [isOpen]);

  const handleToggle = () => {
    if (isOpen) {
      setCurrentIndex(null);
    } else {
      setCurrentIndex(index);
    }
  };

  const handleMouseEnter = () => {
    gsap.to(itemRef.current, { scale: 1.05, duration: 0.3 });
  };

  const handleMouseLeave = () => {
    gsap.to(itemRef.current, { scale: 1, duration: 0.3 });
  };

  return (
    <div
      ref={itemRef}
      className="border max-w-2xl m-auto px-4 bg-gray-200 rounded-sm mt-5 py-4 mb-6"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="w-full text-left focus:outline-none flex items-center justify-between"
        onClick={handleToggle}
      >
        <h3 className="xl:text-2xl text-start font-semibold text-gray-900">{question}</h3>
        <ArrowIcon isOpen={isOpen} />
      </button>
      <div ref={answerRef} className={`overflow-hidden transition-all duration-300`}>
        {isOpen && (
          <div className="mt-4">
            <img src={image} width={200} loading="lazy" alt={title} className="mb-4 mt-2 rounded-md m-auto" />
            <p className="mt-2 text-sm text-gray-700">{answer}</p>
            <p className="text-black text-sm font-bold transition delay-100 hover:text-yellow-700 hover:font-bold pt-3">{btn}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ServiceList = () => {
  const [currentIndex, setCurrentIndex] = useState(null);

  const list = [
    {
      question: "Corporate Training",
      answer: "Customized programs designed to enhance essential soft skills for any work environment. We serve businesses of all sizes and industries, providing your team with tools for effective communication, leadership, teamwork, and more...",
      image: corporate,
      btn: 'Learn More'
    },
    {
      question: "Behavioral Skills for Individuals",
      answer: "Empower yourself with specialized behavioral training. Ideal for professionals, fresh graduates, and anyone aiming for personal growth. Develop crucial skills like emotional intelligence, communication, and work-life balance.",
      image: behavioral,
      btn: 'Explore Programs'
    },
    {
      question: "Compliance Trainings",
      answer: "Stay compliant and ensure a safe workplace with comprehensive compliance training. Offerings include Prevention of Sexual Harassment (POSH) training, employee sensitization, and more, ensuring your organization meets all standards.",
      image: compliance,
      btn: 'View Services'
    },
    {
      question: "1:1 Coaching",
      answer: "Achieve excellence with personalized coaching sessions. Whether you're looking to transform behavior, optimize brain function, or focus on self-improvement, our expert coaches are here to guide you.",
      image: onetraining,
      btn: 'Book a Session'
    },
  ];

  return (
    <div className="bg-white mt-7">
      <div className="mx-auto p-4" id="service">
        <div className="flex flex-col gap-4 px-10">
          <h2 className="text-black text-4xl font-semibold text-center">Services</h2>
          <h3 className="text-center xl:text-2xl text-lg w-full font-[600]">Discover Your Journey: Tailored for You</h3>
          <p className="text-sm text-gray-500 md:w-[80%] m-auto">We recognize that growth is personal, whether you&apos;re an individual seeking to refine your skills or a company looking to empower your workforce. Our Behavioral Skills Training programs and coaching services are thoughtfully categorized to cater to your unique needs.</p>
        </div>
        {list.map((item, index) => (
          <Services
            key={index}
            index={index}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceList;
