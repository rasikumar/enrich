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
} from "@/components/ui/dialog";

// Custom Modal Component
// eslint-disable-next-line react/prop-types

const ListSafetyNet = () => {
  const [safetyNets, setSafetyNets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSafetyNet, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [blogsPerPage] = useState(5); // Limit blogs per page
  const [searchQuery, setSearchQuery] = useState(""); // Search by author

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await Instance.post("/admin/getAllSafetyList");
        // console.log(response.data);

        const sortedBlogList = response.data.safetyRecords.sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        );
        setSafetyNets(sortedBlogList);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleEditClick = (safety) => {
    setSelectedBlog(safety);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close modal
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter blogs based on search query
  const filteredBlogs = safetyNets.filter((safetyNet) =>
    safetyNet.safety_author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastSafetyNet = currentPage * blogsPerPage;
  const indexOfFirstsafetyNets = indexOfLastSafetyNet - blogsPerPage;
  const currentsafetyNets = filteredBlogs.slice(
    indexOfFirstsafetyNets,
    indexOfLastSafetyNet
  );

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


  return (
    <div className="mx-auto bg-white p-6 rounded-lg shadow-md mt-5">
      <h1 className="text-center text-3xl mb-5">Safety Net List</h1>

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
        <div className="text-center text-red-600">Create Saftery Net</div>
      ) : (
        <ul className="flex flex-wrap gap-3">
          {currentsafetyNets.map((safetyNet) => (
            <li
              key={safetyNet.id}
              className="even:bg-white odd:bg-zinc-100 border border-teal-800 rounded-lg p-4 mb-1 flex gap-6 min-w-full max-md:flex-wrap"
            >
              <div className="w-full overflow-hidden">
                <div className="flex text-sm">
                  <h2 className="text-md font-semibold">
                    {safetyNet.safety_title}
                  </h2>
                </div>
                <div className="flex gap-4">
                  <p className="text-gray-600 inline-flex items-center text-xs gap-2">
                    <FaPencilAlt />
                    {safetyNet.safety_author}
                  </p>
                  <p className="text-gray-500 inline-flex items-center text-xs gap-2">
                    <MdDateRange />
                    {new Date(safetyNet.updated_at).toLocaleDateString(
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
                    __html: DOMPurify.sanitize(safetyNet.safety_body),
                  }}
                />
                <div className="inline-flex gap-4 mt-3">
                  <button
                    onClick={() => handleEditClick(safetyNet)}
                    className="h-2 text-center flex justify-center items-center bg-blue-500 p-5 rounded-md"
                  >
                    Edit
                  </button>
                  <DeleteBlog
                    blogId={safetyNet.id}
                    setSafetyNets={setSafetyNets}
                  />
                </div>
              </div>
              {safetyNet.safety_thumbnail && (
                <img
                  src={`https://newcheck.evvisolutions.com/safety_images/${safetyNet.safety_thumbnail}`}
                  alt={safetyNet.safety_title}
                  className="rounded-lg w-24 h-24 object-cover"
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
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-6xl">
          <DialogHeader>
            <DialogTitle>Edit SafetyNet</DialogTitle>
            <DialogClose />
          </DialogHeader>
          {selectedSafetyNet && (
            <EditBlog
              safety={selectedSafetyNet}
              setEditing={setIsModalOpen}
              setSafetyNets={setSafetyNets}
              closeModal={handleCloseModal} // Pass the function to close modal
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ListSafetyNet;
