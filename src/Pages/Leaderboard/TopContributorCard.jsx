import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function TopContributorCard({ contributor, rank }) {
  // Trigger confetti when leaderboard loads (only for top 3)
  useEffect(() => {
    if (rank <= 3) {
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
        });
      }, 800); // small delay for smoothness
    }
  }, [rank]);

  // Confetti on hover
  const handleHover = () => {
    if (rank <= 3) {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
      });
    }
  };

  return (
    <div
      onMouseEnter={handleHover}
      className={`p-4 rounded-2xl shadow-md flex items-center gap-4 cursor-pointer transition transform hover:scale-105 ${
        rank === 1
          ? "bg-yellow-100 dark:bg-yellow-900"
          : rank === 2
          ? "bg-gray-200 dark:bg-gray-700"
          : rank === 3
          ? "bg-orange-100 dark:bg-orange-900"
          : "bg-white dark:bg-slate-800"
      }`}
    >
      <img
        src={contributor.avatar}
        alt={contributor.name}
        className="w-12 h-12 rounded-full border-2 border-purple-500"
      />
      <div>
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
          #{rank} {contributor.name}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          {contributor.contributions} contributions
        </p>
      </div>
    </div>
  );
}
