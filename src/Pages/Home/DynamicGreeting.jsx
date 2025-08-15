import { useEffect, useState } from "react";

export default function DynamicGreeting() {
  const storedName = localStorage.getItem("userName");
const [userName, setUserName] = useState(storedName || "");
  const [tempName, setTempName] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      let greet = "";

      if (hour >= 5 && hour < 12) greet = "Good Morning";
      else if (hour >= 12 && hour < 17) greet = "Good Afternoon";
      else if (hour >= 17 && hour < 24) greet = "Good Evening";
      else greet = "Good Night";

      setGreeting(greet);
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tempName.trim()) return;
    localStorage.setItem("userName", tempName.trim());
    setUserName(tempName.trim());
    setTempName("");
  };

  return (
    <div className="flex justify-center items-center">
      {greeting && (
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold inline-flex items-center gap-2">
          {/* Gradient greeting */}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 animate-gradient-x">
            {greeting},
          </span>
          {userName && userName !== "Guest" ? (
            <span className="text-purple-600 font-semibold">{userName}</span>
          ) : (
            <form onSubmit={handleSubmit} className="inline">
              <input
  type="text"
  placeholder="Your name"
  value={tempName}
  onChange={(e) => setTempName(e.target.value)}
  className="
    px-2 py-1
    rounded-sm
    border-none
    bg-white dark:bg-[#0f172a]
    text-gray-800 dark:text-gray-100
    placeholder-gray-400 dark:placeholder-gray-500
    focus:outline-none
    text-base
    transition-all duration-300
  "

  autoFocus
/>

            </form>
          )}
        </h1>
      )}
      <style>{`
        @keyframes gradient-x {
          0% {background-position: 0% 50%;}
          50% {background-position: 100% 50%;}
          100% {background-position: 0% 50%;}
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 5s ease infinite;
        }
      `}</style>
    </div>
  );
}
