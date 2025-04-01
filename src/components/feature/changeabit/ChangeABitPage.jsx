/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Instance from "../../Admin/Instance";
// import Card from "../component/Card"; // Make sure the path to Card is correct
import DynamicBreadcrumb from "../../DynamicBreadcrumb";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import Cursor from "@/components/Cursor";

const Card = ({ id, title, body, date, author, thumbnail, views }) => {
  return (
    <Link to={`/insights/changeABit/${id}`}>
      <div className="bg-white rounded-lg overflow-hidden mx-auto my-5 cursor-pointer border border-blue-300 duration-300 transform hover:shadow-lg min-h-[30rem] max-h-[30rem] overflow-y-auto min-w-[23rem] max-w-[23rem]">
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
            By {author} on{" "}
            {new Date(date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <div
            dangerouslySetInnerHTML={{ __html: body }}
            className="text-gray-700 text-base leading-relaxed line-clamp-3 mb-4 ql-editor"
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
const ChangeABit = () => {
  const [changeAbits, setChangeAbits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const blogsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await Instance.get("/getallChangeAbitList");
        console.log(response.data);

        const blogData = response.data.changeAbits.map((item) => ({
          id: item.id,
          title: item.changeAbit_title,
          body: item.changeAbit_content,
          date: item.createdAt,
          author: item.changeAbit_author,
          views: item.changeAbit_visit_count,
          thumbnail: `https://newcheck.evvisolutions.com/changeAbit_images/${item.changeAbit_thumbnail}`,
        }));

        const latestBlogs = blogData.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        // Set the changeAbits and total pages
        setChangeAbits(latestBlogs);
        setTotalPages(Math.ceil(latestBlogs.length / blogsPerPage));
      } catch (err) {
        console.log(err);
      }
    };

    fetchBlogs();
  }, []);

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = changeAbits.slice(indexOfFirstBlog, indexOfLastBlog);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const renderPagination = () => {
    let pages = [];
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
    <div className="cursor-none">
      <Cursor />
      <DynamicBreadcrumb />
      <h1 className="text-4xl tablet:text-5xl font-semibold mt-20 text-center mb-3">
        Latest ChangeABit
      </h1>
      <p className="text-center mb-4">
        Stay updated with the latest trends and insights in technology,
        business, and more!
      </p>

      <div className="blog-list px-10 py-6 flex flex-wrap gap-3 max-w-7xl mx-auto w-full">
        {currentBlogs.map((blog) => (
          <Card
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
    </div>
  );
};

export default ChangeABit;
