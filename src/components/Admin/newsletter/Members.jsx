import { useEffect, useState } from "react";
import Instance from "../Instance"; // Import your axios instance
import * as XLSX from "xlsx"; // Import xlsx
import { GrPowerReset } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { FaFileExport } from "react-icons/fa";

const Members = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState({
    id: "",
    email: "",
    subscription_date: "",
  });

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await Instance.post("admin/getAllSubscribers");
        // console.log(response);
        setContacts(response.data.results);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  const exportToExcel = () => {
    // Define column headers
    const columnHeaders = [
      { header: "ID", key: "id" },
      { header: "Email", key: "email" },
      { header: "Created At", key: "subscription_date" },
    ];

    // Map contacts data to match headers
    const data = contacts.map((contact) => ({
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

    // Add headers to the data
    const worksheetData = [
      columnHeaders.map((header) => header.header),
      ...data.map((contact) => Object.values(contact)),
    ];

    // Create worksheet from data
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");

    // Write the Excel file
    XLSX.writeFile(workbook, "contact_list.xlsx");
  };

  // Filter contacts based on the filter criteria
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

  const resetFilters = () => {
    setFilter({
      id: "",
      email: "",
      subscription_date: "",
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Contact List</h2>

      {/* Filter Inputs */}
      <div className="mb-4 flex">
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
          className="bg-red-500 text-white rounded-md hover:bg-red-600 p-4"
        >
          <GrPowerReset />
        </button>
      </div>

      {/* Export Button */}
      <button
        onClick={exportToExcel}
        className="mb-4 px-4 py-2 mr-4 bg-green-500 text-white rounded-md hover:bg-green-600 inline-flex items-center gap-4"
      >
        Export
        <FaFileExport />
      </button>
      <button
        onClick={exportToExcel}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 inline-flex items-center gap-4"
      >
        Send to All
        <IoSend />
      </button>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Created At</th>
            <th className="border border-gray-300 p-2">Send</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact, id) => (
              <tr key={id}>
                <td className="border border-gray-300 p-2">{contact.id}</td>
                <td className="border border-gray-300 p-2">{contact.email}</td>
                <td className="border border-gray-300 p-2">
                  {new Date(contact.subscription_date).toLocaleString()}
                </td>
                <td className="border border-gray-300 p-2 flex items-center justify-center">
                  <button
                    onClick={resetFilters}
                    className="bg-blue-500 text-white rounded-md hover:bg-blue-600 p-2 m-auto w-full text-center flex items-center justify-center"
                  >
                    <IoSend />
                  </button>
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
    </div>
  );
};

export default Members;
