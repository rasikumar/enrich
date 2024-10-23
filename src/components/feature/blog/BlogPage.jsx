import { useState, useEffect } from "react";
import Instance from "../../Admin/Instance";
import { Link } from "react-router-dom";

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

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6; // Number of blogs per page
  const pageLimit = 10; // Number of pages before showing dots

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await Instance.get("/getAllBlogs");
        const sortedBlogs = response.data.blogs.sort(
          (a, b) => new Date(b.blog_date) - new Date(a.blog_date)
        );
        setBlogs(sortedBlogs);
        setLoading(false);
      } catch (err) {
        setError("Failed to load blogs");
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="w-[90%] m-auto py-12">
        <div className="flex flex-col gap-3 w-full mb-10 text-center">
          <h2 className="text-4xl tablet:text-5xl font-semibold">Blogs</h2>
          <p className="text-gray-600">
            New product features, the latest in technology, solutions, and
            updates.
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
    if (totalPages <= pageLimit) {
      return (
        <>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
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
        {pagesToShow.map((page, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 rounded-lg ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}
      </>
    );
  };

  return (
    <div className="w-[90%] m-auto py-12">
      <div className="flex flex-col gap-3 w-full mb-10 text-center">
        <h2 className="text-4xl tablet:text-5xl font-semibold">Blogs</h2>
        <p className="text-gray-600">
          New product features, the latest in technology, solutions, and
          updates.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentBlogs.map((blog, index) => (
          <div
            key={index}
            className="group flex flex-col bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden"
          >
            {/* Image Section */}
            <div className="relative w-full overflow-hidden">
              <img
                src={`http://192.168.20.7:5000/blog_images/${blog.blog_image}`}
                alt={blog.blog_title}
                className="transition-transform duration-500 ease-in-out group-hover:scale-110 w-full h-60 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end">
                <h2 className="text-lg font-semibold text-white">
                  {blog.blog_author}
                </h2>
                <p className="text-sm text-gray-300">
                  {new Date(blog.blog_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col">
              <Link
                to={`/blog/${blog.id}`}
                className="text-xl font-bold group-hover:text-blue-500 transition-colors duration-300 line-clamp-2"
              >
                {blog.blog_title}
              </Link>
              <div
                className="line-clamp-3 text-gray-700 mt-2 mb-4"
                dangerouslySetInnerHTML={{ __html: blog.blog_body }}
              />
              <Link
                to={`/blog/${blog.id}`}
                className="inline-block text-sm font-medium text-blue-600 hover:text-blue-400 transition-colors duration-300"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8 space-x-2">
        {renderPagination()}
      </div>
    </div>
  );
};

export default Blog;
