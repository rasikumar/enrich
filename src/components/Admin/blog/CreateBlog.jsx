import { useState, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import Instance from "../Instance";
import imageCompressor from "quill-image-compress";
Quill.register("modules/imageCompressor", imageCompressor);

const CreateBlog = () => {
  const [content, setContent] = useState("");
  const [head, setHead] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState(null); // State to handle image upload
  const [blog, setBlog] = useState(null); // State to track the latest blog
  const quillRef = useRef(null); // Ref to access Quill editor instance

  // Handle content change
  const handleContentChange = (value) => {
    setContent(value);
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file); // Set image to state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", head);
    formData.append("author", author);
    formData.append("image", image);
    formData.append("content", content);

    try {
      const response = await Instance.post("/admin/createBlog", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.status === true) {
        // Update blog state without refreshing the entire page
        console.log(response);

        setBlog({
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
        window.location.reload();
      } else {
        alert(response.data.message);
      }
      console.log("Blog submitted successfully:", response.data);
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
    <div className="flex max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="w-1/2 pr-4">
        <h2 className="text-2xl font-bold mb-6">Create a New Blog</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Blog Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={head}
              onChange={(e) => setHead(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter blog title"
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
              Blog Image
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
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 w-full"
            >
              Blog Content{" "}
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
              Publish Blog
            </button>
          </div>
        </form>
      </div>

      <div className="w-1/2 border p-4 quill-preview">
        <h2 className="text-2xl font-bold mb-2">Preview</h2>
        <hr />
        <div className="flex flex-col gap-4 mb-4 mt-2">
          <h3 className="text-2xl">{blog?.head || head}</h3>
          <p className="text-slate-600 text-sm">{blog?.author || author}</p>
        </div>
        <div
          className="quill-content ql-editor"
          dangerouslySetInnerHTML={{ __html: blog?.content || content }}
        />
      </div>
    </div>
  );
};

export default CreateBlog;
