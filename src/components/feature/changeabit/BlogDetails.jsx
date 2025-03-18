import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Instance from "../../Admin/Instance";
// import { FaAngleDown, FaAngleUp, FaComment, FaReply } from "react-icons/fa";
import { motion, useScroll } from "framer-motion";
import DynamicBreadcrumb from "../../DynamicBreadcrumb";
import { Helmet } from "react-helmet";

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse w-[90%] m-auto py-12 flex flex-col bg-white shadow-lg rounded-lg overflow-hidden mb-10">
      <div className="w-[80%] m-auto">
        <div className="h-60 bg-gray-300"></div>
        <div className="p-6 flex flex-col">
          <div className="h-6 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-4"></div>
          <div className="h-5 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

const BlogDetail = () => {
  const navigate = useNavigate();
  const { changeAbit_title } = useParams(); // Assuming you pass the blog ID in the URL
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [suggestedBlogs, setSuggestedBlogs] = useState([]);
  const [suggestedLoading, setSuggestedLoading] = useState(true);
  const [suggestedError, setSuggestedError] = useState(null);
  // console.log("useParams:", useParams());

  const { scrollYProgress } = useScroll();
  // console.log(changeAbit_title)
  const id = changeAbit_title;
  useEffect(() => {
    if (!/^\d+$/.test(id)) {
      navigate("*");
      setLoading(false);
      return;
    }
    const fetchBlogDetail = async () => {
      try {
        const response = await Instance.get(`/getchangeAbit/${id}`);
        const blogData = response.data.changeAbit;
        setBlogs(Array.isArray(blogData) ? blogData : [blogData]);
        setLoading(false);
      } catch (err) {
        setError("Failed to load blog details");
        console.log(err);
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]);

  useEffect(() => {
    const fetchSuggestedBlogs = async () => {
      try {
        const response = await Instance.get("/getallChangeAbitList");
        console.log(response.data);

        const sortedBlogs = response.data.changeAbits;
        setSuggestedBlogs(sortedBlogs.slice(0, 3));
        setSuggestedLoading(false);
      } catch (error) {
        setSuggestedError("Error to fetch");
        setSuggestedLoading(false);
        console.log(error);
      }
    };

    if (blogs) {
      fetchSuggestedBlogs();
    }
  }, [blogs, id]);

  if (loading) {
    return (
      <div>
        <SkeletonLoader />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <Helmet>
        <title>{blogs[0]?.changeAbit_title}</title>
        <meta
          name="description"
          content={blogs[0]?.changeAbit_meta_description}
        />
        <meta name="keywords" content={blogs[0]?.changeAbit_meta_keywords} />
        <meta property="og:title" content={blogs[0]?.changeAbit_title} />
        <meta
          property="og:description"
          content={blogs[0]?.changeAbit_meta_description}
        />
        <meta
          property="og:image"
          content={`https://newcheck.evvisolutions.com/changeAbit_images/${blogs[0]?.changeAbit_image}`}
        />
        <meta
          property="og:url"
          content={`http://localhost:3000/changeAbit_images/${blogs[0]?.id}`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Enrich" />
      </Helmet>
      <motion.div
        className="bg-t-primary fixed top-0 left-0 right-0 h-2 line"
        style={{ scaleX: scrollYProgress, transform: origin }}
      />
      <DynamicBreadcrumb />
      <div className="w-[90%] m-auto py-12 flex justify-between mb-10 mt-10">
        <div className="sm:w-[80%] m-auto">
          {blogs &&
            blogs.map((blog) => (
              <div key={blog.id} className="flex flex-col gap-4">
                <h2 className="text-4xl font-semibold">
                  {blog.changeAbit_title}
                </h2>
                <div className="md:flex gap-5 items-center">
                  <p className="text-gray-600">{blog.changeAbit_author}</p>
                  <p className="text-gray-600">{blog.changeAbit_visit_count}</p>
                  <p className="text-gray-600">
                    Posted on{" "}
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <img
                  src={`https://newcheck.evvisolutions.com/changeAbit_images/${blog.changeAbit_image}`}
                  alt={blog.changeAbit_title}
                  className="md:w-full w-72 object-cover h-96 rounded-xl"
                />

                <div
                  className="mt-4 flex gap-2 flex-col text-justify [&>h1]:text-4xl [&>h1]:font-bold [&>h2]:text-3xl [&>h2]:font-semibold quill-content ql-editor "
                  dangerouslySetInnerHTML={{ __html: blog.changeAbit_content }}
                />
              </div>
            ))}

          <section className="mt-10">
            <h3 className="text-2xl font-semibold mb-4">You Might Also Like</h3>
            {suggestedLoading ? (
              <SkeletonLoader />
            ) : suggestedError ? (
              <div className="text-red-500">{suggestedError}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {suggestedBlogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="p-4 bg-white rounded shadow-md w-72"
                  >
                    <Link to={`/insights/changeABit/${blog.id}`}>
                      <h4 className="font-semibold text-lg">
                        {blog.changeAbit_title}
                      </h4>
                      <p className="text-gray-600">{blog.changeAbit_author}</p>
                      <img
                        src={`https://newcheck.evvisolutions.com/changeAbit_images/${blog.changeAbit_thumbnail}`}
                        alt={blog.changeAbit_title}
                        className="w-full h-40 object-cover rounded mt-2"
                      />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
