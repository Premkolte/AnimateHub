import React, { useState, useEffect } from "react";
import "./mysnippet.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function MySnippet() {
  const [snippets, setSnippets] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");

  const languages = [
    "javascript",
    "python",
    "java",
    "cpp",
    "c",
    "html",
    "css",
    "typescript",
    "php",
    "go",
    "rust"
  ];

  // Load snippets from localStorage
  useEffect(() => {
    const savedSnippets = JSON.parse(localStorage.getItem("mySnippets")) || [];
    setSnippets(savedSnippets);
  }, []);

  // Save snippets to localStorage
  const saveSnippets = (newSnippets) => {
    setSnippets(newSnippets);
    localStorage.setItem("mySnippets", JSON.stringify(newSnippets));
  };

  const handleAddSnippet = () => {
    if (!title.trim() || !code.trim()) {
      alert("Please enter at least a title and code.");
      return;
    }
    const newSnippet = {
      id: Date.now(),
      title,
      description,
      code,
      language
    };
    const updatedSnippets = [...snippets, newSnippet];
    saveSnippets(updatedSnippets);
    setTitle("");
    setDescription("");
    setCode("");
    setLanguage("javascript");
  };

  const handleDeleteSnippet = (id) => {
    const updatedSnippets = snippets.filter((s) => s.id !== id);
    saveSnippets(updatedSnippets);
  };

  const handleCopySnippet = (code) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="mysnippet-container">
      <h1>My Snippets</h1>

      {/* Add Snippet Form */}
      <div className="snippet-form">
        <input
          type="text"
          placeholder="Snippet Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Language Dropdown */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="language-select"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang.toUpperCase()}
            </option>
          ))}
        </select>

        <textarea
          className="code-input"
          placeholder="Write your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button className="add-btn" onClick={handleAddSnippet}>
          ➕ Add Snippet
        </button>
      </div>

      {/* Snippet List */}
      <div className="snippet-list">
        {snippets.length === 0 ? (
          <p className="no-snippets">No snippets saved yet.</p>
        ) : (
          snippets.map((snippet) => (
            <div key={snippet.id} className="snippet-card">
              <div className="snippet-header">
                <h2>{snippet.title}</h2>
                <div className="snippet-actions">
                  <button
                    className="copy-btn"
                    onClick={() => handleCopySnippet(snippet.code)}
                  >
                    📋 Copy
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteSnippet(snippet.id)}
                  >
                    ❌ Delete
                  </button>
                </div>
              </div>
              {snippet.description && (
                <p className="snippet-description">{snippet.description}</p>
              )}

              {/* Syntax-highlighted preview */}
              <SyntaxHighlighter
                language={snippet.language}
                style={atomDark}
                showLineNumbers
              >
                {snippet.code}
              </SyntaxHighlighter>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
