import React, { useState } from 'react';
import DOMPurify from "dompurify";
import RichTextEditor from '../../components/richText/richText';

const getAccessToken = () => {
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
    event.preventDefault();

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

      const accessToken = getAccessToken();

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        withCredentials: true,
      };

      fetch("http://localhost:5005/api/createProblem", {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify(sanitizedProblemData),
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Submit request failed");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          // TODO: Handle success or navigate to a different page
        })
        .catch((error) => {
          console.error(error);
          // TODO: Handle error
        });

    } catch (error) {
      console.error(error);
    }

    // Reset the form after submitting
    setTitle('');
    setTagInput('');
    setTags([]);
    setEditorContent('');
    setDifficulty('easy');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      {/* <div className="bg-custom-gray rounded-lg p-8 max-w-md w-full">       */}
      <div className="justify-center items-center bg-gray-800 rounded-lg p-8 max-w-screen-lg w-full">
        <h1 className="text-3xl text-white mb-6">Editor Page</h1>

        <div className="form-group">
          <label className="text-white ">Title:</label>
          <input type="text" value={title} onChange={handleTitleChange} className="w-4/5 mb-4 px-4 py-2 rounded-lg bg-custom-gray text-white placeholder-gray-400" />
        </div>

        <div className="tags-section">
          <label className="text-white">Add Tags:</label>
          <input type="text" value={tagInput} onChange={handleTagInputChange} className="w-4/5 mb-4 px-4 py-2 rounded-lg bg-custom-gray text-white placeholder-gray-400" />
          <button onClick={handleTagAdd} className="px-4 py-2 bg-custom-green text-white rounded-lg border ">Add</button>
          <div className="tag-list">
            {tags.map((tag) => (
              <div key={tag} className="tag">
                <span className="tag-name text-white">{tag}</span>
                <span className="tag-remove text-white cursor-pointer" onClick={() => handleTagRemove(tag)}> [X] </span>
              </div>
            ))}
          </div>
        </div>

        <div className="difficulty-section">
          <label className="text-white">Difficulty:</label>
          <div className="difficulty-options">
            <div className="difficulty-option">
              <input
                type="radio"
                id="easy"
                value="easy"
                checked={difficulty === 'easy'}
                onChange={handleDifficultyChange}
              />
              <label htmlFor="easy" className="text-white">Easy</label>
            </div>
            <div className="difficulty-option">
              <input
                type="radio"
                id="medium"
                value="medium"
                checked={difficulty === 'medium'}
                onChange={handleDifficultyChange}
              />
              <label htmlFor="medium" className="text-white">Medium</label>
            </div>
            <div className="difficulty-option">
              <input
                type="radio"
                id="hard"
                value="hard"
                checked={difficulty === 'hard'}
                onChange={handleDifficultyChange}
              />
              <label htmlFor="hard" className="text-white">Hard</label>
            </div>
          </div>
        </div>

        <div className="editor-section">
          <h3 className="text-white mb-2">Editor:</h3>
          <RichTextEditor content={editorContent} onContentChange={setEditorContent} />
        </div>

        <button onClick={handleSubmit} className="w-full mt-4 px-4 py-2 bg-custom-blue text-white rounded-lg">Submit</button>
      </div>
    </div>
  );
};

export default EditorPage;
