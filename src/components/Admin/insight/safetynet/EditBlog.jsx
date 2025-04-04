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
    [{ script: "sub" }, { script: "super" }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    //
    [{ font: [] }],
    [{ color: [] }, { background: [] }],
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
  "script",
  "color", // Text color
  "background", // Background color
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
  const [imageName, setImageName] = useState(
    safety.safety_image ? safety.safety_image.split("/").pop() : ""
  );
  const [thumbnailImagePreview, setThumbnailImagePreview] = useState(
    safety.safety_thumbnail || null
  );
  const [thumbnailImageName, setThumbnailImageName] = useState(
    safety.safety_thumbnail ? safety.safety_thumbnail.split("/").pop() : ""
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
    if (!file) return;

    // Check if it's an image file
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed.");
      e.target.value = ""; // Clear input field
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Check dimensions
        if (img.width > 2000 || img.height > 3000) {
          toast.error("Image dimensions must not exceed 2000x3000 pixels.");
          e.target.value = ""; // Clear input field
          // Don't update any state - keep old image
          return;
        }

        // Check file size (example: 5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          toast.error("Image size must be less than 5MB.");
          e.target.value = ""; // Clear input field
          // Don't update any state - keep old image
          return;
        }

        // If all validations pass
        setFormData((prev) => ({ ...prev, image: file }));
        setImagePreview(URL.createObjectURL(file));
        setImageName(file.name);
      };
      img.onerror = () => {
        toast.error("Failed to load image. Please try another file.");
        e.target.value = ""; // Clear input field
        // Don't update any state - keep old image
      };
      img.src = event.target.result;
    };
    reader.onerror = () => {
      toast.error("Failed to read file. Please try another file.");
      e.target.value = ""; // Clear input field
      // Don't update any state - keep old image
    };
    reader.readAsDataURL(file);
  };

  const handleThumbnailImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if it's an image file
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed.");
      e.target.value = ""; // Clear input field
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Check dimensions
        if (img.width > 2000 || img.height > 3000) {
          toast.error("Image dimensions must not exceed 2000x3000 pixels.");
          e.target.value = ""; // Clear input field
          // Don't update any state - keep old thumbnail
          return;
        }

        // Check file size (example: 5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          toast.error("Image size must be less than 5MB.");
          e.target.value = ""; // Clear input field
          // Don't update any state - keep old thumbnail
          return;
        }

        // If all validations pass
        setFormData((prev) => ({ ...prev, thumbnail: file }));
        setThumbnailImagePreview(URL.createObjectURL(file));
        setThumbnailImageName(file.name);
      };
      img.onerror = () => {
        toast.error("Failed to load image. Please try another file.");
        e.target.value = ""; // Clear input field
        // Don't update any state - keep old thumbnail
      };
      img.src = event.target.result;
    };
    reader.onerror = () => {
      toast.error("Failed to read file. Please try another file.");
      e.target.value = ""; // Clear input field
      // Don't update any state - keep old thumbnail
    };
    reader.readAsDataURL(file);
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

    if (formData.content.trim().length < 100) {
      toast.error("Content must be minimum 100 characters.");
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
      // console.log("Form Submission Data:", Array.from(data.entries()));

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
        toast.success("Safety Net Updated Successfully");
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
      <form
        onSubmit={handleUpdate}
        className="mt-6 bg-gray-100 p-4 rounded-lg max-h-96 overflow-y-scroll"
      >
        {/* <h2 className="text-xl font-semibold">Edit SafetyNet</h2> */}

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

          {thumbnailImagePreview && (
            <img
              src={
                typeof thumbnailImagePreview === "string" &&
                "https://newcheck.evvisolutions.com/safety_images/" +
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
                "https://newcheck.evvisolutions.com/safety_images/" +
                  imagePreview
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
            {loading ? "Updating..." : "Update Safety Net"}
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
