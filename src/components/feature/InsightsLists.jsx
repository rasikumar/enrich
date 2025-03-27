/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Instance from "../Admin/Instance";
import { Link } from "react-router-dom";

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
    imagePath = "http://localhost:5001/blog_images/";
  } else if (linkPrefix === "changeABit") {
    imagePath = "http://localhost:5001/changeAbit_images/";
  } else if (linkPrefix === "safetyNet") {
    imagePath = "http://localhost:5001/safety_images/";
  }

  return (
    <Link to={`/insights/${linkPrefix}/${id}`}>
      <div className="max-w-xl gap-2 w-full flex flex-col md:flex-row border rounded overflow-hidden m-2">
        {thumbnail && (
          <img
            className="w-full md:w-1/2 h-64 object-cover" // Ensures image has consistent height on mobile
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
              className="text-gray-700 mt-2 mb-4 line-clamp-3" // Adjust line-clamp if text is cut off
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
  const [filteredContent, setFilteredContent] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const responses = await Promise.allSettled([
          Instance.get("/getAllBlogs"),
          Instance.get("/getallChangeAbitList"),
          Instance.get("/getAllSafetyList"),
        ]);

        const blogs =
          responses[0].status === "fulfilled" &&
          responses[0].value.data.blogs?.length
            ? responses[0].value.data.blogs.map((item) => ({
                id: item.id,
                title: item.blog_title,
                body: item.blog_body,
                author: item.blog_author,
                date: item.blog_date,
                category: item.blog_category,
                thumbnail: item.blog_thumbnail,
                linkPrefix: "blog",
              }))
            : [];

        const changeBits =
          responses[1].status === "fulfilled" &&
          responses[1].value.data.changeAbits?.length
            ? responses[1].value.data.changeAbits.map((item) => ({
                id: item.id,
                title: item.changeAbit_title,
                body: item.changeAbit_content,
                author: item.changeAbit_author,
                date: item.createdAt,
                category: item.changeAbit_category,
                thumbnail: item.changeAbit_thumbnail,
                linkPrefix: "changeABit",
              }))
            : [];

        const safetyNets =
          responses[2].status === "fulfilled" &&
          responses[2].value.data.safetyRecords?.length
            ? responses[2].value.data.safetyRecords.map((item) => ({
                id: item.id,
                title: item.safety_title,
                body: item.safety_body,
                author: item.safety_author,
                date: item.created_at,
                category: item.safety_category,
                thumbnail: item.safety_thumbnail,
                linkPrefix: "safetyNet",
              }))
            : [];

        // Combine and sort all data
        const combinedData = [...blogs, ...changeBits, ...safetyNets].sort(
          (a, b) =>
            new Date(b.date || b.createdAt || 0) -
            new Date(a.date || a.createdAt || 0)
        );

        setContent(combinedData);
        setFilteredContent(combinedData);
      } catch (error) {
        console.error("Error fetching content", error);
      }
    };

    fetchContent();
  }, []);

  const filterContent = (category) => {
    setSelectedCategory(category);
    if (category === "all") {
      setFilteredContent(content);
    } else {
      setFilteredContent(
        content.filter((item) => item.linkPrefix === category)
      );
    }
  };

  const next = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 2;
      return nextIndex >= filteredContent.length ? 0 : nextIndex;
    });
  };

  const prev = () => {
    setCurrentIndex((prevIndex) => {
      const prevIndexCalc = prevIndex - 2;
      return prevIndexCalc < 0
        ? filteredContent.length - (filteredContent.length % 2 || 2)
        : prevIndexCalc;
    });
  };

  return (
    <div className="container mx-auto px-4">
      {/* Filter Buttons */}
      <div className="flex justify-center flex-wrap md:space-x-4 gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded hover:scale-105 transition-all ${
            selectedCategory === "all" ? "bg-primary text-white" : "bg-gray-200"
          }`}
          onClick={() => filterContent("all")}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded hover:scale-105 transition-all ${
            selectedCategory === "blog"
              ? "bg-primary text-white"
              : "bg-gray-200"
          }`}
          onClick={() => filterContent("blog")}
        >
          Blogs
        </button>
        <button
          className={`px-4 py-2 rounded hover:scale-105 transition-all ${
            selectedCategory === "changeABit"
              ? "bg-primary text-white"
              : "bg-gray-200"
          }`}
          onClick={() => filterContent("changeABit")}
        >
          ChangeABit
        </button>
        <button
          className={`px-4 py-2 rounded hover:scale-105 transition-all ${
            selectedCategory === "safetyNet"
              ? "bg-primary text-white"
              : "bg-gray-200"
          }`}
          onClick={() => filterContent("safetyNet")}
        >
          Safety Net
        </button>
      </div>

      {/* Content Section */}
      <div className="flex items-center justify-center md:justify-start">
        {filteredContent.length > 0 ? (
          <div className="flex flex-wrap md:flex-nowrap overflow-hidden gap-2">
            {filteredContent
              .slice(currentIndex, currentIndex + 2)
              .map((item, index) => (
                <Card key={index} {...item} />
              ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No content available.</p>
        )}
      </div>

      {/* Navigation Buttons */}
      {filteredContent.length > 0 && (
        <div className="flex items-center justify-between md:justify-center gap-4 md:ml-4 mt-4">
          <GrFormPrevious className="cursor-pointer" onClick={prev} size={24} />
          <GrFormNext className="cursor-pointer" onClick={next} size={24} />
        </div>
      )}
    </div>
  );
};

export default App;
