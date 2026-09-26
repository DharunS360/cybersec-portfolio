import { motion } from "framer-motion";
import { experience } from "../data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-white mb-3">
          <span className="text-accent font-mono">#</span> Experience
        </h2>
        <div className="w-20 h-1 bg-accent mb-10" />
      </motion.div>

      <div className="relative border-l-2 border-accent/30 pl-8 ml-4">
        {experience.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="relative mb-12 last:mb-0"
          >
            <span className="absolute -left-[42px] top-2 w-4 h-4 rounded-full bg-accent shadow-[0_0_15px_#00ff9d]" />
            <div className="glass rounded-xl p-6">
              <div className="flex flex-wrap justify-between gap-2 mb-2">
                <h3 className="text-white font-bold text-lg">{exp.role}</h3>
                <span className="text-accent font-mono text-sm">
                  {exp.duration}
                </span>
              </div>
              <p className="text-accent-blue mb-4 text-sm">{exp.company}</p>
              <ul className="space-y-2">
                {exp.points.map((pt, idx) => (
                  <li key={idx} className="text-gray-400 text-sm flex gap-2">
                    <span className="text-accent">▹</span> {pt}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}