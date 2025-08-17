import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import CustomDropdown from "./CustomDropdown";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("points"); // default sort

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
      <div
        className="absolute inset-0 top-[64px] flex flex-col justify-center items-center z-40
      bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500
      dark:from-gray-950 dark:via-gray-800 dark:to-gray-950
      animate-[gradient_8s_ease_infinite] bg-[length:400%_400%]"
      >
        <div
          className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4"
          style={{
            borderColor: "#581C87",
            borderTopColor: "#581C87",
            borderBottomColor: "#581C87",
          }}
        ></div>
        <span className="mt-4 text-xl font-medium text-gray-900 dark:text-gray-100">
          Loading leaderboard...
        </span>
      </div>
    );

  if (contributors.length === 0)
    return (
      <p className="text-center mt-10 text-gray-500">
        No contributors found with PRs labeled <strong>GSSoC'25</strong>.
      </p>
    );

  // Filter & sort contributors
  const filteredContributors = contributors
    .filter((c) => c.username.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "points") return b.points - a.points;
      if (sortBy === "prs") return b.prs - a.prs;
      if (sortBy === "username") return a.username.localeCompare(b.username);
      return 0;
    });

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start
      bg-gradient-to-br from-blue-400 via-purple-300 to-blue-200
      dark:from-gray-950 dark:via-gray-700 dark:to-gray-950
      animate-gradient bg-[length:400%_400%] p-4"
    >
      <div className="max-w-5xl w-full">
        {/* Leaderboard Heading */}
        <div className="flex justify-center mb-8">
          <h2 className="text-4xl font-bold mt-4  bg-gradient-to-r from-pink-500 to-blue-800 bg-clip-text text-transparent border-2 border-gray-400 rounded-full px-6 py-2">
            AnimateHub GSSoC'25 Leaderboard
          </h2>
        </div>

        {/* Search & Sort */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search contributor..."
            className="px-4 py-2 w-full md:w-64 rounded-xl
               bg-white/70 dark:bg-gray-800/50 backdrop-blur-md
               border border-gray-200 dark:border-gray-700
               focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
               shadow-md hover:shadow-lg transition-all duration-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Sort Dropdown */}
          <CustomDropdown sortBy={sortBy} setSortBy={setSortBy} />
        </div>

        {/* Table Headings */}
        <div className="grid grid-cols-12 gap-4 font-semibold text-gray-700 dark:text-gray-300 px-4 py-2 border-b border-gray-300 dark:border-gray-600 mb-2">
          <div className="col-span-1 text-center">Rank</div>
          <div className="col-span-5">Name</div>
          <div className="col-span-3 text-center">PRs</div>
          <div className="col-span-3 text-center">Points</div>
        </div>

        {/* Leaderboard Items */}
        <div className="space-y-4">
          {filteredContributors.map((contributor, index) => {
            let borderStyles = "";
            if (index === 0)
              borderStyles =
                "border-4 border-orange-400 dark:border-orange-400 shadow-lg";
            else if (index === 1)
              borderStyles =
                "border-4 border-blue-400 dark:border-blue-400 shadow-md";
            else if (index === 2)
              borderStyles =
                "border-4 border-green-400 dark:border-green-400 shadow-md";

            return (
              <div
                key={contributor.username}
                onMouseEnter={() => handleHover(index + 1)}
                className={`grid grid-cols-12 gap-4 items-center p-4 rounded-lg transition-transform transform hover:scale-[1.02] duration-300
                  bg-white dark:bg-gray-800 hover:shadow-lg ${borderStyles}`}
              >
                <div className="col-span-1 text-center text-lg font-semibold">
                  {index === 0
                    ? "🥇"
                    : index === 1
                    ? "🥈"
                    : index === 2
                    ? "🥉"
                    : index + 1}
                </div>
                <div className="col-span-5 flex items-center gap-4">
                  <img
                    src={contributor.avatar}
                    alt={contributor.username}
                    className="w-12 h-12 rounded-full border-2 border-purple-500"
                  />
                  <a
                    href={contributor.profile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold hover:underline"
                  >
                    {contributor.username}
                  </a>
                </div>
                <div className="col-span-3 text-center">
                  📌 {contributor.prs} PR
                </div>
                <div className="col-span-3 text-center">
                  ⭐ {contributor.points} pts
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
