import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Contributors = () => {
  const [contributors, setContributors] = useState([]);

  const fetchContributors = async () => {
    try {
      const response = await fetch(
        "https://api.github.com/repos/Premkolte/AnimateHub/contributors"
      );
      if (!response.ok) {
        const storedData = JSON.parse(localStorage.getItem("contributors"));
        setContributors(storedData);
      } else {
        const data = await response.json();
        const sortedContributors = data.sort(
          (a, b) => b.contributions - a.contributions
        );
        localStorage.setItem(
          "contributors",
          JSON.stringify(sortedContributors)
        );
        setContributors(sortedContributors);
      }
    } catch (error) {
      console.error("Error fetching contributors:", error);
    }
  };

  useEffect(() => {
    fetchContributors();

    const interval = setInterval(() => {
      fetchContributors();
    }, 60000); // Fetch contributors every 60 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <div className="p-4 min-h-screen h-full text-white bg-gradient-to-r from-blue-500 to-purple-400 flex flex-col items-center">
        <button
          className="bg-violet-200 text-center w-48 rounded-2xl h-14 relative font-sans text-black text-xl font-semibold group"
          onClick={() => navigate("/")}
        >
          <div className="bg-violet-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
            <svg
              width="25px"
              height="25px"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#000000"
                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
              ></path>
              <path
                fill="#000000"
                d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
              ></path>
            </svg>
          </div>
          <p className="translate-x-2">Home</p>
        </button>

        <h2 className="text-4xl font-extrabold text-center mb-8 mt-10">
          Contributors
        </h2>

        {/* Top Contributors Section */}
        <div className="flex flex-wrap justify-center mb-8 gap-5">
          {contributors.slice(0, 3).map((contributor, index) => (
            <motion.div
              key={contributor.id}
              className={`relative rounded-lg ${
                index === 0
                  ? "border-2 border-yellow-300"
                  : index === 1
                  ? "border-2 border-red-500"
                  : index === 2
                  ? "border-2 border-green-500"
                  : ""
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="flex flex-col items-center bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 text-white p-4 rounded-lg shadow-md">
                <motion.img
                  src={contributor.avatar_url}
                  alt={contributor.login}
                  className="w-24 h-24 rounded-full mb-4"
                  whileHover={{ scale: 1.1 }}
                />
                <h3 className="text-xl font-semibold">{contributor.login}</h3>
                <p className="text-gray-100">
                  {contributor.contributions} contributions
                </p>
                <motion.a
                  href={contributor.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                  whileHover={{ scale: 1.1 }}
                >
                  <FaGithub size={20} />
                  Visit Profile
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Contributors Grid */}
        <div className="w-full md:w-[80%] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {contributors.slice(3).map((contributor) => (
            <div
              key={contributor.id}
              className="flex flex-col items-center bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 text-white p-4 rounded-lg shadow-md"
            >
              <img
                src={contributor.avatar_url}
                alt={contributor.login}
                className="w-24 h-24 rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">{contributor.login}</h3>
              <p className="text-gray-100">
                {contributor.contributions} contributions
              </p>
              <motion.a
                href={contributor.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                whileHover={{ scale: 1.1 }}
              >
                <FaGithub size={20} />
                Visit Profile
              </motion.a>
            </div>
          ))}
        </div>

        {/* Contribution Button */}
        <div className="flex flex-col justify-center items-center">
          <p className="text-center text-lg mt-8">
            Explore creativity through animation. Join us at AnimateHub and
            bring your ideas to life!
          </p>
          <motion.a
            href="https://github.com/Premkolte/AnimateHub"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex gap-2 bg-black text-white px-6 py-3 rounded-full text-xl font-semibold shadow-lg"
            whileHover={{ scale: 1.1 }}
          >
            <FaGithub size={30} />
            Visit GitHub
          </motion.a>
        </div>
      </div>
    </>
  );
};

export default Contributors;
