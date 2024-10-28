/* eslint-disable react/prop-types */
import { useState } from "react";
import Instance from "../Instance";
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

const EditBlog = ({ blog, setEditing, setBlogs }) => {
  const [formData, setFormData] = useState({
    id: blog.id,
    title: blog.blog_title,
    author: blog.blog_author,
    body: blog.blog_body,
    image: blog.blog_image,
  });

  const [imagePreview, setImagePreview] = useState(blog.blog_image || null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for the update process

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuillChange = (content) => {
    setFormData((prev) => ({ ...prev, body: content }));
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("id", formData.id);
      data.append("title", formData.title);
      data.append("author", formData.author);
      data.append("body", formData.body);

      if (formData.image) {
        data.append("image", formData.image);
      }
      // console.log(formData.image);

      const response = await Instance.put(`/admin/updateBlog`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.status === true) {
        setBlogs((prev) =>
          prev.map((b) =>
            b.id === blog.id ? { ...b, ...response.data.blog } : b
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
      console.error("Failed to update blog:", err);
      setError("Failed to update blog");
      toast.error("Failed to update blog");
    } finally {
      setLoading(false); // Reset loading state after process is complete
    }
  };

  return (
    <>
      <form onSubmit={handleUpdate} className="mt-6 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold">Edit Blog</h2>

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

        {/* Body (ReactQuill) */}
        <div className="mb-4">
          <label className="block mb-1">Body:</label>
          <ReactQuill
            value={formData.body}
            onChange={handleQuillChange}
            modules={quillModules}
            formats={quillFormats}
            className="bg-white"
            required
          />
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
                  ? "http://192.168.20.7:5000/blog_images/" + imagePreview
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
      <ToastContainer position="top-right" />
    </>
  );
};

export default EditBlog;
