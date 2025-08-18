import { useEffect, useState } from "react";
import CountUp from "react-countup";

const GITHUB_USER = "Premkolte";
const GITHUB_REPO = "AnimateHub";

export default function GitHubStats() {
  const [stats, setStats] = useState({
    stars: 0,
    forks: 0,
    issues: 0,
    contributors: 0,
    lastCommit: "",
    size: 0,
  });

  useEffect(() => {
    async function fetchGitHubStats() {
      try {
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const repoRes = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}`, { headers });
        const repoData = await repoRes.json();
        const contributorsRes = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contributors?per_page=1&anon=true`, { headers });
        const contributorsCount = contributorsRes.headers.get("Link")?.match(/&page=(\d+)>; rel="last"/)?.[1] || 0;

        setStats({
          stars: repoData.stargazers_count || 0,
          forks: repoData.forks_count || 0,
          issues: repoData.open_issues_count || 0,
          contributors: contributorsCount || 0,
          lastCommit: new Date(repoData.pushed_at).toLocaleDateString(),
          size: repoData.size || 0,
        });
      } catch (err) {
        console.error("Error fetching GitHub stats:", err);
      }
    }

    fetchGitHubStats();
  }, []);

  const statCards = [
    { label: "Stars", value: stats.stars, icon: "⭐", link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/stargazers` },
    { label: "Forks", value: stats.forks, icon: "🍴", link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/network/members` },
    { label: "Issues", value: stats.issues, icon: "🐛", link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/issues` },
    { label: "Contributors", value: stats.contributors, icon: "👥", link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/graphs/contributors` },
    { label: "Last Commit", value: stats.lastCommit, icon: "⏰", link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/commits` },
    { label: "Repo Size (KB)", value: stats.size, icon: "💾", link: `https://github.com/${GITHUB_USER}/${GITHUB_REPO}` },
  ];

  return (
    <section className="py-12 rounded-xl bg-blue-100 dark:bg-secondary-900 text-secondary-900 dark:text-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h3 className="text-3xl sm:text-4xl font-extrabold mb-10">
          Project Stats
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {statCards.map(({ label, value, icon, link }) => (
            <a
              key={label}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-primary-50 dark:bg-secondary-800  p-6 rounded-lg shadow-sm hover:shadow-sm dark:shadow-none  transform hover:-translate-y-1 transition-all duration-300  hover:ring-1 hover:ring-primary-300 dark:hover:ring-accent-500 flex flex-col items-center justify-center text-secondary-900 dark:text-white"
            >
              <div className="text-3xl mb-2">{icon}</div>
              <div className="text-2xl font-bold">
                {typeof value === "number" ? <CountUp end={value} duration={1.5} /> : value}
              </div>
              <div className="text-gray-600 dark:text-gray-300 mt-1 group-hover:text-primary-700 dark:group-hover:text-accent-400 transition-colors">
                {label}
              </div>
            </a>

          ))}
        </div>
      </div>
    </section>
  );
}
