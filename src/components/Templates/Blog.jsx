import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs";
import TemplateNavBar from "./TemplateNavBar";

const Blog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([
    {
      title: "Understanding React Hooks",
      description:
        "React Hooks provide a powerful way to use state and other React features without writing a class. Introduced in React 16.8, Hooks have revolutionized the way developers build React applications.",
      author: "Jane Smith",
      imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      title: "Tailwind CSS: Utility-First CSS Framework",
      description:
        "Tailwind CSS is a utility-first CSS framework that allows developers to build custom designs without leaving their HTML. It provides low-level utility classes that enable rapid UI development.",
      author: "David Brown",
      imageUrl: "https://randomuser.me/api/portraits/men/21.jpg",
    },
    {
      title: "JavaScript ES6 Features You Should Know",
      description:
        "ECMAScript 6 (ES6) introduced several new features that make JavaScript development more efficient and enjoyable.",
      author: "Alex Johnson",
      imageUrl: "https://randomuser.me/api/portraits/men/85.jpg",
    },
    {
      title: "The Benefits of TypeScript",
      description:
        "TypeScript, a superset of JavaScript, offers static type checking, which helps in catching errors early in the development process, enhancing code quality and developer productivity.",
      author: "Emily Davis",
      imageUrl: "https://randomuser.me/api/portraits/women/67.jpg",
    },
    {
      title: "Building Responsive Designs with CSS Grid",
      description:
        "CSS Grid Layout provides a two-dimensional grid-based layout system, making it easier to design web pages without having to use floats and positioning.",
      author: "Michael Lee",
      imageUrl: "https://randomuser.me/api/portraits/men/31.jpg",
    },
    {
      title: "Exploring Next.js for Server-Side Rendering",
      description:
        "Next.js is a powerful React framework that enables server-side rendering, static site generation, and more, making it a great choice for building modern web applications.",
      author: "Samantha Green",
      imageUrl: "https://randomuser.me/api/portraits/women/91.jpg",
    },
  ]);

  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    author: "",
    imageUrl: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageFile(reader.result);
      setNewPost({ ...newPost, imageUrl: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPosts([newPost, ...posts]);
    setNewPost({ title: "", description: "", author: "", imageUrl: "" });
    setImageFile(null);
  };

  return (
    <>
      <TemplateNavBar templateName="Blog" />

      <div className="w-full flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-6 space-y-16 pt-24">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl"
        >
          <motion.p
            className="text-4xl md:text-6xl mb-6"
            whileHover={{ scale: 1.05 }}
          >
            Blog
          </motion.p>
          <p className="text-md mb-10">
            Read our latest articles, tutorials, and insights on development.
          </p>

          <div className="flex space-x-6 justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="bg-black text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg"
              onClick={() => {
                navigate("/explore");
              }}
            >
              Browse Articles
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="border border-white text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg"
              onClick={() => {
                window.location.href = "https://github.com/Premkolte/AnimateHub";
              }}
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>

        <div className="max-w-3xl w-full bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 shadow-lg space-y-6">
          <h2 className="text-2xl font-extrabold text-center text-white">
            Post a New Blog
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={newPost.title}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg bg-transparent text-white placeholder-gray-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Description
              </label>
              <textarea
                name="description"
                value={newPost.description}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg bg-transparent text-white placeholder-gray-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Author
              </label>
              <input
                type="text"
                name="author"
                value={newPost.author}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg bg-transparent text-white placeholder-gray-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-200">
                Image
              </label>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-lg bg-transparent text-white placeholder-gray-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white p-2 rounded-lg"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-7xl mx-auto">
          {posts.map((post, index) => (
            <motion.div
              key={index}
              className="bg-slate-900 p-6 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover mb-4"
              />
              <h2 className="font-extrabold text-2xl mb-2">{post.title}</h2>
              <p className="opacity-80 mb-4">{post.description}</p>
              <div className="flex items-center justify-between">
                <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg">
                  Read More
                </button>
                <div className="flex items-center space-x-2">
                  <BsFillPersonFill className="h-6 w-6" />
                  <span>{post.author}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blog;





//               className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
