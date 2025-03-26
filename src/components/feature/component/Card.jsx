/* eslint-disable react/prop-types */

import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
const Card = ({ id, title, body, date, author, thumbnail, views }) => {
  return (
    <Link to={`/insights/blog/${id}`}>
      <div className="bg-white rounded-lg overflow-hidden max-w-sm mx-auto my-5 cursor-pointer border border-blue-300 duration-300 transform min-h-[27rem] max-h-[27rem] overflow-y-auto">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-52 object-cover transition-all duration-500 group-hover:scale-110"
        />
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3 hover:text-blue-600 transition-colors duration-200 line-clamp-1">
            {title}
          </h2>
          <p className="text-sm text-gray-500 mb-5">
            By {author} on {new Date(date).toLocaleDateString()}
          </p>
          <div
            dangerouslySetInnerHTML={{ __html: body }}
            className="text-gray-700 text-base leading-relaxed line-clamp-3 mb-4"
          />
          <div className="mt-4 flex justify-between items-center">
            <button className="text-blue-500 hover:text-blue-700 font-medium transition-colors duration-200">
              Read More
            </button>
            <div className="flex items-center space-x-2 text-gray-500">
              <span className="text-xs font-medium">
                <AiOutlineEye />
              </span>
              <span className="bg-gray-200 px-2 py-1 rounded-full text-xs font-medium">
                {views}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
