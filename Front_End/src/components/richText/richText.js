import React, { useRef, useEffect } from "react";
// import Quill from "quill";
import ReactQuill from 'react-quill';
import "quill/dist/quill.snow.css";
import "./RichTextEditor.css";
const MarkdownEditor = ({ content, onContentChange }) => {
  const quillRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current) {
      quillRef.current = true;
    }
  }, []);

  const handleTextChange = (value) => {
    onContentChange(value);
  };

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // Formatting options
      [{ 'list': 'ordered' }, { 'list': 'bullet' }], // List options
      ['link', 'image'], // Link and image insertion
    ],
  };

  return (
    <div className="markdown-editor">
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleTextChange}
        modules={modules}
      />
    </div>
  );
};

export default MarkdownEditor;