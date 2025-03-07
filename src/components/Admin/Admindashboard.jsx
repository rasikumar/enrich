import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Menu,
  Home,
  BookOpen,
  PlusCircle,
  MessageSquare,
  FileText,
  Users,
  Phone,
  Calendar,
  X,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [insightsOpen, setInsightsOpen] = useState(false);
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, []);

  useEffect(() => {
    if (
      location.pathname.includes("listInsighs") ||
      location.pathname.includes("createInsights") ||
      location.pathname.includes("Comment")
    ) {
      setInsightsOpen(true);
    }
    if (
      location.pathname.includes("createNewsLetter") ||
      location.pathname.includes("members")
    ) {
      setNewsletterOpen(true);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "/admin";
  };

  return (
    <div className="min-h-screen flex z-50">
      {/* Sidebar Toggle Button */}
      <button
        className={`md:hidden p-3 fixed top-4 left-4 bg-gray-700 text-white rounded-md z-50 shadow-lg transition-all ${
          isSidebarOpen ? "translate-x-56" : "translate-x-0"
        }`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <nav
        className={`fixed md:relative top-0 left-0 h-screen bg-[#F4F4F5] text-[#1F2937] p-4 w-1/6 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 shadow-md`}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col items-start space-y-4">
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 text-lg font-medium w-full px-4 py-2 rounded-lg transition ${
                  isActive ? "bg-[#4B5563] text-white" : "hover:bg-[#E5E7EB]"
                }`
              }
              to="dashboard"
            >
              <Home className="w-5 h-5" />
              Home
            </NavLink>

            {/* Insights Dropdown */}
            <div className="w-full">
              <button
                className="flex items-center justify-between text-lg font-medium w-full px-4 py-2 rounded-lg hover:bg-[#E5E7EB]"
                onClick={() => setInsightsOpen(!insightsOpen)}
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5" />
                  Insights
                </div>
                {insightsOpen ? "▲" : "▼"}
              </button>
              {insightsOpen && (
                <div className="ml-6 space-y-2">
                  <NavLink
                    to="listInsighs"
                    className={({ isActive }) =>
                      `flex items-center gap-2 text-sm px-3 py-2 rounded-lg transition ${
                        isActive
                          ? "bg-[#4B5563] text-white"
                          : "hover:bg-[#E5E7EB]"
                      }`
                    }
                  >
                    <FileText className="w-4 h-4" />
                    Insights List
                  </NavLink>
                  <NavLink
                    to="createInsights"
                    className={({ isActive }) =>
                      `flex items-center gap-2 text-sm px-3 py-2 rounded-lg transition ${
                        isActive
                          ? "bg-[#4B5563] text-white"
                          : "hover:bg-[#E5E7EB]"
                      }`
                    }
                  >
                    <PlusCircle className="w-4 h-4" />
                    Create Insights
                  </NavLink>
                  <NavLink
                    to="Comment"
                    className={({ isActive }) =>
                      `flex items-center gap-2 text-sm px-3 py-2 rounded-lg transition ${
                        isActive
                          ? "bg-[#4B5563] text-white"
                          : "hover:bg-[#E5E7EB]"
                      }`
                    }
                  >
                    <MessageSquare className="w-4 h-4" />
                    Comments
                  </NavLink>
                </div>
              )}
            </div>

            {/* Newsletter Dropdown */}
            <div className="w-full">
              <button
                className="flex items-center justify-between text-lg font-medium w-full px-4 py-2 rounded-lg hover:bg-[#E5E7EB]"
                onClick={() => setNewsletterOpen(!newsletterOpen)}
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5" />
                  Newsletter
                </div>
                {newsletterOpen ? "▲" : "▼"}
              </button>
              {newsletterOpen && (
                <div className="ml-6 space-y-2">
                  <NavLink
                    to="createNewsLetter"
                    className={({ isActive }) =>
                      `flex items-center gap-2 text-sm px-3 py-2 rounded-lg transition ${
                        isActive
                          ? "bg-[#4B5563] text-white"
                          : "hover:bg-[#E5E7EB]"
                      }`
                    }
                  >
                    <PlusCircle className="w-4 h-4" />
                    Create Newsletter
                  </NavLink>
                  <NavLink
                    to="members"
                    className={({ isActive }) =>
                      `flex items-center gap-2 text-sm px-3 py-2 rounded-lg transition ${
                        isActive
                          ? "bg-[#4B5563] text-white"
                          : "hover:bg-[#E5E7EB]"
                      }`
                    }
                  >
                    <Users className="w-4 h-4" />
                    Subscribers
                  </NavLink>
                </div>
              )}
            </div>

            <NavLink
              to="contactList"
              className={({ isActive }) =>
                `flex items-center gap-3 text-lg font-medium w-full px-4 py-2 rounded-lg transition ${
                  isActive ? "bg-[#4B5563] text-white" : "hover:bg-[#E5E7EB]"
                }`
              }
            >
              <Phone className="w-5 h-5" />
              Leads
            </NavLink>

            <NavLink
              to="Appointment"
              className={({ isActive }) =>
                `flex items-center gap-3 text-lg font-medium w-full px-4 py-2 rounded-lg transition ${
                  isActive ? "bg-[#4B5563] text-white" : "hover:bg-[#E5E7EB]"
                }`
              }
            >
              <Calendar className="w-5 h-5" />
              Appointments
            </NavLink>
          </div>

          {/* Logout Button */}
          <button
            className="flex items-center gap-3 justify-center w-full px-4 py-2 text-lg font-medium rounded-lg bg-[#EF4444] text-white hover:bg-[#DC2626] transition"
            onClick={handleLogout} // Replace with your logout function
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-6 h-screen overflow-auto bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
