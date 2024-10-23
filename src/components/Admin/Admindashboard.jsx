import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateBlog from "./blog/CreateBlog";
import ListBlogs from "./blog/ListBlogs";
import Logout from "./Logout";
import ContactList from "./contactList";
import CommentList from "./CommentList";
import Dashboard from "../Admin/dashboard/dashboard";

const Admindashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isBlogDropdownOpen, setBlogDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (!token || isTokenExpired(token)) {
      navigate("/admin");
      localStorage.removeItem("jwtToken");
    }
  }, [navigate]);

  const isTokenExpired = (token) => {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiry = payload.exp * 1000; // Convert to milliseconds
    return Date.now() > expiry;
  };

  const handleBlogOptionClick = (tab) => {
    setActiveTab(tab);
    // Do not toggle the dropdown when selecting an active tab
    if (activeTab !== tab) {
      setBlogDropdownOpen(false); // Close dropdown only if a different tab is clicked
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "createBlog":
        return <CreateBlog />;
      case "listBlog":
        return <ListBlogs />;
      case "contactList":
        return <ContactList />;
      case "commentList":
        return <CommentList />;
      default:
        return <div>Select an option from the sidebar</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex-shrink-0">
        <div className="p-6 fixed lg:relative h-screen w-64">
          <span className="text-base font-semibold inline-flex gap-2 items-center">
            Dashboard
            <Logout />
          </span>
          <nav className="mt-8">
            <ul className="space-y-4 flex flex-col h-full w-full">
              <li className="w-full">
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    activeTab === "dashboard"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setActiveTab("dashboard")}
                >
                  Dashboard
                </button>
              </li>

              {/* Dropdown for Blog options */}
              <li className="w-full">
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    isBlogDropdownOpen
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setBlogDropdownOpen(!isBlogDropdownOpen)} // Toggle dropdown
                >
                  Blogs
                </button>
                {/* Dropdown Menu */}
                {isBlogDropdownOpen && (
                  <ul className="pl-4 mt-2 space-y-2">
                    <li className="w-full">
                      <button
                        className={`w-full text-left px-4 py-2 rounded-lg ${
                          activeTab === "listBlog"
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200"
                        }`}
                        onClick={() => handleBlogOptionClick("listBlog")}
                      >
                        Blog List
                      </button>
                    </li>
                    <li className="w-full">
                      <button
                        className={`w-full text-left px-4 py-2 rounded-lg ${
                          activeTab === "createBlog"
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200"
                        }`}
                        onClick={() => handleBlogOptionClick("createBlog")}
                      >
                        Create Blog
                      </button>
                    </li>
                  </ul>
                )}
              </li>

              <li className="w-full">
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    activeTab === "contactList"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setActiveTab("contactList")}
                >
                  Leads
                </button>
              </li>
              <li className="w-full">
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    activeTab === "commentList"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setActiveTab("commentList")}
                >
                  Comment List
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full p-6 mt-6 lg:mt-0">{renderContent()}</div>
    </div>
  );
};

export default Admindashboard;
