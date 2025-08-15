import { useEffect, useState } from "react";

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
      <div className="flex flex-col justify-center items-center mt-10">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-200"></div>
        <span className="mt-4 text-xl font-medium">Loading leaderboard...</span>
      </div>
    );

  if (contributors.length === 0)
    return (
      <p className="text-center mt-10 text-gray-500">
        No contributors found with PRs labeled <strong>GSSoC'25</strong>.
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
     <div className="flex justify-center">
  <h2 className="text-4xl font-bold mt-4 mb-16 bg-gradient-to-r from-pink-500 to-blue-800 bg-clip-text text-transparent border-2 border-gray-300 rounded-full px-6 py-2">
     AnimateHub GSSoC'25 Leaderboard
  </h2>
</div>


      <div className="space-y-4">
        {contributors.map((contributor, index) => (
          <div
            key={contributor.username}
            className="flex items-center justify-between p-4 rounded-lg shadow-md bg-white dark:bg-gray-800 hover:shadow-lg transform hover:scale-[1.02] transition duration-300"
          >
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold w-8 text-center">
                {index + 1 <= 3 ? "🏆" : index + 1}
              </span>
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
           <div className="text-right">
  <span className="inline-flex items-center gap-2 bg-gray-100 dark:bg-purple-900/30 px-3 py-1 rounded-full text-sm font-semibold">
    <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
      📌 {contributor.prs} PR
    </span>
    <span className="text-gray-500">|</span>
    <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
      ⭐ {contributor.points} pts
    </span>
  </span>
</div>

          </div>
        ))}
      </div>
    </div>
  );
}
