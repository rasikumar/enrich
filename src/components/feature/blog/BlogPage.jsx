import { useEffect, useState } from "react";
import Instance from "../../Admin/Instance";
import Card from "../component/Card"; // Make sure the path to Card is correct
import DynamicBreadcrumb from "../../DynamicBreadcrumb";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const blogsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await Instance.get("/getAllBlogs");
        const blogData = response.data.blogs.map((item) => ({
          id: item.id,
          title: item.blog_title,
          body: item.blog_body,
          date: item.blog_date,
          author: item.blog_author,
          views: item.blog_visitors_count,
          thumbnail: `https://newcheck.evvisolutions.com/blog_images/${item.blog_thumbnail}`,
        }));

        const latestBlogs = blogData.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        // Set the blogs and total pages
        setBlogs(latestBlogs);
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
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

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
    </>
  );
};

export default BlogPage;
