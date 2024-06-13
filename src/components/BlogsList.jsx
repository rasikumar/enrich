import { useRef, useEffect } from 'react';
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
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    gsap.fromTo(container.children, 
      { opacity: 0, y: 50 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        stagger: 0.2, 
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        }
      }
    );
  }, []);

  return (
    <div ref={containerRef} className="flex flex-wrap justify-center p-4">
      {articles.map((article, index) => (
        <div key={index} className="relative bg-[#E8E8E8] rounded-3xl border bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.8)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat p-8 shadow-md hover:bg-[position:200%_0,0_0] hover:duration-[1500ms] m-4 w-full sm:w-[calc(50%-2rem)] md:w-[calc(33.3333%-2rem)] lg:w-[calc(25%-2rem)] xl:w-[calc(20%-2rem)]">
          <img src={article.image} alt={article.title} className="rounded-t-lg w-full" />
          <h2 className="text-xl font-bold mt-2">{article.title}</h2>
          <p className="text-gray-600">{article.content}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogsList;