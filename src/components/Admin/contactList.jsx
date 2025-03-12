import { useEffect, useState } from "react";
import Instance from "./Instance"; // Import your axios instance
import * as XLSX from "xlsx"; // Import xlsx

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await Instance.post("/admin/getleads");
        setContacts(response.data);
        setFilteredContacts(response.data);
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
  }, [search, phone, contacts]);

  // Reset Filters
  const resetFilters = () => {
    setSearch("");
    setPhone("");
    setFilteredContacts(contacts);
  };

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

    const data = filteredContacts.map((contact) => ({
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
      }),
    }));

    const worksheetData = [
      columnHeaders.map((header) => header.header),
      ...data.map((contact) => Object.values(contact)),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");
    XLSX.writeFile(workbook, "contact_list.xlsx");
  };

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
            {filteredContacts.map((contact) => (
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

      {/* No Data Message */}
      {filteredContacts.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No contacts found.</p>
      )}
    </div>
  );
};

export default ContactList;
