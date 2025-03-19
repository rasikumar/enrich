import { useEffect, useState } from "react";
import Instance from "./Instance"; // Import your axios instance
import * as XLSX from "xlsx"; // Import xlsx

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [phone, setPhone] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  // Pagination logic (Move this above where it's used)
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await Instance.post("/admin/getleads");
        const sortedContacts = response.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        ); // Sort by date in descending order
        setContacts(sortedContacts);
        setFilteredContacts(sortedContacts);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };
    fetchContacts();
  }, []);

  // Filtering logic
  useEffect(() => {
    let filtered = contacts.filter((contact) => {
      return (
        (search === "" ||
          contact.name.toLowerCase().includes(search.toLowerCase()) ||
          contact.email.toLowerCase().includes(search.toLowerCase())) &&
        (phone === "" || contact.number.includes(phone))
      );
    });
    setFilteredContacts(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  }, [search, phone, contacts]);

  // Reset Filters
  const resetFilters = () => {
    setSearch("");
    setPhone("");
    setFilteredContacts(contacts);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // const pageNumbers = [];
  // for (let i = 1; i <= totalPages; i++) {
  //   pageNumbers.push(i);
  // }

  // Export Data to Excel
  const exportToExcel = () => {
    const columnHeaders = [
      { header: "ID", key: "id" },
      { header: "Name", key: "name" },
      { header: "Phone", key: "number" },
      { header: "Email", key: "email" },
      { header: "Subject", key: "type" },
      { header: "Details", key: "message" },
      { header: "Created At", key: "date" },
    ];

    const data = filteredContacts
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date in descending order
      .map((contact) => ({
        id: contact.id,
        name: contact.name,
        number: contact.number,
        email: contact.email,
        type: contact.type,
        message: contact.message,
        date: new Date(contact.date).toLocaleString("en-IN", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }),
      }));

    const worksheetData = [
      columnHeaders.map((header) => header.header),
      ...data.map((contact) => Object.values(contact)),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");

    const now = new Date();
    const formattedDate = now
      .toLocaleString("en-IN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      .replace(/[/, ]/g, "_")
      .replace(/:/g, "-");

    XLSX.writeFile(workbook, `contact_list_${formattedDate}.xlsx`);
  };

  // Pagination logic
  // const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
  const currentData = filteredContacts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4 max-md:mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
        Contact List
      </h2>

      {/* Filter Inputs */}
      <div className="mb-4 flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Search by Name or Email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-1/3"
        />
        <input
          type="text"
          placeholder="Search by Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-full md:w-1/3"
        />
        <button
          onClick={resetFilters}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Reset Filter
        </button>
      </div>

      {/* Export Button */}
      <div className="flex justify-center md:justify-start mb-4">
        <button
          onClick={exportToExcel}
          disabled={filteredContacts.length === 0}
          className={`px-4 py-2 rounded-md ${
            filteredContacts.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          Export to Excel
        </button>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-300 min-w-[600px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-sm">ID</th>
              <th className="border border-gray-300 p-2 text-sm">Name</th>
              <th className="border border-gray-300 p-2 text-sm">Phone</th>
              <th className="border border-gray-300 p-2 text-sm">Email</th>
              <th className="border border-gray-300 p-2 text-sm">Subject</th>
              <th className="border border-gray-300 p-2 text-sm">Details</th>
              <th className="border border-gray-300 p-2 text-sm">Created At</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((contact) => (
              <tr key={contact.id} className="text-sm">
                <td className="border border-gray-300 p-2">{contact.id}</td>
                <td className="border border-gray-300 p-2">{contact.name}</td>
                <td className="border border-gray-300 p-2">{contact.number}</td>
                <td className="border border-gray-300 p-2">{contact.email}</td>
                <td className="border border-gray-300 p-2">{contact.type}</td>
                <td className="border border-gray-300 p-2 max-w-96 overflow-auto">
                  {contact.message}
                </td>
                <td className="border border-gray-300 p-2">
                  {new Date(contact.date).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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
            {currentPage > 3 && <span className="px-2 text-gray-500">...</span>}
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
          disabled={currentPage === totalPages || filteredContacts.length === 0}
          className={`px-4 py-2 rounded-lg transition-all shadow-md font-semibold 
      ${
        currentPage === totalPages || filteredContacts.length === 0
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800"
      }`}
        >
          Next
        </button>
      </div>

      {/* No Data Message */}
      {filteredContacts.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No contacts found.</p>
      )}
    </div>
  );
};

export default ContactList;
