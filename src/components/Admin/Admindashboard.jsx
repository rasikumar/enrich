import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreateNewsLetter from "./newsletter/CreateNewsLetter";
// import ListNewsLetter from "./newsletter/ListNewsLetter";
import Logout from "./Logout";
import ContactList from "./contactList";
import Dashboard from "../Admin/dashboard/dashboard";
import Members from "./newsletter/Members";
import { motion } from "framer-motion";
import List from "./insight/List";
import Create from "./insight/Create";
import Comment from "./insight/Comment";
import { GiHamburgerMenu } from "react-icons/gi";
import Appointment from "./appointment/Appointment";

const Admindashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
    const expiry = payload.exp * 1000;
    return Date.now() > expiry;
  };

  const handleDropdownToggle = (dropdownName) => {
    setActiveDropdown((prevDropdown) =>
      prevDropdown === dropdownName ? null : dropdownName
    );
  };

  const handleBlogOptionClick = (tab) => {
    setActiveTab(tab);
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
      // case "listNewsLetter":
      //   return <ListNewsLetter />;
      case "members":
        return <Members />;
      case "contactList":
        return <ContactList />;
      case "Comment":
        return <Comment />;
      case "Appointment":
        return <Appointment />;
      default:
        return <div>Select an option from the sidebar</div>;
    }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } lg:block w-full lg:w-64 bg-white shadow-lg flex-shrink-0`}
      >
        <div className="p-6 fixed lg:relative h-full w-full lg:w-64 z-50 bg-[#BCBDC0]">
          <span className="text-base font-semibold inline-flex gap-2 items-center">
            Dashboard
            <Logout />
          </span>
          <nav className="mt-8">
            <ul className="space-y-4">
              <li>
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    activeTab === "dashboard"
                      ? "bg-[#28469f] text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setActiveTab("dashboard")}
                >
                  Dashboard
                </button>
              </li>

              {/* Dropdown for Insights options */}
              <li>
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    activeDropdown === "insights"
                      ? "bg-[#28469f] text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => handleDropdownToggle("insights")}
                >
                  Insights
                </button>
                {activeDropdown === "insights" && (
                  <motion.ul
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    className="pl-4 mt-2 space-y-2"
                  >
                    <li>
                      <button
                        className={`w-full text-left px-4 py-2 rounded-lg ${
                          activeTab === "listInsighs"
                            ? "bg-[#28469f] text-white"
                            : "bg-gray-200"
                        }`}
                        onClick={() => handleBlogOptionClick("listInsighs")}
                      >
                        Insights List
                      </button>
                    </li>
                    <li>
                      <button
                        className={`w-full text-left px-4 py-2 rounded-lg ${
                          activeTab === "createInsights"
                            ? "bg-[#28469f] text-white"
                            : "bg-gray-200"
                        }`}
                        onClick={() => handleBlogOptionClick("createInsights")}
                      >
                        Create Insights
                      </button>
                    </li>
                    <li>
                      <button
                        className={`w-full text-left px-4 py-2 rounded-lg ${
                          activeTab === "Comment"
                            ? "bg-[#28469f] text-white"
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
              <li>
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    activeDropdown === "newsletters"
                      ? "bg-[#28469f] text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => handleDropdownToggle("newsletters")}
                >
                  Newsletter
                </button>
                {activeDropdown === "newsletters" && (
                  <motion.ul
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    className="pl-4 mt-2 space-y-2"
                  >
                    {/* <li>
                      <button
                        className={`w-full text-left px-4 py-2 rounded-lg ${
                          activeTab === "listNewsLetter"
                            ? "bg-[#28469f] text-white"
                            : "bg-gray-200"
                        }`}
                        onClick={() => handleBlogOptionClick("listNewsLetter")}
                      >
                        Newsletter List
                      </button>
                    </li> */}
                    <li>
                      <button
                        className={`w-full text-left px-4 py-2 rounded-lg ${
                          activeTab === "createNewsLetter"
                            ? "bg-[#28469f] text-white"
                            : "bg-gray-200"
                        }`}
                        onClick={() =>
                          handleBlogOptionClick("createNewsLetter")
                        }
                      >
                        Create Newsletter
                      </button>
                    </li>
                    <li>
                      <button
                        className={`w-full text-left px-4 py-2 rounded-lg ${
                          activeTab === "members"
                            ? "bg-[#28469f] text-white"
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

              <li>
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    activeTab === "contactList"
                      ? "bg-[#28469f] text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setActiveTab("contactList")}
                >
                  Leads
                </button>
              </li>

              <li>
                <button
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    activeTab === "Appointment"
                      ? "bg-[#28469f] text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setActiveTab("Appointment")}
                >
                  Appointments
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 mt-6 lg:mt-0">{renderContent()}</div>

      {/* Mobile Sidebar Toggle */}
      <button
        className="lg:hidden z-50 fixed top-4 left-4 bg-[#28469f] text-white px-4 py-2 rounded"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <GiHamburgerMenu className="text-end" /> : "Open Menu"}
      </button>
    </div>
  );
};

export default Admindashboard;
