import { useEffect, useState } from "react";
import Card from "./components/Card";
import Instance from "../Instance";
import "react-calendar/dist/Calendar.css"; // Import calendar styles

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: [],
    leads: [],
    comments: [],
    changeAbitList: [],
    safetyNetList: [],
    subscribers: [],
    appointment: [],
  });

  const [errors, setErrors] = useState({
    blogs: null,
    leads: null,
    comments: null,
  });

  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const [currentDate] = useState(
    new Intl.DateTimeFormat("en-GB").format(new Date())
  );
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const responses = await Promise.allSettled([
          Instance.get("/admin/getAllBlogs"),
          Instance.post("/admin/getallChangeAbitList"),
          Instance.post("/admin/getAllSafetyList"),
          Instance.post("/admin/getleads"),
          Instance.post("/admin/getAllSubscribers"),
          Instance.post("/admin/getAllComments"),
          Instance.post("/admin/getAllAppointments"),
        ]);

        const updatedData = { ...dashboardData };
        const updatedErrors = { ...errors };

        responses.forEach((result, index) => {
          if (result.status === "fulfilled") {
            const data = result.value.data;

            switch (index) {
              case 0:
                updatedData.blogs = data.blogs;
                break;
              case 1:
                updatedData.changeAbitList = data.changeAbits;
                break;
              case 2:
                updatedData.safetyNetList = data.safetyRecords;
                break;
              case 3:
                updatedData.leads = data;
                break;
              case 4:
                updatedData.subscribers = data.results;
                break;
              case 5:
                updatedData.comments = data.comments;
                break;
              case 6:
                updatedData.appointment = data;
                break;
              default:
                break;
            }
          } else {
            const { reason } = result;
            const errorUrl = reason.response?.config?.url;

            if (errorUrl === "/admin/getAllBlogs")
              updatedErrors.blogs = "Total Blogs";
            if (errorUrl === "/admin/getleads")
              updatedErrors.leads = "Failed to fetch leads";
            if (errorUrl === "/admin/getAllSubscribers")
              updatedErrors.comments = "Failed to fetch comments";
            if (errorUrl === "/admin/getAllAppointments")
              updatedErrors.appointment = "Failed to fetch appointments";
          }
        });

        setDashboardData(updatedData);
        setErrors(updatedErrors);
      } catch (error) {
        console.error("Unexpected error during data fetching", error);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const calculateTotalData = () => {
    return (
      dashboardData.blogs.length +
      dashboardData.changeAbitList.length +
      dashboardData.safetyNetList.length
    );
  };

  return (
    <div>
      {/* Clock Header */}
      <header className="text-end p-2 text-lg font-semibold">
        Time: {currentTime} | Date: {currentDate}
      </header>

      {/* Dashboard Content */}
      {loading ? (
        <main className="flex flex-col gap-4">
          <div className="grid md:grid-cols-3 gap-4">
            {Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="border-2 p-4 rounded-md border-gray-300 bg-gray-100 animate-pulse"
              >
                <div className="h-6 bg-gray-300 rounded w-24 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-16"></div>
              </div>
            ))}
          </div>
        </main>
      ) : (
        <main className="flex flex-col gap-4">
          <div className="text-center mt-4 border-2 w-fit p-4 rounded-md border-white bg-primary text-white">
            <h2>
              Total Insights:{" "}
              <span className="font-bold text-yellow-300">
                {calculateTotalData()}
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <Card
              title="Blogs"
              totalCount={dashboardData.blogs.length}
              error={errors.blogs}
              link="/dashboard/listInsights"
              listType="ListBlog"
            />
            <Card
              title="ChangeABits"
              totalCount={dashboardData.changeAbitList.length}
              error={errors.changeAbitList}
              link="/dashboard/listInsights"
              listType="ListChangeABit"
            />
            <Card
              title="Safety Nets"
              totalCount={dashboardData.safetyNetList.length}
              error={errors.safetyNetList}
              link={"/dashboard/listInsights"}
              listType="ListSafetyNet"
            />
            <Card
              title="Leads"
              totalCount={dashboardData.leads.length}
              error={errors.leads}
              link={"/dashboard/contactList"}
            />
            <Card
              title="Comments"
              totalCount={dashboardData.comments.length}
              error={errors.comments}
              link={"/dashboard/Comment"}
            />
            <Card
              title="Subscribers"
              totalCount={dashboardData.subscribers.length}
              error={errors.subscribers}
              link={"/dashboard/members"}
            />
            <Card
              title="Appointments"
              totalCount={dashboardData.appointment?.length}
              error={errors.appointment}
              link={"/dashboard/Appointment"}
            />
          </div>
        </main>
      )}
    </div>
  );
};

export default Dashboard;
