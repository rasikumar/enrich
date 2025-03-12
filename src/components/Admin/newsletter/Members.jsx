import { useEffect, useState } from "react";
import Instance from "../Instance";
import * as XLSX from "xlsx";
import { GrPowerReset } from "react-icons/gr";
import { FaFileExport } from "react-icons/fa";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

const Members = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [filter, setFilter] = useState({
    id: "",
    email: "",
    subscription_date: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [newsletterContent] = useState(""); // Newsletter content state
  const itemsPerPage = 10;
  const [blog, setBlog] = useState(0);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await Instance.post("admin/getAllSubscribers");
        setContacts(response.data.results);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  const exportToExcel = () => {
    if (selectedContacts.length === 0) return;

    const columnHeaders = [
      { header: "ID", key: "id" },
      { header: "Email", key: "email" },
      { header: "Created At", key: "subscription_date" },
    ];

    // Filter selected contacts
    const data = contacts
      .filter((contact) => selectedContacts.includes(contact.id))
      .map((contact) => ({
        id: contact.id,
        email: contact.email,
        subscription_date: new Date(contact.subscription_date).toLocaleString(
          "en-IN",
          {
            year: "numeric",
            month: "short",
            day: "numeric",
          }
        ),
      }));

    if (data.length === 0) {
      alert("No contacts selected for export.");
      return;
    }

    const worksheetData = [
      columnHeaders.map((header) => header.header),
      ...data.map((contact) => Object.values(contact)),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Selected Contacts");
    XLSX.writeFile(workbook, "selected_contacts.xlsx");
  };

  const filteredContacts = contacts.filter((contact) => {
    const { id, email, subscription_date } = filter;
    const matchesId = id ? contact.id.toString().includes(id) : true;
    const matchesEmail = email
      ? contact.email.toLowerCase().includes(email.toLowerCase())
      : true;
    const matchesDate = subscription_date
      ? new Date(contact.subscription_date).toLocaleDateString() ===
        new Date(subscription_date).toLocaleDateString()
      : true;
    return matchesId && matchesEmail && matchesDate;
  });

  const totalItems = filteredContacts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedContacts = filteredContacts.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const resetFilters = () => {
    setFilter({
      id: "",
      email: "",
      subscription_date: "",
    });
    setCurrentPage(1);
  };

  const toggleSelectContact = (id) => {
    setSelectedContacts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((contactId) => contactId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedContacts.length === paginatedContacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(paginatedContacts.map((contact) => contact.id));
    }
  };

  const closeNewsletterModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await Instance.get("/admin/getAllBlogs");
        // console.log(response.data.blogs);
        const sortedBlogs = response.data.blogs.sort(
          (a, b) => new Date(b.blog_date) - new Date(a.blog_date)
        );
        setBlog(sortedBlogs);
      } catch (error) {
        console.error("err", error);
      }
    };
    fetchBlogs();
  }, []);

  const sendNewsletter = () => {
    console.log("Sending newsletter to:", selectedContacts);
    console.log("Newsletter content:", newsletterContent);
    blog();
    closeNewsletterModal();
  };

  return (
    <div className="max-md:mt-10">
      <h2 className="text-2xl font-semibold mb-4">Contact List</h2>

      <div className="mb-4 w-full flex flex-wrap gap-5">
        <input
          type="text"
          placeholder="Filter by ID"
          value={filter.id}
          onChange={(e) => setFilter({ ...filter, id: e.target.value })}
          className="mr-2 border border-gray-300 rounded-md p-2"
        />
        <input
          type="text"
          placeholder="Filter by Email"
          value={filter.email}
          onChange={(e) => setFilter({ ...filter, email: e.target.value })}
          className="mr-2 border border-gray-300 rounded-md p-2"
        />
        <input
          type="date"
          value={filter.subscription_date}
          onChange={(e) =>
            setFilter({ ...filter, subscription_date: e.target.value })
          }
          className="mr-2 border border-gray-300 rounded-md p-2"
        />
        <button
          onClick={resetFilters}
          className="bg-blue-500 inline-flex items-center gap-2 text-white rounded-md hover:bg-red-600 p-2"
        >
          Reset Filter
        </button>
      </div>

      <button
        onClick={exportToExcel}
        disabled={selectedContacts.length === 0}
        className={`mb-4 px-4 py-2 mr-4 rounded-md inline-flex items-center gap-4 
    ${
      selectedContacts.length === 0
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-green-500 hover:bg-green-600 text-white"
    }`}
      >
        Export <FaFileExport />
      </button>

      <table className="min-w-full bg-white border border-gray-300 overflow-auto">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={selectedContacts.length === paginatedContacts.length}
              />
            </th>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {paginatedContacts.length > 0 ? (
            paginatedContacts.map((contact, id) => (
              <tr key={id}>
                <td className="border border-gray-300 p-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedContacts.includes(contact.id)}
                    onChange={() => toggleSelectContact(contact.id)}
                  />
                </td>
                <td className="border border-gray-300 p-2">{contact.id}</td>
                <td className="border border-gray-300 p-2">{contact.email}</td>
                <td className="border border-gray-300 p-2">
                  {new Date(contact.subscription_date).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="border border-gray-300 p-2 text-center"
              >
                No contacts found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-1/2">
            <h2 className="text-xl font-semibold mb-4">Send Newsletter</h2>
            {blog && blog.id}
            <div className="flex justify-end space-x-2">
              <button
                onClick={closeNewsletterModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={sendNewsletter}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
        >
          <HiArrowLeft />
        </button>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
        >
          <HiArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Members;
