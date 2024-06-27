import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IoArrowBackCircle } from "react-icons/io5";

import retreatImage from '../assets/blogs/retreatImage.jpeg';
import valuableImage from '../assets/blogs/valuableImage.jpeg';
import blogImage from '../assets/blogs/valuableImage.jpeg';

const articles = [
  { id: 1, title: "Retreat", content: "A retreat is a process of temporary break from one's usual life or routine to seek comfort, reflect on oneself. It often involves secluded environments, away from distractions, that promote the development of new skills. Retreats can serve various purposes, ranging from personal growth and wellness to professional development. By this way our RETREAT will lead you to a wonderful destiny. So just stay connected with us for this amazing journey.", image: retreatImage },

  { id: 2, title: "Valuable", content: "Valuable is the ultimate word which indicates that the Something that has worth is valuable. Often, valuable things are worth money, but a spy can provide valuable information that might save lives. In this Blog how VALUABLE can work in sing individual life which can create the admirable thing though that. By this way our VALUABLE will lead you to a wonderful destiny. So just stay connected with us for this amazing journey.", image: valuableImage },

  { id: 3, title: "Article 3", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa necessitatibus facilis quos doloremque excepturi, cumque dolor quia deserunt harum alias.", image: blogImage },

  { id: 4, title: "Article 4", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa necessitatibus facilis quos doloremque excepturi, cumque dolor quia deserunt harum alias.", image: blogImage },
];

const BlogDetail = () => {
  const { id } = useParams();
  const article = articles.find(article => article.id === parseInt(id));

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <Link to={'/'} className='text-4xl'><IoArrowBackCircle/></Link>
      <div className="bg-white rounded-xl border  border-gray-200 shadow-md overflow-hidden">
        <img src={article.image} alt={article.title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
          <p className="text-gray-700 text-lg">{article.content}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;