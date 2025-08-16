import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TopContributorsCard = ({ contributor, index }) => {
  return (
    <motion.div
      key={contributor.id}
      className={`relative rounded-lg flex-1 mx-auto max-w-sm shadow-md bg-primary-50 border-primary-200 border-3 dark:bg-secondary-800`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: index * 0.2 }}
    >
      <div className="flex flex-col items-center bg-clip-padding backdrop-filter backdrop-blur-sm p-4 rounded-lg">
        <motion.img
          src={contributor.avatar_url}
          alt={contributor.login}
          className="w-24 h-24 rounded-full mb-4"
          whileHover={{ scale: 1.1 }}
        />
        <h3 className="text-xl font-semibold">{contributor.login}</h3>
        <p className="text-primary-500 dark:text-accent-500">
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
  )
}

const ContributorCard = ({ contributor }) => {
  return (
    <div
      key={contributor.id}
      className="flex flex-col items-center bg-clip-padding backdrop-filter backdrop-blur-sm bg-primary-50 border-primary-200 border-3 dark:bg-secondary-800 p-4 rounded-lg shadow-md"
    >
      <img
        src={contributor.avatar_url}
        alt={contributor.login}
        className="w-24 h-24 rounded-full mb-4"
      />
      <h3 className="text-xl font-semibold">{contributor.login}</h3>
      <p className="dark:text-gray-100">
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
  )
}

const ContributorsSkeleton = ({ length = 20 }) => {
  return (
    <div className="flex flex-col w-full justify-center items-center space-y-16 text-center">
      {/* Top contributors */}
      <div className="flex justify-center items-center flex-col gap-2">
        <h3 className="text-primary-500 dark:text-accent-500 font-bold text-4xl">Top Contributors</h3>
        <p className="bg-primary-500 dark:bg-accent-500 w-32 h-1 rounded-full" />
      </div>
      <div className="mx-auto flex flex-wrap justify-center items-center mb-8 gap-5 w-full">
        {[...Array(length)].slice(0, 3).map((_) => (
          <div key={_} className="relative rounded-lg flex-1 mx-auto max-w-sm shadow-md bg-primary-50 border-primary-200 border-3 dark:bg-secondary-800">
            <div className="flex flex-col items-center bg-clip-padding backdrop-filter backdrop-blur-sm p-4 rounded-lg animate-pulse">
              <div className="w-24 h-24 bg-gray-300 dark:bg-gray-700 rounded-full mb-4"></div>
              <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 w-40 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-8 w-32 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Other Contributors Grid */}
      <div className="flex justify-center items-center flex-col gap-2">
        <h3 className="text-primary-500 dark:text-accent-500 font-bold text-4xl">All Contributors</h3>
        <h6 className="text-lg">Every contribution matters! Thank you to all our amazing contributors who help make
          AnimateHub better.</h6>
        <p className="bg-primary-500 dark:bg-accent-500 w-32 h-1 rounded-full" />
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
        {[...Array(length)].slice(3).map((_) => (
          <div key={_} className="flex flex-col items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow animate-pulse">
            <div className="w-24 h-24 bg-gray-300 dark:bg-gray-700 rounded-full mb-4"></div>
            <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
            <div className="h-8 w-28 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          </div>
        ))}
      </div>
    </div >
  )

}


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
      <div className="w-full flex flex-col items-center justify-center min-h-screen bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white p-6 space-y-16 py-24 text-center">

        <div className="text-center">
          <h1 className="text-4xl md:text-6xl mb-6 font-bold">Our Amazing Contributors</h1>
          <h2 className="text-lg max-w-2xl mx-auto font-semibold">A heartfelt thank you to the talented individuals who dedicate their time and skills to
            make AnimateHub thrive. Your contributions help shape the future of animation
            components.</h2>
        </div>

        {/* Loading State */}
        {loading && <ContributorsSkeleton length={20} />}
        {/* <ContributorsSkeleton /> */}


        {/* Error State */}
        {error && !loading && (
          <div className="bg-yellow-500/20 border border-yellow-500 text-white p-4 rounded-lg max-w-md text-center">
            <p className="font-semibold">ℹ️ Using Cached Data</p>
            <p className="text-sm mt-2">Contributors data refreshes every 5 minutes. Fresh data coming soon!</p>
          </div>
        )}

        {/* Contributors Display */}
        {!loading && contributors.length > 0 && (
          <>
            {/* Top Contributors Section */}
            <div className="flex justify-center items-center flex-col gap-2">
              <h3 className="text-primary-500 dark:text-accent-500 font-bold text-4xl">Top Contributors</h3>
              <p className="bg-primary-500 dark:bg-accent-500 w-32 h-1 rounded-full" />
            </div>
            <div className="mx-auto flex flex-wrap justify-center items-center mb-8 gap-5 w-full ">
              {contributors.slice(0, 3).map((contributor, index) => (
                <TopContributorsCard key={contributor.id || index} contributor={contributor} index={index} />
              ))}
            </div>

            {/* Other Contributors Grid */}
            <div className="flex justify-center items-center flex-col gap-2">
              <h3 className="text-primary-500 dark:text-accent-500 font-bold text-4xl">All Contributors</h3>
              <h6 className="text-lg">Every contribution matters! Thank you to all our amazing contributors who help make
                AnimateHub better.</h6>
              <p className="bg-primary-500 dark:bg-accent-500 w-32 h-1 rounded-full" />
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
              {contributors.slice(3).map((contributor, index) => (
                <ContributorCard key={contributor.id || `contributor-${index + 3}`} contributor={contributor} />
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

          <div className="text-3xl font-bold">Become a contributor</div>

          <p className="max-w-3xl text-center text-lg mt-8">
            Join our community of developers and designers creating amazing animation components.
            Your contributions help make the web more beautiful and interactive!
          </p>
          <motion.a
            href="https://github.com/Premkolte/AnimateHub"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex gap-2 bg-black text-white px-6 py-3 rounded-xl text-xl font-semibold shadow-lg"
            whileHover={{ scale: 1.1 }}
          >
            <FaGithub size={30} />
            Contribute on GitHub
          </motion.a>
        </div>
      </div>
    </>
  );
};

export default Contributors;
