import  { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from '../assets/heroImage.jpg'
// eslint-disable-next-line react/prop-types
const Services = ({ question, answer, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const answerRef = useRef(null);
  const itemRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(answerRef.current, { height: 'auto', opacity: 1, duration: 0.1 });
    } else {
      gsap.to(answerRef.current, { height: 0, opacity: 0, duration: 0.1 });
    }
  }, [isOpen]);

  const handleMouseEnter = () => {
    gsap.to(itemRef.current, { scale: 1.05, duration: 0.3 });
  };

  const handleMouseLeave = () => {
    gsap.to(itemRef.current, { scale: 1, duration: 0.3 });
  };

  return (
    <div
      ref={itemRef}
      className="border px-4 border-yellow-600 rounded-sm mt-5 py-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="w-full  text-left focus:outline-none "
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-gray-900">{question}</h3>
        <p className="mt-2 text-sm text-gray-700">{answer}</p>
      </button>
      <div ref={answerRef} className="overflow-hidden h-0 opacity-0 transition-all">
        {isOpen && (
          <div className="mt-4">
            <h4 className="text-md font-bold text-center">{title}</h4>
            <img src={Image} width={200}  alt={title} className="mt-2 rounded-md ml-[200px]" />
            <p className="text-sm text-gray-600">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ServiceList = () => {
  
  const list = [
    {
      question: "What is Fruitful?",
      answer: "Fruitful is a financial wellness membership that provides access to expert advice, a high yield savings account, and tailored investment portfolios.",
      image: "Image",
      title: "About Fruitful",
    },
    {
      question: "Why is it good?",
      answer: "It helps reduce financial stress by offering expert guidance, a clear financial plan, and easy ways to save and invest.",
      image: 'Image',
      title: "Benefits of Fruitful",
    },
    {
      question: "Why is it good?",
      answer: "It helps reduce financial stress by offering expert guidance, a clear financial plan, and easy ways to save and invest.",
      image: "path/to/image2.jpg",
      title: "Benefits of Fruitful",
    },{
      question: "Why is it good?",
      answer: "It helps reduce financial stress by offering expert guidance, a clear financial plan, and easy ways to save and invest.",
      image: "path/to/image2.jpg",
      title: "Benefits of Fruitful",
    },
  ];

  return (
    <div className=" max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Services</h2>
      {list.map((list, index) => (
        <Services key={index} {...list} />
      ))}
    </div>
  );
};

export default ServiceList;