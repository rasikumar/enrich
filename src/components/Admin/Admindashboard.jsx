import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import CreateBlog from "./insight/blog/CreateBlog";
import CreateNewsLetter from "./newsletter/CreateNewsLetter";
import ListNewsLetter from "./newsletter/ListNewsLetter";
import Logout from "./Logout";
import ContactList from "./contactList";
// import CommentList from "./insight/blog/CommentList";
import Dashboard from "../Admin/dashboard/dashboard";
import Members from "./newsletter/Members";
import { motion } from "framer-motion";
import List from "./insight/List";
import Create from "./insight/Create";
import Comment from "./insight/Comment";

const Admindashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeDropdown, setActiveDropdown] = useState(null); // Track the active dropdown
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (!token || isTokenExpired(token)) {
      navigate("/admin");
      localStorage.removeItem("jwtToken");
      window.location.reload();
    }
  }, [navigate]);

  const isTokenExpired = (token) => {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiry = payload.exp * 1000; // Convert to milliseconds
    return Date.now() > expiry;
  };

  const handleDropdownToggle = (dropdownName) => {
    setActiveDropdown((prevDropdown) =>
      prevDropdown === dropdownName ? null : dropdownName
    );
  };

  const handleBlogOptionClick = (tab) => {
    setActiveTab(tab);
    // setActiveDropdown(null);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "createInsights":
        return <Create />;
      case "listInsighs":
        return <List />;
      case "createNewsLetter":
        return <CreateNewsLetter />;
      case "listNewsLetter":
        return <ListNewsLetter />;
      case "members":
        return <Members />;
      case "contactList":
        return <ContactList />;
      case "Comment":
        return <Comment />;
      default:
        return <div>Select an option from the sidebar</div>;
    }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
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

              {/* Dropdown for Insights options */}
              <li className="w-full">
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    activeDropdown === "insights"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => handleDropdownToggle("insights")} // Toggle dropdown
                >
                  Insights
                </button>
                {/* Dropdown Menu */}
                {activeDropdown === "insights" && (
                  <motion.ul
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    className="pl-4 mt-2 space-y-2"
                  >
                    <li className="w-full">
                      <button
                        className={`w-full text-left px-4 py-2 rounded-lg ${
                          activeTab === "listInsighs"
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200"
                        }`}
                        onClick={() => handleBlogOptionClick("listInsighs")}
                      >
                        Insights List
                      </button>
                    </li>
                    <li className="w-full">
                      <button
                        className={`w-full text-left px-4 py-2 rounded-lg ${
                          activeTab === "createInsights"
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200"
                        }`}
                        onClick={() => handleBlogOptionClick("createInsights")}
                      >
                        Create Insights
                      </button>
                    </li>
                    <li className="w-full">
                      <button
                        className={`w-full text-left px-4 py-2 rounded-lg ${
                          activeTab === "Comment"
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200"
                        }`}
                        onClick={() => setActiveTab("Comment")}
                      >
                        Comment List
                      </button>
                    </li>
                  </motion.ul>
                )}
              </li>

              {/* Dropdown for Newsletter options */}
              <li className="w-full">
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    activeDropdown === "newsletters"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => handleDropdownToggle("newsletters")} // Toggle dropdown
                >
                  Newsletter
                </button>
                {/* Dropdown Menu */}
                {activeDropdown === "newsletters" && (
                  <motion.ul
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    className="pl-4 mt-2 space-y-2"
                  >
                    <li className="w-full">
                      <button
                        className={`w-full text-left px-4 py-2 rounded-lg ${
                          activeTab === "listNewsLetter"
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200"
                        }`}
                        onClick={() => handleBlogOptionClick("listNewsLetter")}
                      >
                        Newsletter List
                      </button>
                    </li>
                    <li className="w-full">
                      <button
                        className={`w-full text-left px-4 py-2 rounded-lg ${
                          activeTab === "createNewsLetter"
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200"
                        }`}
                        onClick={() =>
                          handleBlogOptionClick("createNewsLetter")
                        }
                      >
                        Create Newsletter
                      </button>
                    </li>
                    <li className="w-full">
                      <button
                        className={`w-full text-left px-4 py-2 rounded-lg ${
                          activeTab === "members"
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200"
                        }`}
                        onClick={() => handleBlogOptionClick("members")}
                      >
                        Subscribers
                      </button>
                    </li>
                  </motion.ul>
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
