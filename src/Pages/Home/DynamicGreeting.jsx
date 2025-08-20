import { useEffect, useState } from "react";

export default function DynamicGreeting() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      let greet = "";

      if (hour >= 5 && hour < 12) greet = "Good Morning...!";
      else if (hour >= 12 && hour < 17) greet = "Good Afternoon...!";
      else if (hour >= 17 && hour < 24) greet = "Good Evening...!";
      else greet = "Good Night...!";

      setGreeting(greet);
    };

    updateGreeting();
    const interval = setInterval(updateGreeting, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center px-4">
      {greeting && (
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 animate-gradient-x">
              {greeting}
            </span>
          </h1>
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