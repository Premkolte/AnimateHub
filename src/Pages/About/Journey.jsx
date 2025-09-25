import { motion } from "framer-motion"

export default function JourneySection() {
  const journey = [
    {
      year: "2022",
      title: "The Beginning",
      desc: "AnimateHub was born with the idea of making animations easier for developers by providing ready-to-use components and snippets.",
    },
    {
      year: "2023",
      title: "Growth",
      desc: "We expanded our library with HTML, CSS, JS, and React components, empowering creators to design interactive experiences faster.",
    },
    {
      year: "2024",
      title: "Community",
      desc: "AnimateHub grew into a community-driven project, with contributions from developers worldwide and a shared passion for web animations.",
    },
    {
      year: "2025",
      title: "GSSOC",
      desc: "Chosen as an official project for GirlScript Summer of Code (GSSoC) 2025.",
    },
  ]

  return (
    <section className="w-full py-16 rounded-3xl bg-purple-50 dark:bg-gray-900 transition-colors duration-500">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 dark:text-gray-100 mb-4 transition-colors duration-500">
        Our Journey
      </h2>
      <p className="text-center text-base md:text-lg font-medium text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto pb-20 transition-colors duration-500">
        Making <span className="text-purple-600 dark:text-purple-400 font-semibold">animations </span>
        simple, engaging, and accessible for every developer.
      </p>

      <div className="relative max-w-5xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-6 md:left-1/2 top-0 h-full w-1 bg-purple-600 dark:bg-purple-400 md:transform md:-translate-x-1/2"></div>

        {journey.map((item, index) => {
          const isLeft = index % 2 === 0
          const rowAlignMd = isLeft ? "md:justify-start" : "md:justify-end"
          const sideSpacing = isLeft ? "ml-12 md:ml-14 md:mr-0" : "ml-12 md:mr-14 md:ml-0"

          return (
            <motion.div
              key={index}
              className={`relative mb-12 md:mb-16 flex w-full items-center justify-start ${rowAlignMd}`}
              initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Dot */}
              <div className="absolute left-4 md:left-1/2 top-1/2 transform -translate-y-1/2 md:-translate-x-1/2 w-5 h-5 md:w-6 md:h-6 bg-purple-600 dark:bg-purple-400 rounded-full border-4 border-white dark:border-gray-900 z-10"></div>

              {/* Card */}
              <div
                className={`bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 md:p-8 w-full md:w-[26rem] border-t-4 border-purple-600 dark:border-purple-400 ${sideSpacing}`}
              >
                <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400">{item.year}</h3>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-2">{item.title}</h4>
                <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
