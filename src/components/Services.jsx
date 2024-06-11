import Image from '../assets/heroImage.jpg'
import  { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

// eslint-disable-next-line react/prop-types
const Services = ({ question, answer, title,more, index, currentIndex, setCurrentIndex }) => {
  const [isOpen, setIsOpen] = useState(currentIndex === index);
  const answerRef = useRef(null);
  const itemRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(answerRef.current, { height: 'auto', opacity: 1, duration: 0.1 });
    } else {
      gsap.to(answerRef.current, { height: 0, opacity: 0, duration: 0.1 });
    }
  }, [isOpen]);

  const handleToggle = () => {
    if (isOpen && currentIndex === index) {
      setIsOpen(false);
      setCurrentIndex(null);
    } else {
      setIsOpen(true);
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
      className="border max-w-2xl m-auto  px-4 border-yellow-600 rounded-sm mt-5 py-4 mb-6"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="w-full  text-left focus:outline-none "
        onClick={handleToggle}
      >
        <h3 className="text-lg font-semibold text-gray-900">{question}</h3>
        <p className="mt-2 text-sm text-gray-700">{answer}</p>
        <p className='text-black text-sm font-bold transition delay-100 hover:text-yellow-700 hover:font-bold pt-3'>Readmore</p>
      </button>
      <div ref={answerRef} className={`overflow-hidden ${isOpen ? 'h-auto' : 'h-0'} opacity-${isOpen ? '100' : '0'} transition-all`}>
        {isOpen && (
          <div className="mt-4">
            <h4 className="text-md font-bold text-center ">{title}</h4>
            <img src={Image} width={200}  alt={title} className="mb-4 mt-2 rounded-md ml-[200px]" />
            <p className="text-sm text-gray-600">{more}</p>
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
      question: "For Individuals Seeking Transformation:",
      answer: "If you're an individual aiming to sharpen your communication, cultivate mindfulness, or enhance your emotional well-being,...",
      image: 'Image',
      title: "Benefits of Fruitful",
      more : " explore our individual training and coaching programs. Let us guide you on a journey of self-improvement and empowerment."
    },
    {
      question: "For Companies Focused on Empowerment",
      answer: "For companies striving to equip their teams with essential behavioral skills, our corporate training programs are designed to elevate performance...",
      image: "Image",
      title: "Benefits of Fruitful",
      more : "and foster collaboration Unleash the full potential of your workforce and witness the positive impact on your organization."
    },{
      question: "Compliance Training:",
      answer: "It helps reduce financial stress by offering expert guidance, a clear financial plan, and easy ways to save and invest...",
      image: "Image",
      title: "Benefits of Fruitful",
      more : "fff"
    },
    {
      question: "",
      answer: "",
      image: "Image",
      title: "About Fruitful",
      more : ''
    },
  ];

  return (
    <div className="bg-white">
    <div className=" mx-auto p-4" id='serivce'>
      <div className='flex flex-col gap-4 px-10 '>
         <h2 className="text-black text-2xl font-semibold text-center">Services</h2>
         <h3 className='text-center text-4xl w-full font-[600]'>Discover Your Journey: Tailored for You</h3>
         <p className="text-sm text-gray-500 md:w-[90%] m-auto">At Enrich, we recognize that growth is personal, whether you&apos;re an individual seeking to refine your skills or a company looking to empower your workforce. Our Behavioral Skills Training programs and coaching services are thoughtfully categorized to cater to your unique needs.</p>
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