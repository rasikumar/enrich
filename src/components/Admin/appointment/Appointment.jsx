import { useEffect, useState } from "react";
import Instance from "../Instance";
import { FaCalendar } from "react-icons/fa";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    assessment: "",
    date: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await Instance.post("/admin/getAllAppointments");
        setAppointments(response.data);
        setFilteredAppointments(response.data); // Initialize filtered list
        // console.log(response);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  useEffect(() => {
    // Apply filters when any filter value changes
    let filteredData = [...appointments];

    if (filters.name) {
      filteredData = filteredData.filter(
        (contact) =>
          contact.name.toLowerCase().includes(filters.name.toLowerCase()) ||
          contact.email.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.date) {
      const filterDate = formatDate(filters.date);
      filteredData = filteredData.filter(
        (contact) => formatDate(contact.selectDate) === filterDate
      );
    }

    setFilteredAppointments(filteredData);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, appointments]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      name: "",
      assessment: "",
      date: "",
    });
  };

  // Pagination logic
  const indexOfLastAppointment = currentPage * itemsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - itemsPerPage;
  const currentAppointments = filteredAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  // Handling page changes
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="md:p-6 bg-gray-50 max-md:mt-14">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          Filter Appointments
        </h2>
        <div className="flex gap-4 flex-wrap">
          <input
            type="text"
            name="name"
            placeholder="Search by Name or Email"
            className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-1/3"
            value={filters.name}
            onChange={handleFilterChange}
          />
          <div className="relative">
            <input
              type="date"
              name="date"
              className="border p-2 rounded-md"
              value={filters.date}
              onChange={handleFilterChange}
            />
            {!filters.date && (
              <span className="absolute left-2 text-gray-800 top-2 inline-flex items-center gap-2 md:hidden">
                Pick a Date <FaCalendar />
              </span>
            )}
          </div>
          <button
            onClick={resetFilters}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Reset Filter
          </button>
        </div>
      </div>

      {filteredAppointments && filteredAppointments.length > 0 ? (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Appointments
          </h2>
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                  <th className="border border-gray-300 p-2">ID</th>
                  <th className="border border-gray-300 p-2">Name</th>
                  <th className="border border-gray-300 p-2">Phone</th>
                  <th className="border border-gray-300 p-2">Email</th>
                  <th className="border border-gray-300 p-2 ">Assessment</th>
                  <th className="border border-gray-300 p-2 ">Slots</th>
                  <th className="border border-gray-300 p-2">Booked Date</th>
                </tr>
              </thead>
              <tbody>
                {currentAppointments.map((contact) => (
                  <tr
                    key={contact.id}
                    className="text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <td className="border border-gray-300 p-2 text-center">
                      {filteredAppointments.indexOf(contact) + 1}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {contact.name}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {contact.number}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {contact.email}
                    </td>
                    <td className="border border-gray-300 p-2 overflow-hidden">
                      {contact.assessmentType === "Other" ? (
                        <>Other - {contact.otherAssessement}</>
                      ) : (
                        contact.assessmentType
                      )}
                    </td>

                    <td className="border border-gray-300 p-2">
                      {contact.slot}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {formatDate(contact.selectDate)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          {/* Pagination controls */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
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

            {/* First Page + Ellipsis */}
            {currentPage > 2 && (
              <>
                <button
                  onClick={() => handlePageChange(1)}
                  className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-all shadow-sm text-gray-700"
                >
                  1
                </button>
                {currentPage > 3 && (
                  <span className="px-2 text-gray-500">...</span>
                )}
              </>
            )}

            {/* Dynamic Page Numbers */}
            {pageNumbers
              .filter(
                (page) =>
                  page === currentPage ||
                  page === currentPage - 1 ||
                  page === currentPage + 1
              )
              .map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg transition-all shadow-sm font-semibold ${
                    currentPage === page
                      ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white"
                      : "border border-gray-300 hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {page}
                </button>
              ))}

            {/* Last Page + Ellipsis */}
            {currentPage < totalPages - 1 && (
              <>
                {currentPage < totalPages - 2 && (
                  <span className="px-2 text-gray-500">...</span>
                )}
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-all shadow-sm text-gray-700"
                >
                  {totalPages}
                </button>
              </>
            )}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg transition-all shadow-md font-semibold 
      ${
        currentPage === totalPages
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800"
      }`}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-10">
          <h1 className="text-2xl font-semibold text-gray-700">
            No Appointments Booked
          </h1>
        </div>
      )}
    </div>
  );
};

export default Appointment;
