/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Instance from "../Admin/Instance";
import { Link } from "react-router-dom";
// import { blog } from "../../assets";

const Card = ({
  id,
  title,
  body,
  author,
  date,
  category,
  thumbnail,
  linkPrefix = "blog",
}) => {
  let imagePath;
  if (linkPrefix === "blog") {
    imagePath = "http://192.168.20.5:5000/blog_images/";
  } else if (linkPrefix === "changeBit") {
    imagePath = "http://192.168.20.5:5000/changeAbit_images/";
  } else if (linkPrefix === "safetyNet") {
    imagePath = "http://192.168.20.5:5000/safety_images/";
  }
  return (
    <Link to={`${linkPrefix}/${id}`}>
      <div className="max-w-xl gap-2 w-full flex flex-col md:flex-row border rounded overflow-hidden m-2 min-h-64 max-h-64">
        {thumbnail && (
          <img
            className="w-full md:w-1/2 object-cover"
            src={imagePath + thumbnail}
            alt={title}
          />
        )}
        <div className="w-full md:w-1/2 p-4">
          {category && (
            <div className="text-xs text-red-600 font-bold mb-2 border-2 border-red-900 p-[4px] rounded-md w-fit">
              {category}
            </div>
          )}
          <div className="font-bold text-xl mb-2 text-primary">{title}</div>
          {body && (
            <div
              className="line-clamp-3 text-gray-700 mt-2 mb-4"
              dangerouslySetInnerHTML={{ __html: body }}
            />
          )}
          <div className="text-gray-600 text-sm">
            {author && <span className="block">{author}</span>}
            {date && (
              <span className="block">
                {new Date(date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

const App = () => {
  const [content, setContent] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [blogsResponse, changeBitResponse, safetyNetResponse] =
          await Promise.all([
            Instance.get("/getAllBlogs"),
            Instance.get("/getallChangeAbitList"),
            Instance.get("/getAllSafetyList"),
          ]);

        console.log(safetyNetResponse.data);

        const blogs = blogsResponse.data.blogs.map((item) => ({
          id: item.id,
          title: item.blog_title,
          body: item.blog_body,
          author: item.blog_author,
          date: item.blog_date,
          category: item.blog_category,
          thumbnail: item.blog_thumbnail,
          linkPrefix: "blog",
        }));

        const changeBits = changeBitResponse.data.changeAbits.map((item) => ({
          id: item.id,
          title: item.changeAbit_title,
          body: item.changeAbit_content,
          author: item.changeAbit_author,
          date: item.createdAt,
          category: item.changeAbit_category,
          thumbnail: item.changeAbit_thumbnail,
          linkPrefix: "changeBit",
        }));

        // Adding a fallback for safetyRecords
        const safetyNets = safetyNetResponse.data.safetyRecords.map((item) => ({
          id: item.id,
          title: item.safety_title,
          body: item.safety_body,
          author: item.safety_author,
          date: item.createdAt,
          category: item.safety_category,
          thumbnail: item.safety_thumbnail,
          linkPrefix: "safetyNet",
        }));

        const combinedData = [...blogs, ...changeBits, ...safetyNets].sort(
          (a, b) => {
            const dateA = new Date(a.date || a.createdAt);
            const dateB = new Date(b.date || b.createdAt);
            return dateB - dateA;
          }
        );

        setContent(combinedData);
      } catch (error) {
        console.error("Error fetching content", error);
      }
    };

    fetchContent();
  }, []);

  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 2) % content.length);
  };

  const prev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 2 + content.length) % content.length
    );
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-center md:justify-start">
        <div className="flex flex-wrap md:flex-nowrap overflow-hidden gap-2">
          {content.slice(currentIndex, currentIndex + 2).map((item, index) => (
            <Card key={index} {...item} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between md:justify-center gap-4 md:ml-4 mt-4">
        <GrFormPrevious className="cursor-pointer" onClick={prev} size={24} />
        <GrFormNext className="cursor-pointer" onClick={next} size={24} />
      </div>
    </div>
  );
};

export default App;
