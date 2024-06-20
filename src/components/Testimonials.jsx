import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Person from '../assets/hero.png';
import rightArrow from '../assets/right.png';
import leftArrow from '../assets/left.png';

gsap.registerPlugin(ScrollTrigger);

const testimonialsData = [
  {
    id: 1,
    name: 'Lingu Maria',
    position: 'Web Design',
    feedback: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa necessitatibus facilis quos doloremque excepturi, cumque dolor quia deserunt harum alias.',
    img: Person,
  },
  {
    id: 2,
    name: 'John Doe',
    position: 'Software Engineer',
    feedback: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa necessitatibus facilis quos doloremque excepturi, cumque dolor quia deserunt harum alias.',
    img: Person,
  },
  {
    id: 3,
    name: 'Jane Smith',
    position: 'Product Manager',
    feedback: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa necessitatibus facilis quos doloremque excepturi, cumque dolor quia deserunt harum alias.',
    img: Person,
  },
  {
    id: 4,
    name: 'Jane Smith',
    position: 'Product Manager',
    feedback: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa necessitatibus facilis quos doloremque excepturi, cumque dolor quia deserunt harum alias.',
    img: Person,
  },
  // Add more testimonials as needed
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsRef = useRef(null);
  const cardsRef = useRef([]);

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + testimonialsData.length) % testimonialsData.length;
    animateCards(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % testimonialsData.length;
    animateCards(newIndex);
  };

  const animateCards = (newIndex) => {
    const currentCards = cardsRef.current;
    gsap.to(currentCards, {
      opacity: 0,
      x: -20,
      duration: 0.5,
      ease: 'power1.inOut',
      onComplete: () => {
        setCurrentIndex(newIndex);
        gsap.fromTo(currentCards, { opacity: 0, x: 20 }, {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: 'power1.inOut',
        });
      },
    });
  };

  useEffect(() => {
    const testimonialsElement = testimonialsRef.current;
    gsap.fromTo(testimonialsElement, {
      opacity: 0,
      y: 50,
    }, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: testimonialsElement,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }, []);

  return (
    <div ref={testimonialsRef} id='testimonials' className="w-full bg-[#E8E8E8] flex items-center justify-center mb-20 p-10">
      <div className="flex flex-col gap-4 ">
        <h4 className="text-black text-4xl font-semibold">Testimonials</h4>
        <h1 className="text-2xl w-full font-[600]">Echoes of Success: Hear from Our Clients</h1>
        <p className='text-sm text-gray-500 max-w-2xl mx-auto'>Hear from those who have transformed their skills and lives with Enrich. Our client&apos;s success stories speak volumes about the impact of our training programs.</p>
        <span className="bg-yellow-600 rounded-full w-6 h-6  mt-4 flex text-start"></span>
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-10 mt-10 lg:mt-16">
        <button onClick={handlePrev} className="bg-yellow-600 text-white p-4 rounded-full hover:bg-yellow-700 transition duration-300">
          <img src={leftArrow} width={20} alt="left arrow" />
        </button>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-10">
          {[0, 1].map(i => (
            <div
              key={testimonialsData[(currentIndex + i) % testimonialsData.length].id}
              ref={el => (cardsRef.current[i] = el)}
              className='testimonial-card flex flex-col items-center gap-4 bg-white p-6 py-8 shadow-lg rounded-xl transform transition-transform duration-500 hover:scale-105 w-full lg:w-80 mx-auto'
            >
              <img src={testimonialsData[(currentIndex + i) % testimonialsData.length].img} width={50} height={50} className='rounded-full w-20 h-20 object-cover' />
              <h1 className='text-xl font-semibold text-gray-800'>{testimonialsData[(currentIndex + i) % testimonialsData.length].name}</h1>
              <p className='text-gray-500'>{testimonialsData[(currentIndex + i) % testimonialsData.length].position}</p>
              <p className='w-full leading-5 text-sm text-gray-700 text-center'>{testimonialsData[(currentIndex + i) % testimonialsData.length].feedback}</p>
            </div>
          ))}
        </div>
        <button onClick={handleNext} className="bg-yellow-600 text-white p-4 rounded-full hover:bg-yellow-700 transition duration-300">
          <img src={rightArrow} width={20} alt="right arrow" />
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
