import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTrophy, FaStar, FaCode, FaUsers, FaGithub } from "react-icons/fa";
import { ChevronRight, ChevronLeft } from "lucide-react";

const GITHUB_REPO = "Premkolte/AnimateHub";
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN || "YOUR_GITHUB_TOKEN";

// Points configuration for different PR levels
const POINTS = {
  level1: 3, // Easy
  level2: 7, // Medium
  level3: 10, // Hard/Feature
};

// Badge component for PR counts
const Badge = ({ count, label, color }) => (
  <div
    className={`flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${color} bg-opacity-20`}
  >
    <FaCode className="mr-1 sm:mr-1.5 text-xs" />
    <span>
      {count} {label}
    </span>
  </div>
);

// Skeleton Loader Component
const SkeletonLoader = () => (
  <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
    <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700">
      <div className="col-span-1 text-sm font-medium text-gray-500 dark:text-gray-400">
        #
      </div>
      <div className="col-span-6 md:col-span-7 text-sm font-medium text-gray-500 dark:text-gray-400">
        Contributor
      </div>
      <div className="col-span-5 md:col-span-4 text-sm font-medium text-gray-500 dark:text-gray-400 text-right">
        Contributions
      </div>
    </div>
    <div className="divide-y divide-gray-100 dark:divide-gray-700">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="p-4 sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center sm:px-6 sm:py-4"
        >
          <div className="flex items-center space-x-3 sm:hidden">
            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse flex-shrink-0"></div>
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse flex-shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="w-24 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="flex space-x-2">
                <div className="w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                <div className="w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="hidden sm:contents">
            <div className="col-span-1">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            </div>
            <div className="col-span-6 md:col-span-7">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="w-24 h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="col-span-5 md:col-span-4">
              <div className="flex items-center justify-end space-x-3">
                <div className="w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                <div className="w-16 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default function LeaderBoard() {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPRs: 0,
    totalContributors: 0,
    totalPoints: 0,
  });

  useEffect(() => {
    const fetchContributorsWithPoints = async () => {
      try {
        let contributorsMap = {};
        let page = 1;
        const MAX_PAGES = 10;
        let keepFetching = true;

        while (keepFetching && page <= MAX_PAGES) {
          const batch = await Promise.all(
            Array.from({ length: 5 }, (_, i) =>
              fetch(
                `https://api.github.com/repos/${GITHUB_REPO}/pulls?state=closed&per_page=100&page=${
                  page + i
                }`,
                { headers: TOKEN ? { Authorization: `token ${TOKEN}` } : {} }
              ).then((res) => res.json())
            )
          );

          const prs = batch.flat();
          if (prs.length === 0 || (prs.length === 1 && prs[0].message)) {
            keepFetching = false;
            break;
          }

          prs.forEach((pr) => {
            if (!pr.merged_at) return;

            const labels = pr.labels.map((l) => l.name.toLowerCase());
            if (!labels.includes("gssoc'25")) return;

            const author = pr.user.login;
            let points = 0;
            labels.forEach((label) => {
              if (POINTS[label]) points += POINTS[label];
            });

            if (!contributorsMap[author]) {
              contributorsMap[author] = {
                username: author,
                avatar: pr.user.avatar_url,
                profile: pr.user.html_url,
                points: 0,
                prs: 0,
              };
            }

            contributorsMap[author].points += points;
            contributorsMap[author].prs += 1;
          });

          page += 5;
        }

        setContributors(
          Object.values(contributorsMap).sort((a, b) => b.points - a.points)
        );
      } catch (error) {
        console.error("Error fetching contributors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContributorsWithPoints();
  }, []);

  useEffect(() => {
    if (contributors.length > 0) {
      const totalPRs = contributors.reduce((sum, c) => sum + Number(c.prs), 0);
      const totalPoints = contributors.reduce(
        (sum, c) => sum + Number(c.points),
        0
      );

      const flooredTotalPRs = Math.floor(totalPRs / 10) * 10;
      const flooredTotalPoints = Math.floor(totalPoints / 10) * 10;
      const flooredContributorsCount =
        Math.floor(contributors.length / 10) * 10;

      setStats({
        flooredTotalPRs,
        totalContributors: flooredContributorsCount,
        flooredTotalPoints,
      });
    }
  }, [contributors]);

  // Pagination variables and states

  const PAGE_SIZE = 10; // how many contributors per page


  
  const [currentPage, setCurrentPage] = useState(1);


  // Calculate which contributors to show on current page
  const indexOfLast = currentPage * PAGE_SIZE;
  const indexOfFirst = indexOfLast - PAGE_SIZE;
  const currentContributors = contributors.slice(indexOfFirst, indexOfLast);



  const totalPages = Math.ceil(contributors.length / PAGE_SIZE);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-secondary-900 py-6 sm:py-12 px-2 sm:px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12 px-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl sm:text-4xl font-bold text-primary-600 dark:text-accent-500 mb-2 sm:mb-4">
            GSSoC'25 Leaderboard
          </h1>
          <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Celebrating the amazing contributions from GSSoC'25 participants.
            Join us in building something incredible together!
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 mb-8 sm:mb-12 px-2">
          <div className="bg-white dark:bg-secondary-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-3 sm:mr-4 flex-shrink-0">
                <FaUsers className="text-lg sm:text-2xl" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  Contributors
                </p>
                <p className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white">
                  {loading ? "..." : stats.totalContributors}+
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-secondary-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mr-3 sm:mr-4 flex-shrink-0">
                <FaCode className="text-lg sm:text-2xl" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  Pull Requests
                </p>
                <p className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white">
                  {loading ? "..." : stats.flooredTotalPRs}+
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-secondary-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 sm:col-span-2 md:col-span-1">
            <div className="flex items-center">
              <div className="p-2 sm:p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-3 sm:mr-4 flex-shrink-0">
                <FaStar className="text-lg sm:text-2xl" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  Total Points
                </p>
                <p className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white">
                  {loading ? "..." : stats.flooredTotalPoints}+
                </p>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <SkeletonLoader />
        ) : (
          <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mx-2 sm:mx-0">
            {/* Desktop Table Header - Hidden on mobile */}
            <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700">
              <div className="col-span-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                #
              </div>
              <div className="col-span-6 md:col-span-7 text-sm font-medium text-gray-500 dark:text-gray-400">
                Contributor
              </div>
              <div className="col-span-5 md:col-span-4 text-sm font-medium text-gray-500 dark:text-gray-400 text-right">
                Contributions
              </div>
            </div>

            {/* Contributors List */}
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {currentContributors.map((contributor, index) => (
                <motion.div
                  key={contributor.username}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="group hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                >
                  {/* Mobile Layout */}
                  <div className="sm:hidden p-4">
                    <div className="flex items-center space-x-3">
                      {/* Rank Badge */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
                          index === 0
                            ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30"
                            : index === 1
                            ? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                            : index === 2
                            ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30"
                            : "bg-gray-100 text-gray-500 dark:bg-gray-800/50 dark:text-gray-400"
                        }`}
                      >
                        {indexOfFirst + index + 1}
                      </div>

                      {/* Avatar */}
                      <img
                        src={contributor.avatar}
                        alt={contributor.username}
                        className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-700 shadow-sm flex-shrink-0"
                      />

                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <div className="min-w-0">
                            <a
                              href={contributor.profile}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-accent-400 transition-colors text-sm truncate block"
                            >
                              {contributor.username}
                            </a>
                            <a
                              href={`https://github.com/${GITHUB_REPO}/pulls?q=is:pr+author:${contributor.username}+is:merged`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-accent-400 transition-colors block"
                            >
                              View Contributions →
                            </a>
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge
                            count={contributor.prs}
                            label={`PR${contributor.prs !== 1 ? "s" : ""}`}
                            color="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          />
                          <Badge
                            count={contributor.points}
                            label="Points"
                            color="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout - Hidden on mobile */}
                  <div className="hidden sm:grid grid-cols-12 gap-4 items-center px-6 py-4">
                    <div className="col-span-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          index === 0
                            ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30"
                            : index === 1
                            ? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                            : index === 2
                            ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30"
                            : "bg-gray-100 text-gray-500 dark:bg-gray-800/50 dark:text-gray-400"
                        }`}
                      >
                        <span className="font-medium">
                          {indexOfFirst + index + 1}
                        </span>
                      </div>
                    </div>

                    <div className="col-span-6 md:col-span-7">
                      <div className="flex items-center space-x-4">
                        <img
                          src={contributor.avatar}
                          alt={contributor.username}
                          className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-700 shadow-sm"
                        />
                        <div>
                          <a
                            href={contributor.profile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-accent-400 transition-colors"
                          >
                            {contributor.username}
                          </a>
                          <div className="flex items-center mt-1 space-x-2">
                            <a
                              href={`https://github.com/${GITHUB_REPO}/pulls?q=is:pr+author:${contributor.username}+is:merged`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-accent-400 transition-colors"
                            >
                              View Contributions →
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-5 md:col-span-4">
                      <div className="flex items-center justify-end space-x-3">
                        <Badge
                          count={contributor.prs}
                          label={`PR${contributor.prs !== 1 ? "s" : ""}`}
                          color="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        />
                        <Badge
                          count={contributor.points}
                          label="Points"
                          color="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            

            {/* Pagination Controls */}

            <div className="flex justify-center items-center gap-2 py-4 border-t border-gray-200 dark:border-gray-700">
              {/* Left Arrow Button (Previous Page) */}
              <button
                disabled={currentPage === 1} // Disable if we are already on the first page
                onClick={() => setCurrentPage((p) => p - 1)} // Go back one page when clicked
                className="px-3 py-1 rounded-md bg-gray-50 dark:bg-gray-700 text-sm disabled:opacity-50 flex items-center justify-center mt-5"
              >
                {/* ChevronLeft Icon for Previous */}
                <ChevronLeft size={16} />
              </button>



              {/* Page Numbers Section */}
              <div className="flex justify-center gap-2 mt-4">
                {Array.from(
                  { length: Math.ceil(contributors.length / PAGE_SIZE) }, // Create an array with total number of pages
                  (_, i) => (
                    <button
                      key={i + 1} // Unique key for each page button
                      onClick={() => setCurrentPage(i + 1)} // Set page number on click
                      className={`px-3 py-1 rounded ${
                        currentPage === i + 1
                          ? "bg-blue-500 text-white" // Highlight the active page
                          : "bg-gray-200" // Inactive page style
                      }`}
                    >



                      {/* Display the page number */}
                      {i + 1}
                    </button>



                  )
                )}
              </div>

              {/* Right Arrow Button (Next Page) */}
              <button
                disabled={currentPage === totalPages} // Disable if we are already on the last page
                onClick={() => setCurrentPage((p) => p + 1)} // Move forward one page when clicked
                className="px-3 py-1 rounded-md bg-gray-50 dark:bg-gray-700 text-sm disabled:opacity-50 flex items-center justify-center mt-5"
              >



                {/* ChevronRight Icon for Next */}
                <ChevronRight size={16} />
              </button>
            </div>




            {/* CTA Footer */}
            <div className="bg-gray-50 dark:bg-gray-800/50 px-4 sm:px-6 py-4 text-center border-t border-gray-100 dark:border-gray-700">
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3">
                Want to see your name here? Join GSSoC'25 and start
                contributing!
              </p>
              <a
                href="https://gssoc.girlscript.tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 sm:px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors"
              >
                <FaGithub className="mr-1.5 sm:mr-2" /> Join GSSoC'25
              </a>
            </div>
          </div>
        )}

        {/* About GSSoC Section */}
        <div className="mt-8 sm:mt-12 bg-white dark:bg-secondary-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 sm:p-6 mx-2 sm:mx-0">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4">
            About GSSoC'25
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
              <strong>GirlScript Summer of Code</strong> is a 3-month long open
              source program organized by GirlScript Foundation to help
              beginners get started with Open Source Development.
            </p>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
              Participants contribute to various projects under the guidance of
              experienced mentors. This leaderboard tracks the contributions
              made by GSSoC'25 participants to the AnimateHub project.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 sm:p-4 rounded-lg">
                <h3 className="font-semibold text-blue-700 dark:text-blue-400 mb-2 text-sm sm:text-base">
                  How to Participate
                </h3>
                <ul className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 space-y-1 sm:space-y-2">
                  <li>• Register on the GSSoC'25 platform</li>
                  <li>• Join the AnimateHub project</li>
                  <li>• Start working on beginner-friendly issues</li>
                  <li>• Submit your pull requests</li>
                </ul>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 sm:p-4 rounded-lg">
                <h3 className="font-semibold text-purple-700 dark:text-purple-400 mb-2 text-sm sm:text-base">
                  Contribution Guidelines
                </h3>
                <ul className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 space-y-1 sm:space-y-2">
                  <li>• Read our contribution guidelines</li>
                  <li>• Follow the code of conduct</li>
                  <li>• Start with good first issues</li>
                  <li>• Ask for help in the community</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
