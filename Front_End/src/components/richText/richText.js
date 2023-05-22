import React, { useRef, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import "./RichTextEditor.css"
const MarkdownEditor = ({ content, onContentChange }) => {
  const quillRef = useRef(null);

  useEffect(() => {
    quillRef.current = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'], // Formatting options
          [{ 'list': 'ordered' }, { 'list': 'bullet' }], // List options
          ['link', 'image'], // Link and image insertion
        ],
      },
    });

    // Update markdown text when content changes
    quillRef.current.on('text-change', () => {
      const markdownText = quillRef.current.root.innerHTML;
      
      onContentChange(markdownText);
      // Use the markdown text as needed
    });
  }, [onContentChange]);

  const handleInsertImage = () => {
    const imageUrl = prompt('Enter the URL of the image:');
    if (imageUrl) {
      const range = quillRef.current.getSelection();
      quillRef.current.insertEmbed(range.index, 'image', imageUrl);
    }
  };

  return (
    <div className="markdown-editor">
      <div id="toolbar" />
      <div id="editor" />
    </div>
  );
};

export default MarkdownEditor;