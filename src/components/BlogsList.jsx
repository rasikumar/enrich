import  { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

import retreatImage from '../assets/blogs/retreatImage.jpeg';
import valuableImage from '../assets/blogs/valuableImage.jpeg';
import blogImage from '../assets/blogs/valuableImage.jpeg';

gsap.registerPlugin(ScrollTrigger);

const articles = [
  { id: 1, title: "Retreat", content: "A retreat is a process of temporary break from one's usual life or routine to seek comfort, reflect on oneself. It often involves secluded environments, away from distractions, that promote the development of new skills.", image: retreatImage },
  { id: 2, title: "Valuable", content: "Valuable is the ultimate word which indicates that the Something that has worth is valuable. Often, valuable things are worth money, but a spy can provide valuable information that might save lives.", image: valuableImage },
  { id: 3, title: "Article 3", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa necessitatibus facilis quos doloremque excepturi, cumque dolor quia deserunt harum alias.", image: blogImage },
  { id: 4, title: "Article 4", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa necessitatibus facilis quos doloremque excepturi, cumque dolor quia deserunt harum alias.", image: blogImage },
];

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
    <div className="flex flex-wrap justify-center">
      {articles.map((article, index) => (
        <Link
           to={`/BlogsList/${article.id}`}
          key={index}
          ref={el => articlesRef.current[index] = el}
          className="relative bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden transition-transform transform hover:-translate-y-2 duration-300 m-4 w-full sm:w-[calc(50%-2rem)] md:w-[calc(33.3333%-2rem)] lg:w-[calc(25%-2rem)]"
        >
          <div className="relative overflow-hidden rounded-t-xl">
            <img src={article.image} alt={article.title} className="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-105" />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{article.title}</h2>
            <p className="text-gray-700 text-sm mb-4 h-32 overflow-hidden overflow-y-auto text-justify">{article.content}</p>
            <Link to={`/BlogsList/${article.id}`} className="text-white-600 btn-primary  transition duration-300">Read more</Link>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogsList;