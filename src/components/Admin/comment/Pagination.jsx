/* eslint-disable react/prop-types */
const Pagination = ({ commentsPerPage, totalComments, paginate, currentPage }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalComments / commentsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <div className="flex justify-center mt-6">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`px-4 py-2 mx-1 rounded-md ${
              currentPage === number
                ? "bg-teal-500 text-white"
                : "bg-gray-300 text-gray-700"
            }`}
          >
            {number}
          </button>
        ))}
      </div>
    );
  };
  
  export default Pagination;
  