import { useEffect, useRef, useState } from "react";
import Instance from "../../Instance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import QuillEditor from "@/lib/QuillEditor";

const CreateSafetyNet = () => {
  useEffect(() => {
    if (nameInputRef.current) {
      nameInputRef.current.focus(); // Focus the name input on component mount
    }
  }, []);

  const nameInputRef = useRef(null);

  const [content, setContent] = useState("");
  const [head, setHead] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(null); // State to handle image upload
  const [thumbnail, setThumbnail] = useState(null); // State for thumbnail image
  const [metaDescription, setMetaDescription] = useState(""); // State for meta description
  const [metaKeywords, setMetaKeywords] = useState(""); // State for meta keywords
  const [safetyNet, setSafetyNet] = useState(null); // State to track the latest blog

  // Handle content change
  const handleContentChange = (value) => {
    setContent(value);
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Check if the file is a document (not an image)
    if (!file.type.startsWith("image/")) {
      e.target.value = "";
      setImage(null);
      toast.error("Please upload an image file, documents are not allowed.");
      return;
    }

    // Rest of the existing image validation checks
    if (file.size > 5 * 1024 * 1024) {
      e.target.value = "";
      setImage(null);
      toast.error("File size must be less than 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        if (img.width <= 2000 && img.height <= 3000) {
          setImage(file);
        } else {
          e.target.value = "";
          toast.error("Image dimensions must not exceed 2000x3000 pixels.");
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Check if the file is a document (not an image)
    if (!file.type.startsWith("image/")) {
      e.target.value = "";
      setThumbnail(null);
      toast.error(
        "Please upload an image file for thumbnail, documents are not allowed."
      );
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      e.target.value = "";
      setThumbnail(null);
      toast.error("Thumbnail file size must be less than 5MB.");
      return;
    }

    // Read image dimensions for thumbnail
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        if (img.width <= 1080 && img.height <= 1080) {
          setThumbnail(file);
        } else {
          e.target.value = "";
          toast.error("Thumbnail dimensions must not exceed 1080x1080 pixels.");
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image && !image.type.startsWith("image/")) {
      toast.error(
        "Please upload a valid image file, documents are not allowed."
      );
      return;
    }

    if (thumbnail && !thumbnail.type.startsWith("image/")) {
      toast.error(
        "Please upload a valid image file for thumbnail, documents are not allowed."
      );
      return;
    }

    if (head.trim().length < 10 || head.trim().length > 100) {
      toast.error("Title must be between 10 and 100 characters.");
      return;
    }
    if (/[^a-zA-Z0-9\s]{3,}/.test(head)) {
      toast.error(
        "Title cannot contain three or more consecutive special characters."
      );
      return;
    }

    if (!author.trim()) {
      toast.error("Author name is required.");
      return;
    }

    if (!image) {
      toast.error("Image is required.");
      return;
    }

    if (!thumbnail) {
      toast.error("Thumbnail is required.");
      return;
    }

    if (
      metaDescription.trim().length < 10 ||
      metaDescription.trim().length > 200
    ) {
      toast.error("Meta description must be between 10 and 200 characters.");
      return;
    }

    if (
      metaKeywords.trim().split(",").length < 2 ||
      metaKeywords.trim().split(",").length > 15
    ) {
      toast.error(
        "Meta keywords must be between 2 to 15 items, separated by commas."
      );
      return;
    }

    if (content.trim().length < 100) {
      toast.error("Content must be minimum 100 characters.");
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
        toast.success("Safety Net created sucessfully");
        // Clear form fields after successful submission
        setHead("");
        setAuthor("");
        setContent("");
        setImage(null);
        setThumbnail(null); // Clear thumbnail
        setMetaDescription(""); // Clear meta description
        setMetaKeywords(""); // Clear meta keywords
        if (nameInputRef.current) {
          nameInputRef.current.focus(); // Refocus after submission
        }
      } else {
        toast.error(response.data.message);
      }
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error submitting Safety Net:", error);
      toast.error("Error submitting Safety Net: " + error.message);
    }
  };

  return (
    <div className="flex mx-auto bg-white md:p-6 rounded-lg shadow-md">
      <div className="md:w-1/2 px-4">
        <h2 className="text-2xl font-bold mb-6">Create Safety Net</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Safety Net Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={head}
              ref={nameInputRef}
              onChange={(e) => setHead(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Safety Net title"
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
              Safety Net Image
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
            {thumbnail && (
              <img
                src={URL.createObjectURL(thumbnail)}
                alt="News"
                className="max-w-xs rounded-md shadow-md mt-2"
              />
            )}
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
              Safety Net Content{" "}
              <span className="text-slate-500 ml-24">
                Maximum Image Value is 50Kb
              </span>
            </label>
            <QuillEditor
              value={content}
              onChange={handleContentChange}
              placeholder="Write your Safety Net content here..."
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Publish Safety Net
            </button>
          </div>
        </form>
      </div>

      <div className="md:w-1/2 hidden md:flex flex-col border p-4 quill-preview">
        <h2 className="text-2xl font-bold mb-2">Preview</h2>
        <hr />
        <div
          className="relative max-h-64 mt-2 w-full bg-center bg-cover"
          // style={{ backgroundImage: `url(${URL.createObjectURL(image)})` }}
        >
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="News"
              className="w-full object-cover h-64 rounded-xl"
            />
          )}
        </div>
        <div className="flex flex-col gap-4 mb-4 mt-2">
          <h3 className="text-2xl">{safetyNet?.head || head}</h3>
          <p className="text-slate-600 text-sm">
            {safetyNet?.author || author}
          </p>
        </div>
        <div
          className="[&>h1]:text-4xl [&>h1]:font-bold [&>h2]:text-3xl [&>h2]:font-semibold quill-content ql-editor"
          dangerouslySetInnerHTML={{ __html: safetyNet?.content || content }}
        />
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default CreateSafetyNet;
