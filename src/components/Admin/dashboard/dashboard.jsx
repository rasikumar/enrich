import { useEffect, useState } from "react";
import Card from "./components/Card";
import Instance from "../Instance";

const Dashboard = () => {
  const [FullBlog, setFullBlog] = useState([]);
  const [FullLead, setFullLead] = useState([]);
  const [FullComment, setFullComment] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [BlogError, setBlogError] = useState(null);
  const [LeadError, setLeadError] = useState(null);
  const [CommentError, setCommentError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Fetch blogs
      try {
        const response = await Instance.get("/admin/getAllBlogs");
        setFullBlog(response.data.blogs);
      } catch (error) {
        setBlogError("Failed to fetch blogs");
        console.log(error);
      }

      // Fetch leads
      try {
        const response = await Instance.post("/admin/getleads");
        setFullLead(response.data);
      } catch (error) {
        setLeadError("Failed to fetch leads");
        console.log(error);
      }

      // Fetch comments
      try {
        const response = await Instance.post("/admin/getAllComments");
        setFullComment(response.data.comments);
      } catch (error) {
        setCommentError();
        console.log(error);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      {Loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <main className="flex justify-between gap-4">
          <Card title="Blogs" totalCount={FullBlog.length} error={BlogError} />
          <Card title="Leads" totalCount={FullLead.length} error={LeadError} />
          <Card
            title="Comments"
            totalCount={FullComment.length}
            error={CommentError}
          />
        </main>
      )}
    </div>
  );
};

export default Dashboard;