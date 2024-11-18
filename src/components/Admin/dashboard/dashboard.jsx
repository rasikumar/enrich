import { useEffect, useState } from "react";
import Card from "./components/Card";
import Instance from "../Instance";
import "react-calendar/dist/Calendar.css"; // Import calendar styles

const Dashboard = () => {
  const [FullBlog, setFullBlog] = useState([]);
  const [FullLead, setFullLead] = useState([]);
  const [FullComment, setFullComment] = useState([]);
  const [ChangeAbitList, setChangeAbitList] = useState([]);
  const [SafetyNetList, setSafetyNetList] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [BlogError, setBlogError] = useState(null);
  const [LeadError, setLeadError] = useState(null);
  const [CommentError, setCommentError] = useState(null);
  const [CurrentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [CurrentDate] = useState(new Date().toLocaleDateString()); // State for current date

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const blogResponse = await Instance.get("/admin/getAllBlogs");
        setFullBlog(blogResponse.data.blogs);

        const changeAbitResponse = await Instance.post("/admin/getallChangeAbitList");
        setChangeAbitList(changeAbitResponse.data.changeAbits);

        const safetyNetResponse = await Instance.post("/admin/getAllSafetyList");
        setSafetyNetList(safetyNetResponse.data.safetyRecords);

        const leadResponse = await Instance.post("/admin/getleads");
        setFullLead(leadResponse.data);

        const commentResponse = await Instance.post("/admin/getAllSubscribers");
        setFullComment(commentResponse.data.results);
      } catch (error) {
        console.error(error);
        if (error.response?.config?.url === "/admin/getAllBlogs") {
          setBlogError("Failed to fetch blogs");
        }
        if (error.response?.config?.url === "/admin/getleads") {
          setLeadError("Failed to fetch leads");
        }
        if (error.response?.config?.url === "/admin/getAllSubscribers") {
          setCommentError("Failed to fetch comments");
        }
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate total combined data
  const calculateTotalData = () => {
    const totalBlogs = FullBlog.length;
    const totalChangeAbit = ChangeAbitList.length;
    const totalSafetyNets = SafetyNetList.length;
    return totalBlogs + totalChangeAbit + totalSafetyNets;
  };

  return (
    <div>
      {/* Clock Header */}
      <header className="text-end p-2 text-lg font-semibold">
        Time: {CurrentTime} | Date: {CurrentDate}
      </header>

      {/* Dashboard Content */}
      {Loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <main className="flex flex-col gap-4">
          <div className="text-center mt-4 border-2 w-fit p-4 rounded-md border-blue-100">
            <h2>Total Insights: {calculateTotalData()}</h2>
          </div>
          <div className="flex w-full gap-4">
            <Card title="Blogs" totalCount={FullBlog.length} error={BlogError} />
            <Card title="ChangeABits" totalCount={ChangeAbitList.length} error={null} />
            <Card title="SafetyNets" totalCount={SafetyNetList.length} error={null} />
          </div>
          <div className="flex gap-4">
            <Card title="Leads" totalCount={FullLead.length} error={LeadError} />
            <Card title="Comments" totalCount={FullComment.length} error={CommentError} />
            <Card title="Subscribers" totalCount={FullComment.length} error={CommentError} />
          </div>
        </main>
      )}
    </div>
  );
};

export default Dashboard;
