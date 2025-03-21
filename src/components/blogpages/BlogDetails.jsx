import { useNavigate, useParams } from 'react-router-dom';
import { IoArrowBackCircle } from "react-icons/io5";
import { awarnessImagefull, listeningImagefull, retreatImagefull, valuableImagefull } from '../../assets';

import AwarnessArticle from './AwarnessArticle'
import RetreatArticle from './RetreatArticle'
import ListeningArticle from './ListeningArticle'
import ValuableArticle from './ValuableArticle'

const articles = [
  { id: 1, 
    title: "Retreat", 
    image: retreatImagefull ,
    component : <RetreatArticle/>
  },

  { id: 2, 
    title: "Valuable", 
    component : <ValuableArticle/>,
    image: valuableImagefull },

  { id: 3, 
    title: "Active listening", 
    component : <ListeningArticle/>,
    image: listeningImagefull },
 
  { id: 4, 
    title: "Self-Awareness", 
    component : <AwarnessArticle/>,
    image: awarnessImagefull },
];

const BlogDetail = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const article = articles.find(article => article.id === parseInt(id));

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <IoArrowBackCircle className='text-3xl' onClick={() => navigate(-1)} />
      <div className="bg-white rounded-xl border  border-gray-200 shadow-md overflow-hidden">
        <div className="p-6 flex flex-col gap-3">
        <img src={article.image} alt={article.title} className="w-full h-full rounded-2xl object-fit" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
          {article.component && <div>{article.component}</div>}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;