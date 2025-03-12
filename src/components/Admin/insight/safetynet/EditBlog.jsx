/* eslint-disable react/prop-types */
import { useState } from "react";
import Instance from "../../Instance";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

const quillModules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    [{ size: ["small", false, "large", "huge"] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }], // Alignment options
    ["image"], // Image button
    ["clean"], // Remove formatting
  ],
};

const quillFormats = [
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
  "indent",
];
const EditBlog = ({ safety, setEditing, setSafetyNets }) => {
  const [formData, setFormData] = useState({
    id: safety.id,
    title: safety.safety_title,
    author: safety.safety_author,
    content: safety.safety_body,
    metaDescription: safety.safety_meta_description,
    metaKeywords: safety.safety_meta_keywords,
    image: safety.safety_image,
    thumbnail: safety.safety_thumbnail,
  });

  const [imagePreview, setImagePreview] = useState(safety.safety_image || null);
  const [thumbnailImagePreview, setThumbnailImagePreview] = useState(
    safety.safety_thumbnail || null
  );
  const [loading, setLoading] = useState(false); // Loading state for the update process

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuillChange = (content) => {
    setFormData((prev) => ({ ...prev, content: content }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return; // Exit if no file is selected

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed.");
      e.target.value = ""; // Clear input field
      return;
    }

    // If valid, update the state
    setFormData((prev) => ({ ...prev, image: file }));
    setImagePreview(URL.createObjectURL(file));
  };

  const handleThumbnailImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return; // Exit if no file is selected

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed.");
      e.target.value = ""; // Clear input field
      return;
    }

    // If valid, update the state
    setFormData((prev) => ({ ...prev, thumbnail: file }));
    setThumbnailImagePreview(URL.createObjectURL(file));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (
      formData.title.trim().length < 10 ||
      formData.title.trim().length > 100
    ) {
      toast.error("Title must be between 10 and 100 characters.");
      setLoading(false);
      return;
    }

    if (!formData.author.trim()) {
      toast.error("Author is required.");
      setLoading(false);
      return;
    }

    if (
      formData.body.trim().length < 100 ||
      formData.body.trim().length > 2500
    ) {
      toast.error("Content must be between 100 and 2500 characters.");
      return;
    }

    if (
      formData.metaDescription.trim().length < 10 ||
      formData.metaDescription.trim().length > 200
    ) {
      toast.error("Meta description must be between 10 and 200 characters.");
      return;
    }

    if (
      formData.metaKeywords.trim().split(",").length < 2 ||
      formData.metaKeywords.trim().split(",").length > 15
    ) {
      toast.error(
        "Meta keywords must be between 2 to 15 items, separated by commas."
      );
      return;
    }
    try {
      const data = new FormData();
      data.append("id", formData.id);
      data.append("title", formData.title);
      data.append("author", formData.author);
      data.append("content", formData.content);
      data.append("metaDescription", formData.metaDescription);
      data.append("metaKeywords", formData.metaKeywords);

      if (formData.image) {
        data.append("image", formData.image);
      }
      if (formData.thumbnail) {
        data.append("thumbnail", formData.thumbnail);
      }
      // console.log(formData.data);
      console.log("Form Submission Data:", Array.from(data.entries()));

      const response = await Instance.put(`/admin/updateSafety`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status === true) {
        setSafetyNets((prev) =>
          prev.map((b) =>
            b.id === safety.id ? { ...b, ...response.data.safety } : b
          )
        );
        setTimeout(() => {
          setEditing(false);
          window.location.reload();
        }, 2000);
        toast.success(response.data.message);
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      console.error("Failed to update safety:", err);
      toast.error("Failed to update safety");
    } finally {
      setLoading(false); // Reset loading state after process is complete
    }
  };

  return (
    <>
      <form onSubmit={handleUpdate} className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold">Edit SafetyNet</h2>

        {/* Title */}
        <div className="mb-4">
          <label className="block mb-1">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Author */}
        <div className="mb-4">
          <label className="block mb-1">Author:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label
            htmlFor="metaDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Meta Description
          </label>
          <textarea
            id="metaDescription"
            name="metaDescription"
            rows="3"
            value={formData.metaDescription}
            onChange={handleChange}
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
          </label>
          <input
            id="metaKeywords"
            name="metaKeywords"
            type="text"
            value={formData.metaKeywords}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter meta keywords"
          />
        </div>

        {/* Body (ReactQuill) */}
        <div className="mb-4">
          <label className="block mb-1">Body:</label>
          <ReactQuill
            value={formData.content}
            onChange={handleQuillChange}
            modules={quillModules}
            formats={quillFormats}
            className="bg-white"
            required
          />
        </div>
        {/* Thumbnail */}

        <div className="mb-4">
          <label className="block mb-1">Thumbnail Upload:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnailImageChange}
            className="w-full border rounded p-2"
          />
          {/* Display preview */}
          {thumbnailImagePreview && (
            <img
              src={
                typeof thumbnailImagePreview === "string"
                  ? "https://newcheck.evvisolutions.com/safety_images/" +
                    thumbnailImagePreview
                  : URL.createObjectURL(thumbnailImagePreview)
              }
              alt={formData.title}
              className="mt-4 w-44 m-auto rounded"
            />
          )}
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block mb-1">Image Upload:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded p-2"
          />
          {/* Display preview */}
          {imagePreview && (
            <img
              src={
                typeof imagePreview === "string"
                  ? "https://newcheck.evvisolutions.com/safety_images/" +
                    imagePreview
                  : URL.createObjectURL(imagePreview)
              }
              alt={formData.title}
              className="mt-4 max-w-full rounded"
            />
          )}
        </div>

        {/* Submit and Cancel */}
        <div>
          <button
            type="submit"
            className="text-white bg-blue-500 rounded px-4 py-2"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Updating..." : "Update Blog"}
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="ml-4 text-red-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default EditBlog;
