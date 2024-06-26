import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

const Contributors = () => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
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
          localStorage.setItem("contributors", sortedContributors);
          setContributors(sortedContributors);
        }
      } catch (error) {
        console.error("Error fetching contributors:", error);
      }
    };

    fetchContributors();
  }, []);

  return (
    <>
      <Navbar />

      <div className="pt-20 p-4 min-h-screen h-full text-white bg-gradient-to-r from-blue-500 to-purple-400">
        <h2 className="text-4xl font-extrabold text-center mb-8">
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
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Contributors Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
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
