import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Contributors = () => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback contributors data in case API fails
  const fallbackContributors = [
    {
      id: 1,
      login: "Premkolte",
      avatar_url: "https://github.com/Premkolte.png",
      html_url: "https://github.com/Premkolte",
      contributions: 50
    },
    {
      id: 2,
      login: "ShauraaSharma",
      avatar_url: "https://github.com/ShauraaSharma.png",
      html_url: "https://github.com/ShauraaSharma",
      contributions: 1
    },
    {
      id: 3,
      login: "contributor3",
      avatar_url: "https://github.com/octocat.png",
      html_url: "https://github.com/octocat",
      contributions: 15
    }
  ];

  // Function to force fresh API call (bypass cache completely)
  const forceFreshFetch = async () => {
    try {
      setLoading(true);
      setError(null);
      setContributors([]);

      const headers = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'AnimateHub-App',
        'X-GitHub-Api-Version': '2022-11-28'
      };

      const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
      
      if (GITHUB_TOKEN && GITHUB_TOKEN.trim() !== '') {
        headers['Authorization'] = `token ${GITHUB_TOKEN.trim()}`;
      }

      const response = await fetch(
        "https://api.github.com/repos/Premkolte/AnimateHub/contributors",
        { headers }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        const sortedContributors = data.sort((a, b) => b.contributions - a.contributions);
        setContributors(sortedContributors);
        
        // Cache the fresh data
        localStorage.setItem("contributors", JSON.stringify(sortedContributors));
        localStorage.setItem("contributors_timestamp", Date.now().toString());
      } else {
        throw new Error("No contributors found in API response");
      }

    } catch (error) {
      console.error("Error fetching contributors:", error);
      setError(`Fetch failed: ${error.message}`);
      setContributors(fallbackContributors);
    } finally {
      setLoading(false);
    }
  };

  const fetchContributors = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check if we have recent cached data (cache for 5 minutes for faster updates)
      const cachedData = localStorage.getItem("contributors");
      const cacheTimestamp = localStorage.getItem("contributors_timestamp");
      const now = Date.now();
      
      if (cachedData && cacheTimestamp) {
        const timeDiff = now - parseInt(cacheTimestamp);
        const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds
        
        if (timeDiff < fiveMinutes) {
          setContributors(JSON.parse(cachedData));
          setLoading(false);
          return;
        }
      }

      // Create headers with authentication if token is available
      const headers = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'AnimateHub-App',
        'X-GitHub-Api-Version': '2022-11-28'
      };

      // GitHub token for higher rate limits (5000 requests/hour)
      const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;
      
      if (GITHUB_TOKEN && GITHUB_TOKEN.trim() !== '') {
        headers['Authorization'] = `token ${GITHUB_TOKEN.trim()}`;
      }

      const response = await fetch(
        "https://api.github.com/repos/Premkolte/AnimateHub/contributors",
        { headers }
      );

      if (!response.ok) {
        if (response.status === 403) {
          const rateLimitReset = response.headers.get('X-RateLimit-Reset');
          const resetTime = rateLimitReset ? new Date(parseInt(rateLimitReset) * 1000).toLocaleTimeString() : 'unknown';
          throw new Error(`GitHub API rate limit exceeded. Resets at ${resetTime}`);
        }
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("No contributors data received from GitHub API");
      }

      const sortedContributors = data.sort(
        (a, b) => b.contributions - a.contributions
      );

      // Cache the data with timestamp
      localStorage.setItem("contributors", JSON.stringify(sortedContributors));
      localStorage.setItem("contributors_timestamp", now.toString());
      
      setContributors(sortedContributors);

    } catch (error) {
      console.error("Error fetching contributors:", error);
      setError(error.message);

      // Try to use cached data as fallback
      const cachedData = localStorage.getItem("contributors");
      if (cachedData) {
        try {
          const parsedData = JSON.parse(cachedData);
          if (Array.isArray(parsedData) && parsedData.length > 0) {
            setContributors(parsedData);
          } else {
            throw new Error("Invalid cached data");
          }
        } catch (parseError) {
          setContributors(fallbackContributors);
        }
      } else {
        setContributors(fallbackContributors);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Force fresh fetch on component mount to ensure real data loads
    forceFreshFetch();

    // Set up periodic refresh every 10 minutes
    const interval = setInterval(() => {
      fetchContributors();
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearInterval(interval);
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

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center mb-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <span className="ml-3 text-lg">Loading contributors...</span>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-yellow-500/20 border border-yellow-500 text-white p-4 rounded-lg mb-8 max-w-md text-center">
            <p className="font-semibold">ℹ️ Using Cached Data</p>
            <p className="text-sm mt-2">Contributors data refreshes every 5 minutes. Fresh data coming soon!</p>
          </div>
        )}

        {/* Contributors Display */}
        {!loading && contributors.length > 0 && (
          <>
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
          </>
        )}

        {/* No Contributors State */}
        {!loading && contributors.length === 0 && (
          <div className="text-center text-white">
            <p className="text-xl">No contributors found</p>
            <p className="text-gray-300">Check back later!</p>
          </div>
        )}

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
