/* eslint-disable react/prop-types */
import { useState } from "react";
import Instance from "../../Instance";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

const quillModules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    ["link", "image"],
    [{ indent: "-1" }, { indent: +1 }],
    ["clean"],
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

const EditBlog = ({ change, setEditing, setChangeAbits }) => {
  const [formData, setFormData] = useState({
    id: change.id,
    title: change.changeAbit_title,
    author: change.changeAbit_author,
    content: change.changeAbit_content,
    metaDescription: change.changeAbit_meta_description,
    metaKeywords: change.changeAbit_meta_keywords,
    image: change.changeAbit_image,
    thumbnail: change.changeAbit_thumbnail,
  });

  const [imagePreview, setImagePreview] = useState(
    change.changeAbit_image || null
  );
  const [thumbnailImagePreview, setThumbnailImagePreview] = useState(
    change.changeAbit_thumbnail || null
  );
  const [error, setError] = useState(null);
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
    if (file) {
      if (file.type.startsWith("image/")) {
        setFormData((prev) => ({ ...prev, image: file }));
        setImagePreview(URL.createObjectURL(file));
      } else {
        setError("Please upload a valid image file.");
      }
    }
  };
  const handleThumbnailImageChange = (e) => {
    const files = e.target.files[0];
    if (files) {
      if (files.type.startsWith("image/")) {
        setFormData((prev) => ({ ...prev, thumbnail: files }));
        setThumbnailImagePreview(URL.createObjectURL(files));
      } else {
        setError("Please upload a valid image file.");
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

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

      // console.log("Form Submission Data:", Array.from(data.entries()));

      const response = await Instance.put(`/admin/updateChangeAbit`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status === true) {
        setChangeAbits((prev) =>
          prev.map((b) =>
            b.id === change.id ? { ...b, ...response.data.changeAbits } : b
          )
        );
        toast.success(response.data.message);

        setTimeout(() => {
          setEditing(false);
        }, 1000);
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      console.error("Failed to update change:", err);
      setError("Failed to update change");
      toast.error("Failed to update change");
    } finally {
      setLoading(false); // Reset loading state after process is complete
    }
  };

  return (
    <>
      <form onSubmit={handleUpdate} className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold">Edit ChangeAbit</h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}

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
                  ? "http://192.168.20.5:5000/changeAbit_images/" +
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
                  ? "http://192.168.20.5:5000/changeAbit_images/" + imagePreview
                  : URL.createObjectURL(imagePreview)
              }
              alt={formData.title}
              className="mt-4 max-w-full rounded m-auto"
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
      <ToastContainer position="top-right" />
    </>
  );
};

export default EditBlog;
