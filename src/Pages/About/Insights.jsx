import { FaUsers, FaCode, FaStar, FaProjectDiagram } from "react-icons/fa";

export default function Insights() {
  const stats = [
    {
      icon: <FaUsers size={40} className="text-purple-700 block mx-auto mb-4" />,
      title: "Active Users",
      value: "5k+",
      desc: "Developers and designers actively using AnimateHub",
    },
    {
      icon: <FaCode size={40} className="text-purple-700 block mx-auto mb-4" />,
      title: "Projects",
      value: "10+",
      desc: "Animation & UI/UX projects created and shared",
    },
    {
      icon: <FaStar size={40} className="text-purple-700 block mx-auto mb-4" />,
      title: "Stars",
      value: "50+",
      desc: "Projects appreciated by the community",
    },
    {
      icon: <FaProjectDiagram size={40} className="text-purple-700 block mx-auto mb-4" />,
      title: "Contributors",
      value: "60+",
      desc: "People contributing to AnimateHub’s growth",
    },
  ];

  return (
    <section className="w-full py-16 rounded-3xl bg-purple-50 dark:bg-gray-900 transition-colors duration-500">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-12">
        Our Insights
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        {stats.map((s, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 border border-purple-300 rounded-2xl shadow-lg p-6 text-center transform hover:-translate-y-2 transition-all duration-500"
          >
            {/* Icon */}
            {s.icon}

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {s.title}
            </h3>

            {/* Value */}
            <p className="text-purple-800 font-semibold mb-2 text-2xl">{s.value}</p>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 text-sm">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
