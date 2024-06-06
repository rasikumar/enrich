import  { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const articles = [
  { title: "Article 1", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa necessitatibus facilis quos doloremque excepturi, cumque dolor quia deserunt harum alias.", image: "https://via.placeholder.com/600" },
  { title: "Article 2", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa necessitatibus facilis quos doloremque excepturi, cumque dolor quia deserunt harum alias.", image: "https://via.placeholder.com/600" },
  { title: "Article 3", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa necessitatibus facilis quos doloremque excepturi, cumque dolor quia deserunt harum alias.", image: "https://via.placeholder.com/600" },
];


const BlogsList = () => {
  const containerRef = useRef(null);

  return (
    
    <div ref={containerRef} className="flex space-x-4 p-4">
      {articles.map((article, index) => (
        <div key={index} className="min-w-[300px] bg-white shadow-lg rounded-lg p-4">
          <img src={article.image} alt={article.title} className="rounded-t-lg" />
          <h2 className="text-xl font-bold mt-2">{article.title}</h2>
          <p className="text-gray-600">{article.content}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogsList;