import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IoIosArrowForward } from "react-icons/io";
import { awarnessImage, blog, listeningImage, retreatImage, valuableImage } from '../../assets';

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    id: 1,
    image: blog,
  },
  {
    id: 1,
    title: "Retreat",
    content: "A retreat is a process of temporary break from one's usual life or routine to seek comfort, reflect on oneself. It often involves secluded environments, away from distractions, that promote the development of new skills.",
    image: retreatImage,
  },
  {
    id: 2,
    title: "Valuable",
    content: "Valuable is the ultimate word which indicates that the Something that has worth is valuable. Often, valuable things are worth money, but a spy can provide valuable information that might save lives.",
    image: valuableImage,
  },
  {
    id: 3,
    title: "Active listening",
    content: "Imagine this: you're in a pivotal team meeting. Your colleagues are sharing ideas, thoughts, and concerns. You're not just hearing their words; you're understanding their emotions, needs, and motivations.",
    image: listeningImage,
  },
  {
    id: 4,
    title: "Self-Awareness",
    content: "Why Self-Awareness is Our Superpower: Imagine this: You're in a meeting, leading your team. The room buzzes with ideas, and emotions run high. In that moment, self-awareness is your compass.",
    image: awarnessImage,
  }, 
];

// eslint-disable-next-line react/prop-types
const Card = ({ imageSrc, title, description, large, link }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg overflow-hidden relative  ${large ? 'md:col-span-2' : 'md:col-span-1'}`}>
      <img src={imageSrc} alt={title} className={`w-full object-cover ${large ? 'md:h-[20rem] lg:h-[25rem]' : ''}`} />
      <div className={`absolute bottom-0 left-0 right-0 text-sm bg-white bg-opacity-90 p-4 ${large ? 'hidden md:block' : ''} ${large ? '' : 'xl:h-[40%]'}`}>
        <h3 className={`xl:text-xl text-base font-bold`}>{title}</h3>
        <p className={`text-gray-600 xl:line-clamp-3 line-clamp-2 text-xs xl:text-base text-justify `}>{description}</p>
        <Link to={link} className={`btn-primary xl:text-sm flex items-center justify-center mt-2 ${large ? 'hidden' : ''}`}>Read more <IoIosArrowForward/></Link>
      </div>
    </div>
  );
};

const BlogsList = () => {
  const articlesRef = useRef([]);

  useEffect(() => {
    articlesRef.current.forEach((article) => {
      gsap.fromTo(article, {
        opacity: 0,
        y: 50,
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: article,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {articles.map((article, index) => (
          <Card
            key={index}
            imageSrc={article.image}
            title={article.title}
            description={article.content}
            link={`/BlogsList/${article.id}`}
            large={index === 0} // First card is large
            ref={el => articlesRef.current[index] = el}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogsList;
