import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const GITHUB_REPO = "Premkolte/AnimateHub";
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN || "";

const POINTS = {
  level1: 3,
  level2: 7,
  level3: 10,
};

export default function LeaderBoard() {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const handleHover = (rank) => {
    if (rank <= 3) {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
      });
    }
  };

  useEffect(() => {
    const fetchContributorsWithPoints = async () => {
      try {
        let contributorsMap = {};
        let page = 1;
        let hasMore = true;

        while (hasMore) {
          const res = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO}/pulls?state=closed&per_page=100&page=${page}`,
            { headers: TOKEN ? { Authorization: `token ${TOKEN}` } : {} }
          );

          const prs = await res.json();
          if (prs.length === 0) {
            hasMore = false;
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

          page++;
        }

        setContributors(
          Object.values(contributorsMap).sort((a, b) => b.points - a.points)
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contributors:", error);
        setLoading(false);
      }
    };

    fetchContributorsWithPoints();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 dark:border-gray-700"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-blue-500 absolute inset-0"></div>
        </div>
        <div className="mt-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Loading leaderboard...
          </h3>
        </div>
      </div>
    );

  if (contributors.length === 0)
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            No Contributors Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            No contributors found with PRs labeled <strong>GSSoC'25</strong>.
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex justify-center items-center mb-4">
              <div className="text-4xl mr-3">🏆</div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                AnimateHub GSSoC'25 Leaderboard
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-3">
          {contributors.map((contributor, index) => {
            // Determine top 3 border styles
            let borderStyles = "";
            if (index === 0)
              borderStyles = "border-l-4 border-l-yellow-400 shadow-lg shadow-yellow-100 dark:shadow-yellow-900/20";
            else if (index === 1)
              borderStyles = "border-l-4 border-l-gray-400 shadow-lg shadow-gray-100 dark:shadow-gray-900/20";
            else if (index === 2)
              borderStyles = "border-l-4 border-l-amber-400 shadow-lg shadow-amber-100 dark:shadow-amber-900/20";

            return (
              <div
                key={contributor.username}
                onMouseEnter={() => handleHover(index + 1)}
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ${borderStyles}`}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <span className="text-lg font-semibold w-8 text-center flex-shrink-0">
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
                  </span>

                  <img
                    src={contributor.avatar}
                    alt={contributor.username}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 transition-colors duration-300 flex-shrink-0"
                  />
                  <a
                    href={contributor.profile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-wrap sm:text-xl font-semibold hover:underline text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 truncate"
                  >
                    {contributor.username}
                  </a>
                </div>
                <div className="flex items-center gap-3 mt-3 sm:mt-0">
                  <span className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full text-sm font-semibold border border-blue-200 dark:border-blue-800">
                    <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                      📌 {contributor.prs} PR
                    </span>
                  </span>
                  <span className="text-gray-300 dark:text-gray-600">|</span>
                  <span className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full text-sm font-semibold border border-green-200 dark:border-green-800">
                    <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                      ⭐ {contributor.points} pts
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}