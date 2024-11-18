import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Instance from "../../Admin/Instance";
import { FaAngleDown, FaAngleUp, FaComment, FaReply } from "react-icons/fa";
import { motion, useScroll } from "framer-motion";
import DynamicBreadcrumb from "../../DynamicBreadcrumb";

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
  const { id } = useParams(); // Assuming you pass the blog ID in the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(""); // State for the username
  const [comment, setComment] = useState(""); // State for the comment
  const [comments, setComments] = useState([]); // Initialize comments as an empty array
  const [commentError, setCommentError] = useState(null);
  const [replyText, setReplyText] = useState(""); // State for the reply text
  const [replyError, setReplyError] = useState(null); // State for reply error messages
  const [replies, setReplies] = useState({}); // State to hold replies keyed by comment ID
  const [showReply, setShowReply] = useState(false);
  const [replyName, setReplyName] = useState(null);
  const [commentToReply, setCommentToReply] = useState(null); // Track which comment is being replied to
  const [suggestedBlogs, setSuggestedBlogs] = useState([]);
  const [suggestedLoading, setSuggestedLoading] = useState(true);
  const [suggestedError, setSuggestedError] = useState(null);

  const { scrollYProgress } = useScroll();

  const toggleshowReply = () => {
    setShowReply((prev) => !prev);
  };

  // Fetch blog details
  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const response = await Instance.get(`/getBlogById/${id}`);
        setBlog(response.data.blog);
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
        const response = await Instance.get("/getAllBlogs");
        const sortedBlogs = response.data.blogs.sort(() => 0.5 - Math.random());
        setSuggestedBlogs(sortedBlogs.slice(0, 3));
        setSuggestedLoading(false);
      } catch (error) {
        setSuggestedError("Error to fetch");
        setSuggestedLoading(false);
        console.log(error);
      }
    };

    if (blog) {
      fetchSuggestedBlogs();
    }
  }, [blog, id]);

  // Fetch comments for this blog
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await Instance.get(`/getCommentByBlogId/${id}`);
        const fetchedComments = response.data.comments || [];

        if (fetchedComments.length > 0) {
          setComments(fetchedComments);

          const repliesMap = fetchedComments.reduce((acc, comment) => {
            if (Array.isArray(comment.replies)) {
              acc[comment.comment_id] = comment.replies; // Copy replies if they exist
            } else {
              acc[comment.comment_id] = []; // No replies, initialize with an empty array
            }
            return acc;
          }, {});

          setReplies(repliesMap);
        } else {
          setComments([]); // Clear comments if none exist
        }
      } catch (err) {
        console.error("Failed to fetch comments:", err);
        setComments([]); // In case of failure, set to empty array to avoid undefined
      }
    };

    fetchComments();
  }, [id]);

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!comment || !username) {
      setCommentError("Both username and comment are required.");
      return;
    }

    try {
      const response = await Instance.post("/createComments", {
        blog_id: id,
        username,
        comment,
      });

      setComments([...comments, response.data.newComment]);
      setComment("");
      setUsername("");
      setCommentError(null);
      window.location.reload();
    } catch (err) {
      console.error("Failed to post comment:", err);
      setCommentError("Failed to post comment. Please try again.");
    }
  };

  // Handle reply submission
  const handleReplySubmit = async (e, comment_id) => {
    e.preventDefault();

    if (!replyText || !replyName) {
      setReplyError("*Please Fill the Requirement Fields.");
      return;
    }

    try {
      const response = await Instance.post("/replyToComment", {
        id: comment_id,
        username: replyName,
        reply: replyText,
      });
      // Update replies state for the specific comment
      setReplies((prevReplies) => ({
        ...prevReplies,
        [comment_id]: [
          ...(prevReplies[comment_id] || []),
          response.data.newReply,
        ],
      }));

      setReplyText(""); // Clear reply text
      setReplyError(null);
      setCommentToReply(null);
      window.location.reload();
    } catch (err) {
      console.error("Failed to post reply:", err);
      setReplyError("Failed to post reply. Please try again.");
    }
  };

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
      <motion.div
        className="bg-t-primary fixed top-0 left-0 right-0 h-2 line"
        style={{ scaleX: scrollYProgress, transform: origin }}
      />
      <DynamicBreadcrumb />
      <div className="w-[90%] m-auto py-12 flex justify-between mt-10">
        <div className="sm:w-[80%] m-auto">
          {blog &&
            blog.map((blog) => (
              <div key={blog.id} className="flex flex-col gap-4">
                <h2 className="text-4xl font-semibold">{blog.blog_title}</h2>
                <div className="flex gap-5 items-center">
                  <p className="text-gray-600">{blog.blog_author}</p>
                  <p className="text-gray-600">{blog.blog_visitors_count}</p>
                  <p className="text-gray-600">
                    Posted on{" "}
                    {new Date(blog.blog_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <img
                  src={`https://enrichminds.co.in/blog_images/${blog.blog_image}`}
                  alt={blog.blog_title}
                  className="w-full object-cover h-full rounded-xl"
                />

                <div
                  className="mt-4 flex gap-2 flex-col text-justify"
                  dangerouslySetInnerHTML={{ __html: blog.blog_body }}
                />
              </div>
            ))}

          <section className="mt-10">
            <h3 className="text-2xl font-semibold mb-4">Comments</h3>

            {/* Display Comments */}
            <div className="mb-6">
              {comments.length > 0 ? (
                comments.map((cmt) => {
                  const replyCount = replies[cmt.comment_id]?.length || 0;
                  return (
                    <div
                      key={cmt.comment_id}
                      className="mb-4 p-4 bg-slate-300/20 rounded-lg border border-gray-200 duration-300"
                    >
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0">
                          <img
                            src={`https://ui-avatars.com/api/?name=${cmt.comment_username}&background=random`}
                            alt={cmt.comment_username}
                            className="rounded-full w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex flex-col">
                          <p className="font-semibold text-lg">
                            {cmt.comment_username}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(cmt.comment_created_at).toLocaleString(
                              "en-IN",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-800 text-base leading-relaxed inline-flex gap-5 items-center ">
                        {cmt.comment}
                        <button
                          onClick={() =>
                            setCommentToReply((prev) =>
                              prev === cmt.comment_id ? null : cmt.comment_id
                            )
                          }
                          className="text-teal-500 hover:text-teal-700 inline-flex items-center gap-1 "
                        >
                          Reply <FaReply />
                        </button>
                      </p>

                      {commentToReply === cmt.comment_id && (
                        <motion.div
                          className="flex flex-col gap-4 mb-2"
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <input
                            type="text"
                            className="p-2 border border-gray-300 rounded-lg mb-2 w-full"
                            placeholder="Your Username"
                            value={replyName}
                            onChange={(e) => setReplyName(e.target.value)} // Fix this line
                            required
                          />
                          <textarea
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            rows="2"
                            placeholder="Write a reply..."
                            value={replyText} // Change this line to use replyText
                            onChange={(e) => setReplyText(e.target.value)} // Fix this line
                            required
                            spellCheck={true}
                          />
                          {replyError && (
                            <p className="text-red-500">{replyError}</p>
                          )}
                          <button
                            onClick={(e) =>
                              handleReplySubmit(e, cmt.comment_id)
                            } // Fix this line
                            className="mt-2 btn-primary rounded-lg"
                          >
                            Submit Reply
                          </button>
                        </motion.div>
                      )}
                      <button
                        onClick={toggleshowReply}
                        className="float-end inline-flex items-center gap-2 mb-2"
                      >
                        <motion.span
                          key={showReply ? "Up" : "Down"}
                          initial={{ rotate: showReply ? -90 : 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {!showReply ? <FaAngleDown /> : <FaAngleUp />}
                        </motion.span>
                        <motion.span
                          className="inline-flex items-center gap-1"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FaComment />
                          {showReply || replyCount}
                        </motion.span>
                      </button>
                      {showReply &&
                        replies[cmt.comment_id] &&
                        replies[cmt.comment_id].length > 0 && (
                          <div className="mt-8 ml-4 ">
                            {replies[cmt.comment_id].map((reply) => (
                              <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                key={reply.reply_id}
                                className="p-2 bg-gray-100 rounded border mb-2"
                              >
                                <div className="flex items-center gap-4 mb-2">
                                  <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0">
                                    <img
                                      src={`https://ui-avatars.com/api/?name=${reply.reply_username}&background=random`}
                                      alt={reply.reply_username}
                                      className="rounded-full w-full h-full object-cover"
                                    />
                                  </div>

                                  <div className="flex items-end gap-2">
                                    <p className="font-medium">
                                      {reply.reply_username}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      {new Date(
                                        reply.reply_created_at
                                      ).toLocaleString("en-IN", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                        hour: "numeric",
                                        minute: "numeric",
                                      })}
                                    </p>
                                  </div>
                                </div>
                                <p>{reply.reply}</p>
                              </motion.div>
                            ))}
                          </div>
                        )}
                    </div>
                  );
                })
              ) : (
                <p>No comments yet.</p>
              )}
            </div>

            <form onSubmit={handleCommentSubmit} className="flex flex-col">
              <input
                type="text"
                className="p-2 border border-gray-300 rounded-lg mb-2"
                placeholder="Your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <textarea
                className="p-2 border border-gray-300 rounded-lg mb-2"
                rows="3"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
              {commentError && <p className="text-red-500">{commentError}</p>}
              <button type="submit" className="btn-primary rounded-lg">
                Submit Comment
              </button>
            </form>
          </section>

          <section className="mt-10">
            <h3 className="text-2xl font-semibold mb-4">You Might Also Like</h3>
            {suggestedLoading ? (
              <SkeletonLoader />
            ) : suggestedError ? (
              <div className="text-red-500">{suggestedError}</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {suggestedBlogs.map((blog) => (
                  <div key={blog.id} className="p-4 bg-white rounded shadow-md">
                    <Link to={`/insights/blog/${blog.id}`}>
                      <h4 className="font-semibold text-lg">
                        {blog.blog_title}
                      </h4>
                      <p className="text-gray-600">{blog.blog_author}</p>
                      <img
                        src={`https://enrichminds.co.in/blog_images/${blog.blog_image}`}
                        alt={blog.blog_title}
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
