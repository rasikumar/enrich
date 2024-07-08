import { motion } from "framer-motion";
import { awarnessImagefull, listeningImagefull, retreatImagefull, valuableImagefull } from "../../assets";
import { Link } from "react-router-dom";

const BlogDisplay = () => {
  const articles = [
    {
      id: 1,
      title: "Retreat",
      date: "Dec 7, 2017",
      image: retreatImagefull,
      content: "A retreat is a process of temporary break from one's usual life or routine to seek comfort, reflect on oneself. It often involves secluded environments, away from distractions, that promote the development of new skills.",
    },
    {
      id: 2,
      title: "Valuable",
      date: "Sep 2, 2017",
      image: valuableImagefull,
      content: "Valuable is the ultimate word which indicates that the Something that has worth is valuable. Often, valuable things are worth money, but a spy can provide valuable information that might save lives.",
    },
    {
      id: 3,
      title: "Active listening",
      date: "Sep 2, 2017",
      image: listeningImagefull,
      content: "Imagine this: you're in a pivotal team meeting. Your colleagues are sharing ideas, thoughts, and concerns. You're not just hearing their words; you're understanding their emotions, needs, and motivations.",
    },
    {
      id: 4,
      title: "Self-Awareness",
      date: "Sep 2, 2017",
      image: awarnessImagefull,
      content: "Why Self-Awareness is Our Superpower: Imagine this: You're in a meeting, leading your team. The room buzzes with ideas, and emotions run high. In that moment, self-awareness is your compass.",
    },
    // Add more blog items as needed
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="bg-yellow-500 p-10 text-center font-semibold text-3xl">Blogs</h1>
      <div className="lg:w-[70%] grid grid-cols-1 sm:grid-cols-2 gap-6 m-auto h-full px-4 py-8 ">
        {articles.map((article, index) => (
          <motion.div 
          initial = {{y:50}}
          animate={{y:0}}
          transition={{duration:1, ease:'easeOut'}}
          key={index} className="mb-8 p-6 bg-white rounded-lg shadow-lg relative overflow-hidden border bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.8)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat hover:bg-[position:200%_0,0_0] hover:duration-[1500ms]">
            <Link to={`/BlogsList/${article.id}`}>
              <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
              <h5 className="text-gray-600 mb-4">{article.date}</h5>
              <img src={article.image} alt={article.title} className="w-full h-48 bg-gray-300 flex items-center justify-center mb-4 " />
              <p className="text-gray-700 mb-2 text-justify line-clamp-4">{article.content}</p>
              <button className="btn-primary">Read more</button>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default BlogDisplay;
