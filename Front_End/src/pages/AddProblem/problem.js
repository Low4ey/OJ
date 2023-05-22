import React, { useState } from 'react';
import axios from "axios";
import DOMPurify from "dompurify";
import RichTextEditor from '../../components/richText/richText';
import './problem.css';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export const getAccessToken = () => {
  const encodedToken = localStorage.getItem("accessToken");
  if (encodedToken) {
    const sanitizedToken = decodeURIComponent(encodedToken);
    return DOMPurify.sanitize(sanitizedToken);
  }
  return null;
};

const EditorPage = () => {
    const [title, setTitle] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState([]);
    const [editorContent, setEditorContent] = useState('');
    const [difficulty, setDifficulty] = useState('easy');
  
    const handleTitleChange = (e) => {
      setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
      // const editorContent = quillRef.current.root.innerHTML;
      setEditorContent(e.target.value);
    };
    
  
    const handleTagInputChange = (e) => {
      setTagInput(e.target.value);
    };
  
    const handleTagAdd = () => {
      if (tags.includes(tagInput) || !tagInput.trim()) return;
      setTags([...tags, tagInput]);
      setTagInput('');
    };
  
    const handleTagRemove = (tag) => {
      setTags(tags.filter((t) => t !== tag));
    };
  
    const handleDifficultyChange = (e) => {
      setDifficulty(e.target.value);
    };

    
  
    const handleSubmit = async (event) => {

      const postData = {
        title,
        editorContent,
        tags,
        difficulty,
      };
  
      try {
        const sanitizedProblemData = {
          title: DOMPurify.sanitize(postData.title),
          content: DOMPurify.sanitize(postData.editorContent),
          tags: DOMPurify.sanitize(postData.tags),
          difficulty: DOMPurify.sanitize(postData.difficulty),
        };

        // console.log(sanitizedProblemData);
        const accessToken = getAccessToken();
        // console.log(accessToken);

        const config = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
          withCredentials: true,
        };


        const response = await axios.post(
          "http://localhost:5005/api/createProblem",
          sanitizedProblemData,
          config,
        );

        console.log(response.data);
  
      } catch (error) {
        
      }
      // Make API call to post the data
      // Example:
      // fetch('your-api-endpoint', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(postData),
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      //     // Handle success response
      //     console.log(data);
      //   })
      //   .catch((error) => {
      //     // Handle error
      //     console.error(error);
      //   });
  
      // Reset the form after submitting
      setTitle('');
      setTagInput('');
      setTags([]);
      setEditorContent('');
      setDifficulty('easy');
    };
  
    return (
      <div className="container">
        <h1>Editor Page</h1>
  
        <div className="form-group">
          <label>Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} className="input-field" />
        </div>
  
        <div className="tags-section">
          <label>Add Tags:</label>
          <input type="text" value={tagInput} onChange={handleTagInputChange} className="tag-input" />
          <button onClick={handleTagAdd}>Add</button>
          <div className="tag-list">
            {tags.map((tag) => (
              <div key={tag} className="tag">
                <span className="tag-name">{tag}</span>
                <span className="tag-remove" onClick={() => handleTagRemove(tag)}>X</span>
              </div>
            ))}
          </div>
        </div>
  
        <div className="difficulty-section">
          <label>Difficulty:</label>
          <div className="difficulty-options">
            <div className="difficulty-option">
              <input
                type="radio"
                id="easy"
                value="easy"
                checked={difficulty === 'easy'}
                onChange={handleDifficultyChange}
              />
              <label htmlFor="easy">Easy</label>
            </div>
            <div className="difficulty-option">
              <input
                type="radio"
                id="medium"
                value="medium"
                checked={difficulty === 'medium'}
                onChange={handleDifficultyChange}
              />
              <label htmlFor="medium">Medium</label>
            </div>
            <div className="difficulty-option">
              <input
                type="radio"
                id="hard"
                value="hard"
                checked={difficulty === 'hard'}
                onChange={handleDifficultyChange}
              />
              <label htmlFor="hard">Hard</label>
            </div>
          </div>
        </div>
  
        <div className="editor-section">
          <h3>Editor:</h3>
          <RichTextEditor content={editorContent} onContentChange={setEditorContent} />
        </div>
  
        <button onClick={handleSubmit} className="submit-btn">Submit</button>
      </div>
    );
  };
  
  export default EditorPage;