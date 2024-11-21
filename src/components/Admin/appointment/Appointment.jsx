import { useEffect, useState } from "react";
import Instance from "../Instance";

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    assessment: "",
    date: ""
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await Instance.post("/admin/getAllAppointments");
        setAppointments(response.data);
        setFilteredAppointments(response.data); // Initialize filtered list
        console.log(response.data);
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
      filteredData = filteredData.filter((contact) =>
        contact.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.date) {
      const filterDate = new Date(filters.date).toLocaleDateString();
      filteredData = filteredData.filter((contact) =>
        new Date(contact.selectDate).toLocaleDateString() === filterDate
      );
    }

    setFilteredAppointments(filteredData);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, appointments]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      name: "",
      assessment: "",
      date: ""
    });
  };

  // Pagination logic
  const indexOfLastAppointment = currentPage * itemsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - itemsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

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
    <div className="p-6 bg-gray-50">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Filter Appointments</h2>
        <div className="flex gap-4">
          <input
            type="text"
            name="name"
            placeholder="Filter by Name"
            className="border p-2 rounded-md"
            value={filters.name}
            onChange={handleFilterChange}
          />
          
          <input
            type="date"
            name="date"
            className="border p-2 rounded-md"
            value={filters.date}
            onChange={handleFilterChange}
          />
          <button
            onClick={resetFilters}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Reset Filters
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
                  <th className="border border-gray-300 p-2">Assessment</th>
                  <th className="border border-gray-300 p-2">Slots</th>
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
                    <td className="border border-gray-300 p-2">{contact.name}</td>
                    <td className="border border-gray-300 p-2">{contact.number}</td>
                    <td className="border border-gray-300 p-2">{contact.email}</td>
                    <td className="border border-gray-300 p-2">{contact.assessmentType}</td>
                    <td className="border border-gray-300 p-2">{contact.slot}</td>
                    <td className="border border-gray-300 p-2">
                      {new Date(contact.selectDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
            >
              Previous
            </button>
            {pageNumbers.slice(0, 5).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`p-2 border border-gray-300 rounded-md hover:bg-gray-100 ${currentPage === page ? "bg-blue-500 text-white" : "text-gray-700"}`}
              >
                {page}
              </button>
            ))}
            {totalPages > 5 && (
              <span className="p-2 text-gray-700">...</span>
            )}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50"
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
