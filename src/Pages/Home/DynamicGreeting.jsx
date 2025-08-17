import { useEffect, useState } from "react";

export default function DynamicGreeting() {
  const [userName, setUserName] = useState("");
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && tempName.trim()) {
      setUserName(tempName.trim());
      setTempName("");
    }
  };

  return (
    <div className="flex justify-center items-center px-4">
      {greeting && (
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 animate-gradient-x">
              {greeting},
            </span>
          </h1>
          
          {userName ? (
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-purple-600 dark:text-purple-400">
                {userName}!
              </h2>
              <button
                onClick={() => {setUserName(""); setTempName("");}}
                className="text-sm text-gray-500 hover:text-purple-500 dark:text-gray-400 dark:hover:text-purple-400 underline transition-colors"
              >
                Change name
              </button>
            </div>
          ) : (
            <input
              type="text"
              placeholder="What's your name?"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onKeyPress={handleKeyPress}
              className="
                px-4 py-2
                text-center
                text-lg sm:text-xl
                rounded-lg
                border border-gray-300 dark:border-gray-600
                bg-white dark:bg-[#0f172a]
                text-gray-800 dark:text-gray-100
                placeholder-gray-500 dark:placeholder-gray-400
                focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800
                transition-all duration-300
                max-w-xs w-full
              "
              autoFocus
            />
          )}
        </div>
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