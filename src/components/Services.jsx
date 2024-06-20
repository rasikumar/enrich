import  { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import blogImage from '../assets/hero.png';

gsap.registerPlugin(ScrollTrigger);

const articles = [
  { title: "Article 1", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa necessitatibus facilis quos doloremque excepturi, cumque dolor quia deserunt harum alias.", image: blogImage },
  { title: "Article 2", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa necessitatibus facilis quos doloremque excepturi, cumque dolor quia deserunt harum alias.", image: blogImage },
  { title: "Article 3", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa necessitatibus facilis quos doloremque excepturi, cumque dolor quia deserunt harum alias.", image: blogImage },
  { title: "Article 4", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa necessitatibus facilis quos doloremque excepturi, cumque dolor quia deserunt harum alias.", image: blogImage },
];

const BlogsList = () => {
  const articlesRef = useRef([]);

  useEffect(() => {
    articlesRef.current.forEach((article, ) => {
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
    <div className="flex flex-wrap justify-center pb-8">
      {articles.map((article, index) => (
        <div
          key={index}
          ref={el => articlesRef.current[index] = el}
          className="relative bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden transition-transform transform hover:-translate-y-2 duration-300 m-4 w-full sm:w-[calc(50%-2rem)] md:w-[calc(33.3333%-2rem)] lg:w-[calc(25%-2rem)]"
        >
          <div className="relative overflow-hidden rounded-t-xl">
            <img src={article.image} alt={article.title} className="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-105" />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{article.title}</h2>
            <p className="text-gray-700 text-sm mb-4">{article.content}</p>
            <button className="text-blue-600 hover:text-blue-800 transition duration-300">Read more</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogsList;
