import { useState, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import Instance from "../../Instance";
import imageCompressor from "quill-image-compress";
Quill.register("modules/imageCompressor", imageCompressor);
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

const CreateSafetyNet = () => {
  const [content, setContent] = useState("");
  const [head, setHead] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(null); // State to handle image upload
  const [thumbnail, setThumbnail] = useState(null); // State for thumbnail image
  const [metaDescription, setMetaDescription] = useState(""); // State for meta description
  const [metaKeywords, setMetaKeywords] = useState(""); // State for meta keywords
  const [safetyNet, setSafetyNet] = useState(null); // State to track the latest blog
  const quillRef = useRef(null); // Ref to access Quill editor instance

  // Handle content change
  const handleContentChange = (value) => {
    setContent(value);
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
  };

  const handleSubmit = async (e) => {
    // console.log(
    //   head,
    //   author,
    //   image,
    //   thumbnail,
    //   metaDescription,
    //   metaKeywords,
    //   content
    // );

    e.preventDefault();
    if (
      !head.trim() ||
      !author.trim() ||
      !image ||
      !thumbnail ||
      !metaDescription.trim() ||
      !metaKeywords.trim() ||
      !content.trim()
    ) {
      toast.error("all fields are required");
      return;
    }
    const formData = new FormData();
    formData.append("title", head);
    formData.append("author", author);
    formData.append("image", image);
    formData.append("thumbnail", thumbnail); // Add thumbnail to form data
    formData.append("metaDescription", metaDescription); // Add meta description
    formData.append("metaKeywords", metaKeywords); // Add meta keywords
    formData.append("content", content);

    try {
      const response = await Instance.post("/admin/createSafety", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.status === true) {
        // Update blog state without refreshing the entire page
        // console.log(response);

        setSafetyNet({
          head,
          author,
          content,
        });
        alert(response.data.message);
        // Clear form fields after successful submission
        setHead("");
        setAuthor("");
        setContent("");
        setImage(null);
        setThumbnail(null); // Clear thumbnail
        setMetaDescription(""); // Clear meta description
        setMetaKeywords(""); // Clear meta keywords
      } else {
        alert(response.data.message);
      }
      console.log("SafetyNet submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting blog:", error);
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
        ["link", "image"], // Add image button to toolbar
        [{ align: [] }],
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
    <div className="flex mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="w-1/2 pr-4">
        <h2 className="text-2xl font-bold mb-6">Create Safety Net</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              SafetyNet Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={head}
              onChange={(e) => setHead(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter SafetyNet title"
            />
          </div>

          <div>
            <label
              htmlFor="author"
              className="block text-sm font-medium text-gray-700"
            >
              Author
            </label>
            <input
              id="author"
              name="author"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              SafetyNet Image
              <button
                type="button"
                className="btn btn-secondary ml-4 border p-0 rounded-full w-6 h-6 inline-flex items-center justify-center bg-gray-300 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="The resolution is must 1928 * 896"
              >
                <span className="text-black font-bold text-sm">i</span>
              </button>
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-50 hover:file:bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="thumbnail"
              className="block text-sm font-medium text-gray-700"
            >
              Thumbnail Image
              <button
                type="button"
                className="btn btn-secondary ml-4 border p-0 rounded-full w-6 h-6 inline-flex items-center justify-center bg-gray-300 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="The resolution is must 1080 * 1080"
              >
                <span className="text-black font-bold text-sm">i</span>
              </button>
            </label>
            <input
              id="thumbnail"
              name="thumbnail"
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-50 hover:file:bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="metaDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Meta Description
              <button
                type="button"
                className="btn btn-secondary ml-4 border p-0 rounded-full w-6 h-6 inline-flex items-center justify-center bg-gray-300 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Meta Description is a brief summary of your webpage's content. It appears in search engine results and can influence the click-through rate by providing a snapshot of what the page is about. Keep it concise (around 150–160 characters) and ensure it clearly conveys the key information."
              >
                <span className="text-black font-bold text-sm">i</span>
              </button>
            </label>
            <textarea
              id="metaDescription"
              name="metaDescription"
              rows="3"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter meta description"
            />
          </div>

          <div>
            <label
              htmlFor="metaKeywords"
              className="block text-sm font-medium text-gray-700"
            >
              Meta Keywords
              <button
                type="button"
                className="btn btn-secondary ml-4 border p-0 rounded-full w-6 h-6 inline-flex items-center justify-center bg-gray-300 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Keywords are specific words or phrases that represent the main topics or ideas of your content. They help search engines understand what your page is about and can improve your search ranking. Use relevant and strategic keywords, but avoid overstuffing to maintain readability."
              >
                <span className="text-black font-bold text-sm">i</span>
              </button>
            </label>
            <input
              id="metaKeywords"
              name="metaKeywords"
              type="text"
              value={metaKeywords}
              onChange={(e) => setMetaKeywords(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter meta keywords"
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 w-full"
            >
              SafetyNet Content{" "}
              <span className="text-slate-500 ml-24">
                Maximum Image Value is 50Kb
              </span>
            </label>
            <ReactQuill
              ref={quillRef}
              value={content}
              onChange={handleContentChange}
              placeholder="Write your blog content here..."
              modules={modules}
              formats={Formats}
              className="mt-1 block w-full h-96 overflow-y-scroll border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Publish SafetyNet
            </button>
          </div>
        </form>
      </div>

      <div className="w-1/2 border p-4 quill-preview">
        <h2 className="text-2xl font-bold mb-2">Preview</h2>
        <hr />
        <div className="flex flex-col gap-4 mb-4 mt-2">
          <h3 className="text-2xl">{safetyNet?.head || head}</h3>
          <p className="text-slate-600 text-sm">
            {safetyNet?.author || author}
          </p>
        </div>
        <div
          className="quill-content ql-editor"
          dangerouslySetInnerHTML={{ __html: safetyNet?.content || content }}
        />
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default CreateSafetyNet;
