/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Instance from "../../Admin/Instance";
import DynamicBreadcrumb from "../../DynamicBreadcrumb";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";

// Updated BlogCard component
const BlogCard = ({ id, title, body, date, author, thumbnail, views }) => {
  return (
    <Link to={`/insights/safetyNet/${id}`}>
      <div className="bg-white rounded-lg overflow-hidden max-w-sm mx-auto my-5 cursor-pointer border border-blue-300 duration-300 transform hover:shadow-lg">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
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
              <AiOutlineEye />
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

const SafetyNetPage = () => {
  const [safetyRecords, setSafetyRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const blogsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await Instance.get("/getAllSafetyList");
        const blogData = response.data.safetyRecords.map((item) => ({
          id: item.id,
          title: item.safety_title,
          body: item.safety_body,
          date: item.createdAt,
          author: item.safety_author,
          views: item.safety_visitors_count,
          thumbnail: `http://192.168.20.5:5000/safety_images/${item.safety_thumbnail}`,
        }));

        const latestBlogs = blogData.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setSafetyRecords(latestBlogs);
        setTotalPages(Math.ceil(latestBlogs.length / blogsPerPage));
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = safetyRecords.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i <= 10 || (i > totalPages - 5 && i <= totalPages)) {
        pages.push(i);
      } else if (i === 10) {
        pages.push("...");
      }
    }

    return (
      <div className="pagination flex justify-center gap-3 mt-6 mb-3">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 ${
            currentPage === 1 ? "bg-gray-300" : "bg-blue-500"
          } text-white rounded`}
        >
          Prev
        </button>
        {pages.map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-3 py-1 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {page}
            </button>
          )
        )}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 ${
            currentPage === totalPages ? "bg-gray-300" : "bg-blue-500"
          } text-white rounded`}
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <>
      <DynamicBreadcrumb />
      <h1 className="text-4xl tablet:text-5xl font-semibold mt-20 text-center mb-3">
        Latest Blogs
      </h1>
      <p className="text-center mb-4">
        Stay updated with the latest trends and insights in technology,
        business, and more!
      </p>

      <div className="blog-list px-10 py-6 flex flex-wrap gap-3">
        {currentBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            id={blog.id}
            title={blog.title}
            body={blog.body}
            date={blog.date}
            author={blog.author}
            thumbnail={blog.thumbnail}
            views={blog.views}
          />
        ))}
      </div>

      {renderPagination()}
    </>
  );
};

export default SafetyNetPage;
