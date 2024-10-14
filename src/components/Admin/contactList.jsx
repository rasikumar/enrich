import { useEffect, useState } from "react";
import Instance from "./Instance"; // Import your axios instance
import * as XLSX from "xlsx"; // Import xlsx

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await Instance.post("/admin/getleads");
        // console.log(response);
        setContacts(response.data);
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
      { header: "Name", key: "name" },
      { header: "Phone", key: "phone" },
      { header: "Email", key: "email" },
      { header: "Subject", key: "subject" },
      { header: "Details", key: "details" },
      { header: "Created At", key: "createdAt" },
    ];

    // Map contacts data to match headers
    const data = contacts.map((contact) => ({
      id: contact.id,
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      subject: contact.subject,
      details: contact.details,
      createdAt: new Date(contact.createdAt).toLocaleString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Contact List</h2>

      {/* Export Button */}
      <button
        onClick={exportToExcel}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      >
        Export to Excel
      </button>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Phone</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Subject</th>
            <th className="border border-gray-300 p-2">Details</th>
            <th className="border border-gray-300 p-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td className="border border-gray-300 p-2">{contact.id}</td>
              <td className="border border-gray-300 p-2">{contact.name}</td>
              <td className="border border-gray-300 p-2">{contact.phone}</td>
              <td className="border border-gray-300 p-2">{contact.email}</td>
              <td className="border border-gray-300 p-2">{contact.subject}</td>
              <td className="border border-gray-300 p-2">{contact.details}</td>
              <td className="border border-gray-300 p-2">
                {new Date(contact.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
