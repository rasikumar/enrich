import { useState, useEffect } from "react";
import Instance from "../Admin/Instance";
import { Link } from "react-router-dom";
import DynamicBreadcrumb from "../DynamicBreadcrumb";
import { FaPen } from "react-icons/fa";
import Cursor from "../Cursor";

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="h-60 bg-gray-300"></div>
      <div className="p-6 flex flex-col">
        <div className="h-6 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded mb-4"></div>
        <div className="h-5 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

const InsightPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6; // Number of blogs per page
  const pageLimit = 3; // Number of pages before showing dots

  useEffect(() => {
    const fetchAllContent = async () => {
      try {
        // Fetch all data in parallel
        const responses = await Promise.allSettled([
          Instance.get("/getAllBlogs"),
          Instance.get("/getallChangeAbitList"),
          Instance.get("/getAllSafetyList"),
        ]);

        // Map and format blogs data
        const blogs =
          responses[0].status === "fulfilled" &&
          responses[0].value.data.blogs?.length
            ? responses[0].value.data.blogs.map((item) => ({
                id: item.id,
                title: item.blog_title,
                body: item.blog_body,
                author: item.blog_author,
                date: item.blog_date,
                visit: item.blog_visitors_count,
                category: item.blog_category,
                thumbnail: item.blog_thumbnail,
                linkPrefix: "blog",
              }))
            : [];

        // Map and format changeAbit data
        const changeBits =
          responses[1].status === "fulfilled" &&
          responses[1].value.data.changeAbits?.length
            ? responses[1].value.data.changeAbits.map((item) => ({
                id: item.id,
                title: item.changeAbit_title,
                body: item.changeAbit_content,
                author: item.changeAbit_author,
                date: item.createdAt,
                visit: item.changeAbit_visit_count,
                category: item.changeAbit_category,
                thumbnail: item.changeAbit_thumbnail,
                linkPrefix: "changeABit",
              }))
            : [];
        // console.log(changeBitResponse);

        // Map and format safetyNet data
        const safetyNets =
          responses[2].status === "fulfilled" &&
          responses[2].value.data.safetyRecords?.length
            ? responses[2].value.data.safetyRecords.map((item) => ({
                id: item.id,
                title: item.safety_title,
                body: item.safety_body,
                author: item.safety_author,
                date: item.updated_at,
                visit: item.safety_visitors_count,
                category: item.safety_category,
                thumbnail: item.safety_thumbnail,
                linkPrefix: "safetyNet",
              }))
            : [];

        // console.log(safetyNetResponse);

        // Combine and sort all content by date
        const combinedData = [...blogs, ...changeBits, ...safetyNets].sort(
          (a, b) => {
            const dateA = new Date(a.date || a.createdAt || 0);
            const dateB = new Date(b.date || b.createdAt || 0);
            return dateB - dateA; // Sort in descending order
          }
        );

        // Update state with the sorted data
        setBlogs(combinedData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load content");
        setLoading(false);
      }
    };

    fetchAllContent();
  }, []);

  if (loading) {
    return (
      <div className="w-[90%] m-auto py-12 cursor-none">
        <div className="flex flex-col gap-3 w-full mb-10 text-center">
          <h2 className="text-4xl tablet:text-5xl font-semibold">
            Insights Hub
          </h2>
          <p className="text-gray-600">
            In our pursuit of growth, giving back serves as our compass, guiding
            us to empower and elevate others. Explore expert tips, industry
            trends, and practical advice on behavioral skills, corporate
            training, and personal development. Our Insights Hub is here to
            equip you with the knowledge and tools for meaningful
            transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: blogsPerPage }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Helper function to render pagination with dots
  const renderPagination = () => {
    // If there are no blogs, don't show pagination at all
    if (blogs.length === 0) {
      return null;
    }

    if (totalPages <= pageLimit) {
      return (
        <>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || blogs.length === 0}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1 || blogs.length === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-blue-300"
              }`}
              disabled={blogs.length === 0}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || blogs.length === 0}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages || blogs.length === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </>
      );
    }

    const pagesToShow = [];
    const startPage = Math.max(currentPage - 2, 1);
    const endPage = Math.min(currentPage + 2, totalPages);

    if (startPage > 1) {
      pagesToShow.push(1);
      if (startPage > 2) {
        pagesToShow.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pagesToShow.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pagesToShow.push("...");
      }
      pagesToShow.push(totalPages);
    }

    return (
      <>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || blogs.length === 0}
          className={`px-4 py-2 rounded-lg ${
            currentPage === 1 || blogs.length === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Prev
        </button>

        {pagesToShow.map((page, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 rounded-lg ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-300"
            }`}
            disabled={page === "..." || blogs.length === 0}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || blogs.length === 0}
          className={`px-4 py-2 rounded-lg ${
            currentPage === totalPages || blogs.length === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </>
    );
  };

  return (
    <div className="max-w-[80%] m-auto py-12 cursor-none">
      <Cursor />
      <DynamicBreadcrumb />
      <div className="flex flex-col gap-3 w-full mb-4 text-center mt-5">
        <h2 className="text-4xl tablet:text-5xl font-semibold mt-8">
          Insight Hub
        </h2>
        <p className="text-gray-600">
          In our pursuit of growth, giving back serves as our compass, guiding
          us to empower and elevate others. Explore expert tips, industry
          trends, and practical advice on behavioral skills, corporate training,
          and personal development. Our Insights Hub is here to equip you with
          the knowledge and tools for meaningful transformation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentBlogs.map((item) => {
          let imagePath = "";
          if (item.linkPrefix === "blog") {
            imagePath = "https://newcheck.evvisolutions.com/blog_images/";
          } else if (item.linkPrefix === "changeABit") {
            imagePath = "https://newcheck.evvisolutions.com/changeAbit_images/";
          } else if (item.linkPrefix === "safetyNet") {
            imagePath = "https://newcheck.evvisolutions.com/safety_images/";
          }

          return (
            <Link
              to={`/insights/${item.linkPrefix}`}
              key={item.id}
              className="animate-fade bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                className="w-full h-48 object-cover"
                src={`${imagePath}${item.thumbnail}`}
                alt={item.title}
              />
              <div className="p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold mr-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <Link
                    to={`/insights/${item.linkPrefix}`}
                    className="text-xs text-red-600 font-bold mb-2 border-2 border-red-600 rounded-xl p-1"
                  >
                    {item.category}
                  </Link>
                </div>
                <div
                  dangerouslySetInnerHTML={{ __html: item.body }}
                  className="text-gray-500 text-sm mb-4 line-clamp-3 ql-editor"
                />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">
                    {new Date(item.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <Link
                    to={`/insights/${item.linkPrefix}/${item.id}`}
                    className="flex items-center text-blue-500 hover:underline"
                  >
                    <span className="mr-2">Read More</span>
                    <FaPen />
                  </Link>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="flex justify-center mt-8">
        <div className="flex gap-2">{renderPagination()}</div>
      </div>
    </div>
  );
};

export default InsightPage;
