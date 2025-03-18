/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill styles
import ImageResize from "quill-image-resize-module-react"; // Image resize module

const QuillEditor = ({
  value,
  onChange,
  placeholder = "Write something...",
  readOnly = false,
}) => {
  const quillRef = useRef(null); // Ref for ReactQuill

  // Handle Image Upload
  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const quill = quillRef.current.getEditor(); // Get Quill instance
          const range = quill.getSelection();
          quill.insertEmbed(range.index, "image", reader.result); // Insert image
        };
        reader.readAsDataURL(file);
      }
    };
  };

  // Custom Toolbar
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["blockquote", "code-block"],
          [{ script: "sub" }, { script: "super" }], // Subscript and Superscript
          [{ size: ["small", false, "large", "huge"] }],
          [{ font: [] }],
          [{ align: [] }], // Alignment options
          ["image"], // Image button
          ["clean"], // Remove formatting
        ],
        handlers: {
          image: imageHandler, // Custom image upload handler
        },
      },
      imageResize: {
        displayStyles: {
          backgroundColor: "black",
          border: "none",
          color: "white",
        },
        modules: ["Resize", "DisplaySize", "Toolbar"], // Enable image resizing
      },
    }),
    []
  );

  // Remove Image on Click
  const handleEditorChange = (content, delta, source, editor) => {
    // Detect if an image is clicked
    const quill = quillRef.current.getEditor();
    const images = quill.root.querySelectorAll("img");

    images.forEach((img) => {
      img.onclick = () => {
        if (window.confirm("Do you want to remove this image?")) {
          img.remove(); // Remove image on confirmation
        }
      };
    });

    onChange(content);
  };

  return (
    <ReactQuill
      ref={quillRef} // Attach ref
      value={value}
      onChange={handleEditorChange}
      modules={modules}
      theme="snow"
      placeholder={placeholder}
      readOnly={readOnly}
      className="custom-quill-editor overflow-y-scroll h-[16rem]"
    />
  );
};

// Register the Image Resize module
ReactQuill.Quill.register("modules/imageResize", ImageResize);

export default QuillEditor;
