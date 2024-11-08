import { useState, useEffect } from "react";
import Instance from "../Instance";
import { Modal } from "./Modal";
import BlogForm from "../newsletter/FormLists/BlogForm";
import ChangeABit from "../newsletter/FormLists/ChangeABitForm";
import { logo } from "../../../assets/index";

const NewsletterSection = () => {
  const [selectedItems, setSelectedItems] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [changeABits, setchangeABits] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sample section data with editable content
  const [sectionData, setSectionData] = useState({
    featuredInsight: {
      title: "🧠 This Month’s Featured Insight",
      subtitle: "Loading featured article...",
      image: "", // Initialize the image as an empty string
    },
    changeABit: {
      title: "✨ Spotlight: ChangeABit",
      subtitle: "Loading changeABit...",
      content: "", // You can update this with actual changeABit data
    },
    upcomingEvents: {
      title: "📅 What’s New at EnrichMinds",
      subtitle:
        "Stay updated on what’s happening in our community and mark your calendar for some exciting events!",
      content: "", // You can update this with actual event data
    },
    tipsToThrive: {
      title: "💡 Tips to Thrive",
      subtitle: "A few practical ideas to integrate into your week:",
      content: "", // You can update this with actual tip data
    },
    wordsToGrowBy: {
      title: "🌱 Words to Grow By",
      subtitle: "",
      content: "",
    },
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await Instance.get("/admin/getAllBlogs");
        const sortedBlogList = response.data.blogs.sort(
          (a, b) => new Date(b.blog_date) - new Date(a.blog_date)
        );
        setBlogs(sortedBlogList);

        // Update sectionData with the latest blog title and image
        if (sortedBlogList.length > 0) {
          const latestBlog = sortedBlogList[0];
          setSectionData((prevSectionData) => ({
            ...prevSectionData,
            featuredInsight: {
              title: "🧠 This Month’s Featured Insight",
              subtitle: `Get inspired by our latest piece on "${latestBlog.blog_title}". Explore strategies to elevate your personal and professional life, and gain insights to build resilience, confidence, and self-awareness.`,
              image: `http://192.168.20.5:5000/blog_images/${latestBlog.blog_image}`,
              content: latestBlog.blog_body,
            },
          }));
        }
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
    const fetchChangeABit = async () => {
      try {
        const response = await Instance.post("/admin/getallChangeAbitList");

        console.log(response.data);
        const sortedChangeAbitList = response.data.changeAbits.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setchangeABits(sortedChangeAbitList);

        if (sortedChangeAbitList.length > 0) {
          const latestChangedAbit = sortedChangeAbitList[0];
          setSectionData((prevSectionData) => ({
            ...prevSectionData,
            changeABit: {
              title: "✨ Spotlight: ChangeABit",
              subtitle: `Check out the latest edition of ChangeABit, our signature newsletter focused on brain optimization and behavioral transformation. This month, we’re covering ${latestChangedAbit.changeAbit_title} to help you make small, meaningful changes that add up to big growth.`,
              image: `http://192.168.20.5:5000/changeAbit_images/${latestChangedAbit.changeAbit_image}`,
              content: latestChangedAbit.changeAbit_content,
            },
          }));
        }
      } catch (err) {
        setError("Failed to fetch changeABit");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchChangeABit();
  });

  const [sectionContent, setSectionContent] = useState({
    featuredInsight: sectionData.featuredInsight.content,
    changeABit: sectionData.changeABit.content,
    upcomingEvents: sectionData.upcomingEvents.content, // Add new section content
    tipsToThrive: sectionData.tipsToThrive.content, // Add new section content
    wordsToGrowBy: sectionData.wordsToGrowBy.content, // Add new section content
  });

  // Handle checkbox change
  const handleCheckboxChange = (section) => {
    setSelectedItems((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Handle content change in the text area
  const handleContentChange = (e, section) => {
    setSectionContent((prev) => ({
      ...prev,
      [section]: e.target.value,
    }));
  };

  // Toggle the modal for preview
  const togglePreviewModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  // Handle submission of selected sections
  const handleSubmit = () => {
    const submittedSections = Object.keys(selectedItems)
      .filter((key) => selectedItems[key]) // Only selected sections
      .map((key) => ({
        title: sectionData[key].title,
        content: sectionContent[key],
      }));

    console.log("Submitting sections:", submittedSections);
    // Here you can send `submittedSections` to your API
  };

  return (
    <div className="flex flex-col max-w-6xl mx-auto bg-white p-6 rounded-lg gap-4 shadow-md">
      {error && <>Error</>}
      {loading && <>Loading...</>}

      {/* Render checkboxes and editable sections */}
      {Object.keys(sectionData).map((key) => (
        <div
          key={key}
          className="flex w-full mx-auto bg-white p-4 gap-4 rounded-lg shadow-md"
        >
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(key)}
            checked={!!selectedItems[key]}
          />
          <div className="flex flex-col gap-4 text-sm w-full">
            <h1 className="font-semibold">{sectionData[key].title}</h1>
            <h2>{sectionData[key].subtitle}</h2>
            {key === "featuredInsight" ? (
              <BlogForm
                featuredArticleTitle={blogs.length > 0 ? blogs[0].title : ""}
                featuredImage={sectionData.featuredInsight.image} // Pass the image URL
                featuredContent={sectionData.featuredInsight.content}
              />
            ) : key === "changeABit" ? (
              <ChangeABit
                featuredArticleTitle={
                  changeABits.length > 0 ? changeABits[0].title : ""
                }
                featuredImage={sectionData.changeABit.image} // Pass the image URL
                featuredContent={sectionData.changeABit.content}
              />
            ) : (
              <textarea
                value={sectionContent[key]}
                onChange={(e) => handleContentChange(e, key)}
                placeholder="Write your content here..."
                className="mt-1 block w-full h-36 overflow-y-scroll border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none overflow-hidden scrollbar-hide"
              />
            )}
          </div>
        </div>
      ))}

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Save
        </button>
        <button
          onClick={togglePreviewModal}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Preview
        </button>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={togglePreviewModal}>
          <div className="flex flex-col">
            <img src={logo} alt="Logo" width={250} className="mb-4" />
            <div className="flex flex-col gap-2 p-4">
              <h1 className="font-bold text-3xl">
                Welcome to Your Monthly Update from Insights Hub!
              </h1>
              <h3 className="text-lg font-semibold">
                Hello [Subscriber’s First Name],
              </h3>
              <p className="text-sm w-full mb-4 leading-5">
                This month, we’re excited to share all the latest from
                EnrichMinds! Dive into Insights Hub for exclusive content,
                actionable tips, inspiring stories, and everything happening
                across our company, including our publication ChangeABit, new
                blog posts, events, and more. Let’s keep moving forward together
                on your journey toward Becoming Your Best Self!
              </p>

              {Object.keys(sectionData).map((key) =>
                selectedItems[key] ? (
                  <div
                    key={key}
                    className="flex flex-col gap-4 text-sm w-full mb-4"
                  >
                    <div className="flex flex-col gap-2">
                      <h1 className="text-lg font-semibold">
                        {sectionData[key].title}
                      </h1>
                      <h2>{sectionData[key].subtitle}</h2>
                    </div>
                    <div className="flex gap-4">
                      {key === "featuredInsight" && sectionData[key].image && (
                        <img
                          src={sectionData[key].image} // Display the blog image
                          alt="Featured Insight"
                          width={400}
                          className="mb-2 rounded-md" // Add styling as needed
                        />
                      )}
                      <div
                        className="block w-full"
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          maxHeight: "14.3em",
                        }}
                        dangerouslySetInnerHTML={{
                          __html:
                            key === "featuredInsight"
                              ? sectionData[key].content
                              : sectionContent[key],
                        }}
                      />
                    </div>
                    <div className="flex gap-4">
                      {key === "changeAbit" && sectionData[key].image && (
                        <img
                          src={sectionData[key].image} // Display the blog image
                          alt="Featured Insight"
                          width={400}
                          className="mb-2 rounded-md" // Add styling as needed
                        />
                      )}
                      <div
                        className="block w-full"
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          maxHeight: "14.3em",
                        }}
                        dangerouslySetInnerHTML={{
                          __html:
                            key === "changeAbit"
                              ? sectionData[key].content
                              : sectionContent[key],
                        }}
                      />
                    </div>
                  </div>
                ) : null
              )}
              <div className="flex flex-col gap-2 ">
                <h1 className="text-lg font-semibold">
                  📚 Explore the Full Insights Hub
                </h1>
                <p>
                  Our Insights Hub is brimming with resources designed for you
                  to explore and grow. From deep dives into brain science and
                  self-discovery to personal development and behavioral
                  transformation, there’s something here for everyone looking to
                  evolve.
                </p>
                <p>
                  <a href="#">Visit the Insights Hub</a> for articles, guides,
                  and tools that inspire change.
                </p>
              </div>
              <div className="flex flex-col gap-2 ">
                <h1 className="text-lg font-semibold">
                  🌍 Join Our Community Online
                </h1>
                <p>
                  Stay in touch and get inspired daily! Follow us on{" "}
                  <a href="#">LinkedIn</a>, <a href="#">Instagram</a>, and{" "}
                  <a href="#">Facebook</a> for updates, practical advice, and
                  exclusive glimpses behind the scenes at Enrich Minds.
                </p>
              </div>
              <div className="flex flex-col gap-2 ">
                <h1 className="text-lg font-semibold">🗣 We Value Your Voice</h1>
                <p>
                  Your insights help us make Insights Hub even better! If you
                  have feedback, ideas for topics, or just want to say hello,
                  reply to this email – we’d love to hear from you.
                </p>
              </div>
              <div className="flex flex-col gap-2 ">
                <h1 className="text-lg font-semibold">
                  🔍 Expert Guidance, Just a Click Away
                </h1>
                <p>
                  Discover More Through Counseling Ready to explore how
                  psychometric assessments can help you unlock your strengths?
                  Book a counseling session with us!
                </p>
                <a href="#">➡️ [Book Here]</a>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default NewsletterSection;
