import { useState, useEffect } from "react";
import Instance from "../../Instance";
import DOMPurify from "dompurify";
import EditBlog from "./EditChangeABit";
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
} from "@/components/ui/dialog";

// Custom Modal Component
// eslint-disable-next-line react/prop-types

const ListChangeAbit = () => {
  const [changeABits, setChangeAbits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChangeABit, setSelectedChangeABit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [blogsPerPage] = useState(5); // Limit changeABits per page
  const [searchQuery, setSearchQuery] = useState(""); // Search by author

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await Instance.post("/admin/getallChangeAbitList");
        const sortedBlogList = response.data.changeAbits.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setChangeAbits(sortedBlogList);
        // console.log(response.data.changeAbits);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleEditClick = (change) => {
    setSelectedChangeABit(change);
    setIsModalOpen(true); // Open modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter changeABits based on search query
  const filteredBlogs = changeABits.filter((changeABit) =>
    changeABit.changeAbit_author
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Pagination logic
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
      <h1 className="text-center text-3xl mb-5">ChangeABit List</h1>

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
        <div className="text-center text-red-600">Create ChangeABit</div>
      ) : (
        <ul className="flex flex-wrap gap-3">
          {currentBlogs.map((changeABit) => (
            <li
              key={changeABit.id}
              className="even:bg-white odd:bg-zinc-100 border border-teal-800 rounded-lg p-4 mb-1 flex gap-6 min-w-full max-md:flex-wrap"
            >
              <div className="w-full overflow-hidden">
                <div className="flex text-sm">
                  <h2 className="text-md font-semibold">
                    {changeABit.changeAbit_title}
                  </h2>
                </div>
                <div className="flex gap-4">
                  <p className="text-gray-600 inline-flex items-center text-xs gap-2">
                    <FaPencilAlt />
                    {changeABit.changeAbit_author}
                  </p>
                  <p className="text-gray-500 inline-flex items-center text-xs gap-2">
                    <MdDateRange />
                    {new Date(changeABit.createdAt).toLocaleDateString(
                      "en-IN",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>

                <div
                  className="line-clamp-2 text-xs"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(changeABit.changeAbit_content),
                  }}
                />
                <div className="inline-flex gap-4 mt-3">
                  <button
                    onClick={() => handleEditClick(changeABit)}
                    className="h-2 text-center flex justify-center items-center bg-blue-500 p-5 rounded-md"
                  >
                    Edit
                  </button>
                  <DeleteBlog
                    changeABitId={changeABit.id}
                    setChangeAbits={setChangeAbits}
                  />
                </div>
              </div>
              {changeABit.changeAbit_thumbnail && (
                <img
                  src={`https://newcheck.evvisolutions.com/changeAbit_images/${changeABit.changeAbit_thumbnail}`}
                  alt={changeABit.changeAbit_title}
                  className="rounded-lg w-24  h-24 object-cover"
                />
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Pagination Controls */}
      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {/* Previous Button */}
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

        {/* Page Numbers with Dots */}
        {Array.from(
          { length: Math.ceil(filteredBlogs.length / blogsPerPage) },
          (_, index) => {
            const page = index + 1;

            // Always show first page, last page, and pages around current page
            if (
              page === 1 || // Always show first page
              page === Math.ceil(filteredBlogs.length / blogsPerPage) || // Always show last page
              (page >= currentPage - 1 && page <= currentPage + 1) // Show pages around current page
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

            // Show dots for skipped pages
            if (
              (page === currentPage - 2 && currentPage > 3) || // Dots before current page
              (page === currentPage + 2 &&
                currentPage <
                  Math.ceil(filteredBlogs.length / blogsPerPage) - 2) // Dots after current page
            ) {
              return (
                <span key={page} className="px-2 text-gray-500">
                  ...
                </span>
              );
            }

            return null; // Hide other pages
          }
        )}

        {/* Next Button */}
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              Math.min(prev + 1, Math.ceil(filteredBlogs.length / blogsPerPage))
            )
          }
          disabled={
            currentPage === Math.ceil(filteredBlogs.length / blogsPerPage)
          }
          className={`px-4 py-2 rounded-lg transition-all shadow-md font-semibold 
      ${
        currentPage === Math.ceil(filteredBlogs.length / blogsPerPage)
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
            <DialogTitle>Edit ChangeABit</DialogTitle>
            <DialogClose />
          </DialogHeader>
          {selectedChangeABit && (
            <EditBlog
              change={selectedChangeABit}
              setEditing={setIsModalOpen}
              setChangeAbits={setChangeAbits}
              closeModal={handleCloseModal} // Pass the function to close modal
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ListChangeAbit;
