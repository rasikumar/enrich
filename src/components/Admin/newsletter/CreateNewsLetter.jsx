import { useEffect, useState, useRef } from "react";
// import axios from "axios";
import Instance from "../Instance";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { logo } from "../../../assets";

const CreateNewsLetter = () => {
  const [blogs, setBlogs] = useState([]);
  const [changeABits, setchangeABits] = useState([]);
  const [safetyNets, setSafetyNets] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [FirstContent, setContent] = useState(
    "This month, we’re excited to share all the latest from EnrichMinds! Dive into Insights Hub for exclusive content, actionable tips, inspiring stories, and everything happening across our company, including our publication ChangeABit, new blog posts, events, and more. Let’s keep moving forward together on your journey toward Becoming Your Best Self!"
  );
  const [ContentBlog, setBlog] = useState("");
  const [ContentChangeABit, setChangeABit] = useState("");
  const [ContentSafetyNet, setSafetyNet] = useState("");
  const [tip, setTip] = useState("");
  const [word, setWord] = useState({
    quote: "",
    author: "",
    answer: "",
  });
  const [insights, setInsights] = useState(
    `Our Insights Hub is brimming with resources designed for you to explore and grow. From deep dives into brain science and self-discovery to personal development and behavioral transformation, there’s something here for everyone looking to evolve.`
  );
  const quillRef = useRef(null); // Ref to access Quill editor instance

  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    const savedWord = localStorage.getItem("wordData");
    if (savedWord) {
      setWord(JSON.parse(savedWord));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wordData", JSON.stringify(word));
  }, [word]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await Instance.get("/admin/getAllBlogs");
        const sortedBlogList = response.data.blogs.sort(
          (a, b) => new Date(b.blog_date) - new Date(a.blog_date)
        );
        if (sortedBlogList.length > 0) {
          const latestBlog = sortedBlogList[0];
          setBlogs(latestBlog);
          setBlog(
            `Get inspired by our latest piece on ${latestBlog.blog_title}. Explore strategies to elevate your personal and professional life, and gain insights to build resilience, confidence, and self-awareness.`
          );
          //   console.log(latestBlog);
        }
        // setBlogs(sortedBlogList);
        // Update sectionData with the latest blog title and image
      } catch (err) {
        setError("Failed to fetch blogs");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchchangeAbit = async () => {
      try {
        const response = await Instance.post("/admin/getallChangeAbitList");
        // console.log(response.data);

        const sortedBlogList = response.data.changeAbits.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        if (sortedBlogList.length > 0) {
          const latestChangeABit = sortedBlogList[0];
          setchangeABits(latestChangeABit);
          console.log(latestChangeABit);

          setChangeABit(
            `Check out the latest edition of ChangeABit, our signature newsletter focused on brain optimization and behavioral transformation. This month, we’re covering ${latestChangeABit.changeAbit_title} to help you make small, meaningful changes that add up to big growth.`
          );
          // console.log(latestBlog);
        }
        // setBlogs(sortedBlogList);
        // Update sectionData with the latest blog title and image
      } catch (err) {
        setError("Failed to fetch blogs");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchchangeAbit();
  }, []);

  useEffect(() => {
    const fetchSafetyNet = async () => {
      try {
        const response = await Instance.post("/admin/getAllSafetyList");

        const sortedSafetyNetList = response.data.safetyRecords.sort(
          (a, b) => new Date(b.safety_date) - new Date(a.safety_date)
        );

        // console.log(response.sortedSafetyNetList);
        if (sortedSafetyNetList.length > 0) {
          const latestSafetyNet = sortedSafetyNetList[0];
          setSafetyNets(latestSafetyNet);
          console.log(latestSafetyNet);

          setSafetyNet(
            `Welcome to the SafetyNet Series, where we explore various aspects of psychological safety in the workplace. Each month, we’ll highlight a different topic to help you understand how to create a safer, more supportive environment for your team. This month, we’re focusing on ${latestSafetyNet.safety_title}, providing you with practical steps to foster trust, openness, and effective communication.`
          );
        }
      } catch (err) {
        setError("Failed to fetch blogs");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSafetyNet();
  }, []);

  // Handle the content update
  const handleChange = (event, setter) => {
    setter(event.target.value);
  };

  const handleContentChange = (value) => {
    setTip(value);
  };
  // Handle the Preview toggle
  const handlePreviewToggle = () => {
    setIsPreview(!isPreview);
  };

  const handleChangeContent = (e, setFunction) => {
    const { name, value } = e.target;
    setFunction((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle sending data to the backend using Axios
  const handleSubmit = async () => {
    const data = {
      blogs,
      changeABits,
      safetyNets,
      FirstContent,
      ContentBlog,
      ContentChangeABit,
      ContentSafetyNet,
      insights,
      tip,
      word,
    };
    console.log(data);

    setLoading(true); // Set loading to true before the request
    try {
      const response = await Instance.post("admin/sendBulkMail", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        alert("Newsletter content saved successfully!");
      } else {
        alert("Failed to save the newsletter content.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error submitting data.");
    } finally {
      setLoading(false); // Set loading to false after the request
    }
  };

  const Formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "align",
    "link",
    "image",
  ];

  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        ["link"], // Add image button to toolbar
        [{ align: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["clean"],
      ],
      imageCompress: {
        quality: 0.7, // default
        maxWidth: 1000, // default
        maxHeight: 1000, // default
        imageType: "image/jpeg", // default
        debug: true, // default
        suppressErrorLogging: false, // default
        handleOnPaste: true, //default
        insertIntoEditor: undefined, // default
      },
    },
  };

  return (
    <div>
      <div className="border border-blue-600 p-2 ">
        <h2 className="text-2xl font-medium mb-10 text-center py-2 border-b border-blue-500">
          Newsletter Content
        </h2>
        {error && error.message}
        {loading && loading.message}
        {/* Full-width textareas for content editing */}
        <label htmlFor="Heading" className="mb-10 font-semibold text-2xl">
          Content
        </label>
        <textarea
          value={FirstContent}
          onChange={(e) => handleChange(e, setContent)}
          rows="5"
          className="resize-none"
          style={{ width: "100%", marginBottom: "10px" }}
          placeholder="Edit the content here"
        />
        <label htmlFor="Heading" className="mb-10 font-semibold text-2xl">
          📌 This Month’s{" "}
          <span className="text-secondary">Featured Insight</span>
        </label>
        <h1 className="text-xl font-semibold">{blogs.blog_title}</h1>
        <textarea
          value={ContentBlog}
          onChange={(e) => handleChange(e, setBlog)}
          rows="5"
          className="resize-none"
          style={{ width: "100%", marginBottom: "10px" }}
          placeholder="Edit the content here"
        />
        <div className="flex items-center justify-between px-20">
          <div
            dangerouslySetInnerHTML={{
              __html: blogs.blog_body,
            }}
            className="line-clamp-4"
          />
          <img
            src={`http://192.168.20.5:5000/blog_images/${blogs.blog_image}`}
            alt={blogs.blog_title}
            width={200}
          />
        </div>
        <label htmlFor="Heading" className="mb-10 font-semibold text-2xl">
          ✨ Spotlight: <span className="text-secondary">ChangeABit</span>
        </label>
        <textarea
          value={ContentChangeABit}
          onChange={(e) => handleChange(e, setChangeABit)}
          rows="5"
          className="resize-none"
          style={{ width: "100%", marginBottom: "10px" }}
          placeholder="Edit the content here"
        />
        <div className="flex items-center justify-between px-20 mb-10">
          <div
            className="line-clamp-4"
            dangerouslySetInnerHTML={{
              __html: changeABits.changeAbit_content,
            }}
          />
          <img
            src={`http://192.168.20.5:5000/changeAbit_images/${changeABits.changeAbit_image}`}
            alt={changeABits.changeAbit_title}
            width={200}
          />
        </div>
        <label htmlFor="Heading" className="mb-10 font-semibold text-2xl">
          🎯 In Focus: <span className="text-secondary">SafetyNet</span> Series
        </label>
        <textarea
          value={ContentSafetyNet}
          onChange={(e) => handleChange(e, setSafetyNet)}
          rows="5"
          className="resize-none"
          style={{ width: "100%", marginBottom: "10px" }}
          placeholder="Edit the content here"
        />
        <div className="flex items-center justify-between px-20 mb-10">
          <div
            className="line-clamp-4"
            dangerouslySetInnerHTML={{
              __html: safetyNets.safety_body,
            }}
          />
          <img
            src={`http://192.168.20.5:5000/safety_images/${safetyNets.safety_image}`}
            alt={safetyNets.safety_title}
            width={200}
          />
        </div>
        <label htmlFor="Heading" className="text-2xl font-semibold">
          💡 Tips to <span className="text-secondary">Thrive</span>
        </label>
        <h1>A few practical ideas to integrate into your week</h1>
        <ReactQuill
          ref={quillRef}
          modules={modules}
          formats={Formats}
          type="text"
          name="Tips"
          value={tip}
          onChange={handleContentChange}
          rows="5"
          className="resize-none"
          style={{ width: "100%", marginBottom: "10px" }}
          placeholder="Edit the content here"
        />{" "}
        <br />
        <div>
          <h1 className="mb-2 text-2xl font-semibold">
            🌱 Words to <span className="text-secondary">Grow By</span>
          </h1>
          <input
            type="text"
            name="quote"
            placeholder="Write your Quote"
            value={word.quote}
            onChange={(e) => handleChangeContent(e, setWord)}
            className="border border-gray-300 rounded-md text-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            style={{
              width: "100%",
              marginBottom: "15px",
              fontFamily: "'Merriweather', serif",
            }}
          />

          <input
            type="text"
            name="author"
            value={word.author}
            onChange={(e) => handleChangeContent(e, setWord)}
            placeholder="Author Name"
            className="border border-gray-300 rounded-md text-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            style={{
              width: "100%",
              marginBottom: "15px",
              fontFamily: "'Merriweather', serif",
            }}
          />

          <ReactQuill
            ref={quillRef}
            modules={modules}
            formats={Formats}
            type="text"
            name="answer"
            value={word.answer}
            onChange={(value) =>
              setWord((prev) => ({ ...prev, answer: value }))
            }
            className="border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 resize-none"
            style={{
              width: "100%",
              marginBottom: "15px",
              // minHeight: "200px",
              fontFamily: "'Merriweather', serif",
            }}
            placeholder="Write your Answers"
          />
        </div>
        <label htmlFor="Heading" className="mb-10 font-semibold text-2xl">
          📚 Explore the full{" "}
          <span className="text-secondary">Insights Hub</span>
        </label>
        <textarea
          value={insights}
          onChange={(e) => handleChange(e, setInsights)}
          rows="5"
          className="resize-none"
          style={{ width: "100%", marginBottom: "10px" }}
          placeholder="Edit the content here"
        />
        {/* Preview Button */}
      </div>
      <button
        onClick={handlePreviewToggle}
        style={{ marginTop: "10px", padding: "10px" }}
      >
        {isPreview ? "Edit" : "Preview"}
      </button>
      {isPreview && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay background
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "1000",
          }}
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              maxWidth: "800px",
              width: "100%",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <button
              onClick={handlePreviewToggle}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "#ff6f61",
                color: "white",
                border: "none",
                padding: "8px 12px",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              Close Preview
            </button>

            <h3 style={{ marginBottom: "15px" }}>Preview</h3>
            <div className="border border-blue-600 p-3">
              <div>
                <img
                  src={logo}
                  width={250}
                  className="mb-[20px] block m-auto"
                  alt="Logo Image"
                />
                <h1 className="font-bold text-[24px] text-center text-primary mb-[20px]">
                  Welcome to Monthly Update from Insights Hub!
                </h1>
                <h2 className="font-[700] text-center mb-[20px]">
                  Hello Name Subscriber_name,
                </h2>
              </div>
              <div>
                {/* <h4 style={{ marginBottom: "10px" }}>Content</h4> */}
                <p className="mb-[20px]">{FirstContent}</p>
              </div>

              <div>
                <h4
                  style={{ marginBottom: "10px" }}
                  className="text-lg font-bold mb-2"
                >
                  📌 This Month’s{" "}
                  <span className="text-secondary">Featured Insight</span>
                </h4>
                <p className="mb-4">{ContentBlog}</p>
                <div className="flex gap-2 items-center mb-4 justify-between">
                  <div
                    dangerouslySetInnerHTML={{ __html: blogs.blog_body }}
                    className="line-clamp-4"
                  />
                  <img
                    src={`http://192.168.20.5:5000/blog_images/${blogs.blog_image}`}
                    alt={blogs.blog_title}
                    width={300}
                  />
                </div>
                <a href="#" className="p-2 text-blue-600 underline">
                  Learn More
                </a>
              </div>

              <div className="mt-4">
                <h4
                  style={{ marginBottom: "10px" }}
                  className="text-lg font-bold mb-2"
                >
                  ✨ Spotlight:{" "}
                  <span className="text-secondary">ChangeABit</span>
                </h4>
                <p>{ContentChangeABit}</p>
                <div className="flex flex-row-reverse gap-2 items-center mb-4 justify-between">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: changeABits.changeAbit_content,
                    }}
                    className="line-clamp-4"
                  />
                  <img
                    src={`http://192.168.20.5:5000/changeAbit_images/${changeABits.changeAbit_image}`}
                    alt={changeABits.changeAbit_title}
                    width={300}
                  />
                </div>
                <a href="#" className="p-2 text-primary underline">
                  Learn More
                </a>
              </div>

              <div className="mt-4">
                <h4
                  style={{ marginBottom: "10px" }}
                  className="text-lg font-bold mb-2"
                >
                  🎯 In Focus: <span className="text-secondary">SafetyNet</span>{" "}
                  Series
                </h4>
                <p>{ContentSafetyNet}</p>
                <div className="flex gap-2 items-center justify-between mb-4">
                  <div
                    dangerouslySetInnerHTML={{ __html: safetyNets.safety_body }}
                    className="line-clamp-4 "
                  />
                  <img
                    src={`http://192.168.20.5:5000/safety_images/${safetyNets.safety_image}`}
                    alt={safetyNets.safety_title}
                    width={300}
                  />
                </div>
                <a href="#" className="p-2 text-primary underline">
                  Learn More
                </a>
              </div>

              <div className="mt-4">
                <h4
                  style={{ marginBottom: "10px" }}
                  className="text-lg font-bold mb-2"
                >
                  💡 Tips to <span className="text-secondary">Thrive</span>
                </h4>
                {/* <p>{tip}</p> */}
                <div
                  dangerouslySetInnerHTML={{ __html: tip }}
                  className="quill-content ql-editor"
                />
              </div>

              <div className="mt-4">
                <h4
                  style={{ marginBottom: "10px" }}
                  className="text-lg font-bold mb-2"
                >
                  🌱 Words to <span className="text-secondary">Grow By</span>
                </h4>
                <div className="flex gap-2">
                  <p>&quot;{word.quote}&quot; </p> -
                  <p className="text-gray-400 font-bold">{word.author}</p>
                </div>
                {/* <p>{word.answer}</p> */}
                <div
                  dangerouslySetInnerHTML={{ __html: word.answer }}
                  className="quill-content ql-editor text-sky-600"
                />
              </div>

              <div className="mt-4">
                <h4
                  style={{ marginBottom: "10px" }}
                  className="text-lg font-bold mb-2"
                >
                  📚 Explore the full{" "}
                  <span className="text-secondary">Insights Hub</span>
                </h4>
                <p>{insights}</p>
                <a href="#" className="text-primary p-2 underline">
                  Visit the Insights Hub for articles, guides, and tools that
                  inspire change.
                </a>
              </div>
              <div className="mt-4">
                <h2 className="text-lg font-bold mb-2">
                  🌍 Join Our <span className="text-secondary">Community</span>{" "}
                  Online
                </h2>
                <p className="mb-4">
                  Stay in touch! Follow us on{" "}
                  <a href="#" className="text-primary no-underline">
                    LinkedIn
                  </a>
                  ,{" "}
                  <a href="#" className="text-primary no-underline">
                    Instagram{" "}
                  </a>
                  and{" "}
                  <a href="#" className="text-primary no-underline">
                    Facebook
                  </a>
                  .
                </p>

                <h2 className="text-lg font-bold mb-2 mt-4">
                  🗣 We Value Your <span className="text-secondary">Voice</span>
                </h2>
                <p className="mb-4">
                  Have feedback or ideas? Reply to this email – we’d love to
                  hear from you!
                </p>

                <h2 className="text-lg font-bold mb-2 mt-4">
                  🔍 Expert <span className="text-secondary">Guidance</span>,
                  Just a Click Away
                </h2>
                <p className="mb-4">
                  Ready to explore more? Discover counseling options and
                  psychometric assessments to help you unlock your full
                  potential.
                </p>

                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold border-b border-blue-600 pb-2">
                    Thank you for being part of the{" "}
                    <span className="text-secondary">Enrich</span>
                    <span className="text-primary">Minds</span> community.
                  </h2>
                  <p className="mt-4 mb-6">
                    Together, we’re making each day a step closer to our best
                    selves.
                  </p>
                  <div className="mt-4">
                    <p className="font-bold mb-1">Warmly,</p>
                    <p className="text-sm">
                      Shanthi Subramani,{" "}
                      <span className="text-secondary">Enrich</span>
                      <span className="text-primary">Minds</span> Consulting
                    </p>
                  </div>
                </div>

                {/* Footer Section */}
                <footer className="text-xs text-gray-600 bg-gray-300 rounded p-2 text-center">
                  <p className="text-primary mb-2">
                    You’re receiving this email because you subscribed to
                    Insights Hub through our website.
                  </p>
                  <p>
                    <a
                      href="unsubscribe-link"
                      className="text-gray-600 underline"
                    >
                      Unsubscribe
                    </a>{" "}
                    |
                    <a
                      href="http://192.168.20.5:5000/privacy-policy"
                      className="text-gray-600 underline"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </footer>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
        }}
      >
        {loading ? "Loading...." : "Send Newsletter"}
      </button>
    </div>
  );
};

export default CreateNewsLetter;
