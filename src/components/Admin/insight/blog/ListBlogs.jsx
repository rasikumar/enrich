import { useState, useEffect } from "react";
import Instance from "../../Instance";
import DOMPurify from "dompurify";
import EditBlog from "./EditBlog";
import DeleteBlog from "./DeleteBlog";
import { FaPencilAlt } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { ThreeCircles } from "react-loader-spinner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../ui/dialog";

const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await Instance.get("/admin/getAllBlogs");
        const sortedBlogList = response.data.blogs.sort(
          (a, b) => new Date(b.blog_date) - new Date(a.blog_date)
        );
        setBlogs(sortedBlogList);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleEditClick = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.blog_author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  if (loading) {
    return (
      <div>
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          className="text-center"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto bg-white p-6 rounded-lg shadow-md mt-5">
      <h1 className="text-center text-3xl mb-5">Blog List</h1>

      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by author..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring focus:ring-teal-300"
        />
      </div>
      {filteredBlogs.length === 0 ? (
        <div className="text-center text-red-600">No result found</div>
      ) : (
        <ul className="flex flex-wrap gap-3">
          {currentBlogs.map((blog) => (
            <li
              key={blog.id}
              className="even:bg-white odd:bg-zinc-100 border border-teal-800 rounded-lg p-4 mb-1 flex gap-6 min-w-full max-md:flex-wrap"
            >
              <div className="w-full overflow-hidden">
                <div className="flex text-sm">
                  <h2 className="text-md font-semibold">{blog.blog_title}</h2>
                </div>
                <div className="flex gap-4">
                  <p className="text-gray-600 inline-flex items-center text-xs gap-2">
                    <FaPencilAlt />
                    {blog.blog_author}
                  </p>
                  <p className="text-gray-500 inline-flex items-center text-xs gap-2">
                    <MdDateRange />
                    {new Date(blog.blog_date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div
                  className="line-clamp-2 text-xs"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(blog.blog_body),
                  }}
                />
                <div className="inline-flex gap-4 mt-3">
                  <button
                    onClick={() => handleEditClick(blog)}
                    className="h-2 text-center flex justify-center items-center bg-blue-500 p-5 rounded-md"
                  >
                    Edit
                  </button>
                  <DeleteBlog blogId={blog.id} setBlogs={setBlogs} />
                </div>
              </div>
              {blog.blog_thumbnail && (
                <img
                  src={`https://newcheck.evvisolutions.com/blog_images/${blog.blog_thumbnail}`}
                  alt={blog.blog_title}
                  className="rounded-lg w-24 h-24 object-cover"
                />
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-2 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg transition-all shadow-md font-semibold 
            ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800"
            }`}
        >
          Previous
        </button>

        {Array.from(
          { length: Math.ceil(filteredBlogs.length / blogsPerPage) },
          (_, index) => {
            const page = index + 1;

            if (
              page === 1 ||
              page === Math.ceil(filteredBlogs.length / blogsPerPage) ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg transition-all shadow-sm font-semibold ${
                    currentPage === page
                      ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white"
                      : "border border-gray-300 hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {page}
                </button>
              );
            }

            if (
              (page === currentPage - 2 && currentPage > 3) ||
              (page === currentPage + 2 &&
                currentPage <
                  Math.ceil(filteredBlogs.length / blogsPerPage) - 2)
            ) {
              return (
                <span key={page} className="px-2 text-gray-500">
                  ...
                </span>
              );
            }

            return null;
          }
        )}

        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(filteredBlogs.length / blogsPerPage))
            )
          }
          disabled={
            currentPage === Math.ceil(filteredBlogs.length / blogsPerPage) ||
            filteredBlogs.length === 0
          }
          className={`px-4 py-2 rounded-lg transition-all shadow-md font-semibold 
            ${
              currentPage === Math.ceil(filteredBlogs.length / blogsPerPage) ||
              filteredBlogs.length === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800"
            }`}
        >
          Next
        </button>
      </div>

      {/* Custom Modal for Edit Blog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-6xl">
          <DialogHeader>
            <DialogTitle>Edit Blog</DialogTitle>
            <DialogClose />
          </DialogHeader>
          {selectedBlog && (
            <EditBlog
              blog={selectedBlog}
              setEditing={setIsModalOpen}
              setBlogs={setBlogs}
              closeModal={handleCloseModal}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ListBlog;
