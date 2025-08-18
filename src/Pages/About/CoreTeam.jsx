import { FaCode, FaPaintBrush, FaUsers, FaLightbulb } from "react-icons/fa";

export default function CoreTeam() {
  const teams = [
    {
      icon: <FaCode size={40} className="text-purple-700 block mx-auto mb-4" />,
      team: "Development Team",
      role: "Full Stack Developers",
      desc: "Building the core platform with modern technologies",
    },
    {
      icon: <FaPaintBrush size={40} className="text-purple-700 block mx-auto mb-4" />,
      team: "Design Team",
      role: "UI/UX Designers",
      desc: "Crafting engaging and intuitive user experiences",
    },
    {
      icon: <FaUsers size={40} className="text-purple-700 block mx-auto mb-4" />,
      team: "Community Team",
      role: "Contributors & Mentors",
      desc: "Growing a vibrant and supportive developer community",
    },
    {
      icon: <FaLightbulb size={40} className="text-purple-700 block mx-auto mb-4" />,
      team: "Product Team",
      role: "Planners & Strategists",
      desc: "Shaping AnimateHub’s vision and roadmap",
    },
  ];

  return (
    <section className="w-full py-16 rounded-3xl bg-purple-100 dark:bg-gray-900 transition-colors duration-500">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-12">
        Our Core Team
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        {teams.map((t, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 border border-purple-300 rounded-2xl shadow-lg p-6 text-center transform hover:-translate-y-2 transition-all duration-500"
          >
            {/* Icon */}
            {t.icon}

            {/* Team Name */}
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {t.team}
            </h3>

            {/* Role */}
            <p className="text-purple-800 font-medium mb-2">{t.role}</p>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 text-sm">{t.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
