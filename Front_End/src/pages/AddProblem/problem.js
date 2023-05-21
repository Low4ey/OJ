import React, { useState } from 'react';
import RichTextEditor from '../../components/richText/richText';
import './problem.css';

const EditorPage = () => {
    const [title, setTitle] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState([]);
    const [editorContent, setEditorContent] = useState('');
    const [difficulty, setDifficulty] = useState('easy');
  
    const handleTitleChange = (e) => {
      setTitle(e.target.value);
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
  
    const handleSubmit = () => {
      const postData = {
        title,
        tags,
        editorContent,
        difficulty,
      };
  
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
          <RichTextEditor onChange={setEditorContent} />
        </div>
  
        <button onClick={handleSubmit} className="submit-btn">Submit</button>
      </div>
    );
  };
  
  export default EditorPage;