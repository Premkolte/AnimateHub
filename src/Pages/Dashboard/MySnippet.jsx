import React, { useState, useEffect } from "react";

export default function MySnippet() {
  const [snippets, setSnippets] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [showForm, setShowForm] = useState(false);

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

  useEffect(() => {
    setTimeout(() => {
      setShowForm(true);
    }, 300);
  }, []);

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
      language,
      isNew: true // Flag for new snippet animation
    };
    setSnippets(prev => [...prev, newSnippet]);
    
    setTimeout(() => {
      setSnippets(prev => prev.map(s => s.id === newSnippet.id ? { ...s, isNew: false } : s));
    }, 600);
    
    setTitle("");
    setDescription("");
    setCode("");
    setLanguage("javascript");
  };

  const handleDeleteSnippet = (id) => {
    setSnippets(prev => prev.map(s => s.id === id ? { ...s, isDeleting: true } : s));
    
    setTimeout(() => {
      setSnippets(prev => prev.filter(s => s.id !== id));
    }, 300);
  };

  const handleCopySnippet = (code) => {
    navigator.clipboard.writeText(code);
  };

  const getLanguageColor = (lang) => {
    const colors = {
      javascript: "#f7df1e",
      python: "#3776ab",
      java: "#f89820",
      cpp: "#00599c",
      c: "#a8b9cc",
      html: "#e34f26",
      css: "#1572b6",
      typescript: "#3178c6",
      php: "#777bb4",
      go: "#00add8",
      rust: "#ce422b"
    };
    return colors[lang] || "#6b7280";
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <style jsx>{`
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideOut {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(0.8);
          }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .animate-slide-in-top {
          animation: slideInFromTop 0.6s ease-out;
        }
        
        .animate-slide-in-bottom {
          animation: slideInFromBottom 0.6s ease-out;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.5s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slideInFromLeft 0.5s ease-out;
        }
        
        .animate-slide-out {
          animation: slideOut 0.3s ease-in;
        }
        
        .animate-bounce {
          animation: bounce 0.6s ease-out;
        }
        
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
      `}</style>
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-in-top">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            My Snippets
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Store and manage your code snippets beautifully
          </p>
        </div>

        {/* Add Snippet Form */}
        <div className={`mb-12 ${showForm ? 'animate-scale-in' : 'opacity-0'}`}>
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border border-blue-100 dark:border-gray-700 rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="text-2xl animate-bounce">✨</span>
              Add New Snippet
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="animate-slide-in-left stagger-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  placeholder="Enter snippet title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:shadow-md"
                />
              </div>
              
              <div className="animate-slide-in-left stagger-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:shadow-md"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                      {lang.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-6 animate-slide-in-left stagger-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description (Optional)</label>
              <textarea
                placeholder="Describe your snippet..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none hover:shadow-md"
              />
            </div>

            <div className="mb-6 animate-slide-in-left stagger-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Code</label>
              <textarea
                placeholder="Write your code here..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                rows="8"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-300 rounded-xl text-green-400 placeholder-green-400/70 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 font-mono text-sm resize-none hover:shadow-md"
              />
            </div>

            <button 
              onClick={handleAddSnippet}
              className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 animate-slide-in-bottom"
            >
              <span className="text-lg">➕</span>
              Add Snippet
            </button>
          </div>
        </div>

        {/* Snippet List */}
        <div>
          {snippets.length === 0 ? (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border border-blue-100 dark:border-gray-700 rounded-3xl p-12 text-center shadow-lg animate-scale-in">
              <div className="text-6xl mb-4 opacity-30 animate-pulse">📝</div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">No snippets yet</h3>
              <p className="text-gray-600 dark:text-gray-300">Create your first code snippet above to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {snippets.map((snippet, index) => (
                <div 
                  key={snippet.id} 
                  className={`bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border border-blue-100 dark:border-gray-700 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group ${
                    snippet.isNew 
                      ? 'animate-bounce' 
                      : snippet.isDeleting 
                        ? 'animate-slide-out' 
                        : 'animate-scale-in'
                  }`}
                  style={{ animationDelay: snippet.isNew ? '0s' : `${index * 0.1}s` }}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                        {snippet.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div 
                          className="w-3 h-3 rounded-full transition-all duration-300 group-hover:scale-125"
                          style={{ backgroundColor: getLanguageColor(snippet.language) }}
                        ></div>
                        <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                          {snippet.language.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleCopySnippet(snippet.code)}
                        className="p-2 bg-blue-100 dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-gray-600 rounded-lg transition-all duration-200 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:scale-110 active:scale-95"
                        title="Copy code"
                      >
                        📋
                      </button>
                      <button
                        onClick={() => handleDeleteSnippet(snippet.id)}
                        className="p-2 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-800/50 rounded-lg transition-all duration-200 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:scale-110 active:scale-95"
                        title="Delete snippet"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  {snippet.description && (
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {snippet.description}
                    </p>
                  )}

                  <div className="bg-gray-900 dark:bg-black/50 rounded-xl p-4 border border-gray-300 dark:border-gray-600 transform group-hover:scale-105 transition-transform duration-200">
                    <pre className="text-sm text-green-400 overflow-x-auto">
                      <code>{snippet.code}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}