import { useState, useEffect } from "react";
import Instance from "../../Instance";
import DOMPurify from "dompurify";
import EditBlog from "./EditChangeABit";
import DeleteBlog from "./DeleteBlog";
import { FaPencilAlt } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { ThreeCircles } from "react-loader-spinner";

// Custom Modal Component
// eslint-disable-next-line react/prop-types
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[50rem] relative max-h-[30rem] overflow-y-scroll scrollbar-hide">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

const ListChangeAbit = () => {
  const [changeABits, setChangeAbits] = useState([]);
  const [error, setError] = useState(null);
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
        console.log(response.data.changeAbits);
      } catch (err) {
        setError("Failed to fetch changeABits");
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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
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
        <div className="text-center text-red-600">No Results Found</div>
      ) : (
        <ul className="flex flex-wrap gap-3">
          {currentBlogs.map((changeABit) => (
            <li
              key={changeABit.id}
              className="even:bg-white odd:bg-zinc-100 border border-teal-800 rounded-lg p-4 mb-1 flex gap-6 max-h-32 sm:max-h-36 min-w-full"
            >
              <div className="w-full ">
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
              {changeABit.changeAbit_image && (
                <img
                  src={`https://enrichminds.co.in/changeAbit_images/${changeABit.changeAbit_image}`}
                  alt={changeABit.changeAbit_title}
                  className="rounded-lg"
                  style={{
                    width: "20%",
                    objectFit: "cover",
                    height: "auto",
                  }}
                />
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        {[...Array(Math.ceil(filteredBlogs.length / blogsPerPage)).keys()].map(
          (number) => (
            <button
              key={number}
              onClick={() => paginate(number + 1)}
              className={`px-3 py-1 mx-1 rounded-md border ${
                currentPage === number + 1
                  ? "bg-teal-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {number + 1}
            </button>
          )
        )}
      </div>

      {/* Custom Modal for Edit Blog */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedChangeABit && (
          <EditBlog
            change={selectedChangeABit}
            setEditing={setIsModalOpen}
            setChangeAbits={setChangeAbits}
            closeModal={handleCloseModal} // Pass the function to close modal
          />
        )}
      </Modal>
    </div>
  );
};

export default ListChangeAbit;