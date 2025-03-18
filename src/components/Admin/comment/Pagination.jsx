/* eslint-disable react/prop-types */
const Pagination = ({
  commentsPerPage,
  totalComments,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalComments / commentsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => paginate(Math.max(currentPage - 1, 1))}
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

      {pageNumbers.map((number) => {
        if (
          number === 1 ||
          number === pageNumbers.length ||
          (number >= currentPage - 1 && number <= currentPage + 1)
        ) {
          return (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-4 py-2 rounded-lg transition-all shadow-sm font-semibold ${
                currentPage === number
                  ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white"
                  : "border border-gray-300 hover:bg-gray-100 text-gray-700"
              }`}
            >
              {number}
            </button>
          );
        }

        if (
          (number === currentPage - 2 && currentPage > 3) ||
          (number === currentPage + 2 && currentPage < pageNumbers.length - 2)
        ) {
          return (
            <span key={number} className="px-2 text-gray-500">
              ...
            </span>
          );
        }

        return null;
      })}

      <button
        onClick={() => paginate(Math.min(currentPage + 1, pageNumbers.length))}
        disabled={currentPage === pageNumbers.length || totalComments === 0}
        className={`px-4 py-2 rounded-lg transition-all shadow-md font-semibold 
          ${
            currentPage === pageNumbers.length || totalComments === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800"
          }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
