/* eslint-disable react/prop-types */
import { useState } from "react";
import Instance from "../../Instance";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { Button } from "@/components/ui/button";

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

const EditBlog = ({ blog, setEditing, setBlogs }) => {
  const [formData, setFormData] = useState({
    id: blog.id,
    title: blog.blog_title,
    author: blog.blog_author,
    body: blog.blog_body,
    metaDescription: blog.blog_meta_description,
    metaKeywords: blog.blog_meta_keywords,
    image: blog.blog_image,
    thumbnail: blog.blog_thumbnail,
  });

  const [imagePreview, setImagePreview] = useState(blog.blog_image || null);
  const [imageName, setImageName] = useState(
    blog.blog_image ? blog.blog_image.split("/").pop() : ""
  );
  const [thumbnailImagePreview, setThumbnailImagePreview] = useState(
    blog.blog_thumbnail || null
  );

  const [thumbnailImageName, setThumbnailImageName] = useState(
    blog.blog_thumbnail ? blog.blog_thumbnail.split("/").pop() : ""
  );

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

    if (!file) return; // Exit if no file is selected
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Generate preview URL
      setImageName(file.name); // Store file name
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed.");
      e.target.value = ""; // Clear input field
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        if (img.width <= 2000 && img.height <= 3000) {
          setFormData((prev) => ({ ...prev, image: file }));
          setImagePreview(URL.createObjectURL(file)); // Show preview
        } else {
          e.target.value = ""; // Clear the input field
          toast.error("Image dimensions must not exceed 2000x3000 pixels.");
        }
      };
      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  const handleThumbnailImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return; // Exit if no file is selected
    if (file) {
      setThumbnailImagePreview(URL.createObjectURL(file)); // Generate preview URL
      setThumbnailImageName(file.name); // Store file name
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed.");
      e.target.value = ""; // Clear input field
      return;
    }

    // If valid, update the state
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        if (img.width <= 2000 && img.height <= 3000) {
          // setFormData((prev) => ({ ...prev, image: file }));
          setFormData((prev) => ({ ...prev, thumbnail: file }));
          // setImagePreview(URL.createObjectURL(file)); // Show preview
          setThumbnailImagePreview(URL.createObjectURL(file));
        } else {
          e.target.value = ""; // Clear the input field
          toast.error("Image dimensions must not exceed 2000x3000 pixels.");
        }
      };
      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // Validate required fields and show specific error messages
    if (
      formData.title.trim().length < 10 ||
      formData.title.trim().length > 100
    ) {
      toast.error("Title must be between 10 and 100 characters.");
      setLoading(false);
      return;
    }

    if (/[^a-zA-Z0-9\s]{3,}/.test(formData.title)) {
      toast.error(
        "Title cannot contain three or more consecutive special characters."
      );
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
      data.append("body", formData.body);
      data.append("metaDescription", formData.metaDescription);
      data.append("metaKeywords", formData.metaKeywords);

      if (formData.image) {
        data.append("image", formData.image);
      }

      if (formData.thumbnail) {
        data.append("thumbnail", formData.thumbnail);
      }

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
        setTimeout(() => {
          setEditing(false);
          window.location.reload();
        }, 2000);
        toast.success(response.data.message);
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      console.error("Failed to update blog:", err);
      toast.error("Failed to update blog");
    } finally {
      setLoading(false); // Reset loading state after process is complete
    }
  };

  return (
    <>
      <form
        onSubmit={handleUpdate}
        className="mt-6 bg-gray-100 px-1 rounded-lg max-h-96 overflow-y-scroll"
      >
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
            value={formData.body}
            onChange={handleQuillChange}
            modules={quillModules}
            formats={quillFormats}
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
            id="fileThumbnailInput"
            className="hidden"
          />
          <div className="relative">
            <input
              type="text"
              value={thumbnailImageName}
              placeholder="No file chosen"
              readOnly
              className="w-full border rounded p-2 bg-gray-100 cursor-not-allowed"
            />
            <button
              type="button"
              onClick={() =>
                document.getElementById("fileThumbnailInput").click()
              }
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded"
            >
              Choose File
            </button>
          </div>
          {/* Display preview */}
          {thumbnailImagePreview && (
            <img
              src={
                typeof thumbnailImagePreview === "string" &&
                "https://newcheck.evvisolutions.com/blog_images/" +
                  thumbnailImagePreview
              }
              // alt={formData.title}
              className="mt-4 w-44 m-auto rounded"
            />
          )}
          <>
            <img
              src={thumbnailImagePreview}
              className="mt-4 max-w-full rounded m-auto"
            />
          </>
        </div>
        {/* Image Upload */}
        <div className="mb-4">
          <label className="block mb-1">Image Upload:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="fileInput"
            className="hidden"
          />
          <div className="relative">
            <input
              type="text"
              value={imageName}
              placeholder="No file chosen"
              readOnly
              className="w-full border rounded p-2 bg-gray-100 cursor-not-allowed"
            />
            <button
              type="button"
              onClick={() => document.getElementById("fileInput").click()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded"
            >
              Choose File
            </button>
          </div>
          {/* Display preview */}
          {imagePreview && (
            <img
              src={
                typeof imagePreview === "string" &&
                "https://newcheck.evvisolutions.com/blog_images/" + imagePreview
              }
              // alt={formData.title}
              className="mt-4 max-w-full rounded m-auto"
            />
          )}
          <>
            <img
              src={imagePreview}
              className="mt-4 max-w-full rounded m-auto"
            />
          </>
        </div>

        {/* Submit and Cancel */}
        <div>
          <Button
            type="submit"
            variant="primary"
            className="text-white bg-blue-500 rounded px-4 py-2"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Updating..." : "Update Blog"}
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => setEditing(false)}
            className="ml-4"
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};

export default EditBlog;
