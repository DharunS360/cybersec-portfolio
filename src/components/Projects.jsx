import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { projects } from "../data/portfolio";
import { FiGithub, FiExternalLink } from "react-icons/fi";

// Dynamic categories — derive from actual project data
function useCategories() {
  return useMemo(() => {
    const uniqueCategories = new Set(projects.map((p) => p.category));
    return ["All", ...Array.from(uniqueCategories).sort()];
  }, []);
}

export default function Projects() {
  const categories = useCategories();
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((p) => p.category === filter);
  }, [filter]);

  // Count per category
  const categoryCounts = useMemo(() => {
    const counts = { All: projects.length };
    projects.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <section
      id="projects"
      className="py-20 px-6 max-w-6xl mx-auto scroll-mt-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-8">
          <div className="inline-block px-3 py-1 rounded-full glass text-xs font-mono text-accent-blue mb-4">
            <span className="text-accent-cyan">●</span> PORTFOLIO
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Featured <span className="text-accent-blue">Projects</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            {projects.length} hands-on projects in SOC, threat intel, and defense
          </p>
          <div className="w-20 h-1 bg-accent-blue mx-auto mt-4" />
        </div>
      </motion.div>

      {/* Filter tabs — dynamic */}
      <div className="flex flex-wrap gap-3 mb-10 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={
              "px-4 py-2 rounded-lg font-mono text-sm transition-all flex items-center gap-2 " +
              (filter === cat
                ? "bg-accent-blue text-black shadow-[0_0_15px_#00bfff]"
                : "border border-accent-blue/30 text-accent-blue hover:bg-accent-blue/10")
            }
          >
            <span>{cat}</span>
            <span
              className={
                "text-[10px] px-1.5 py-0.5 rounded-full " +
                (filter === cat
                  ? "bg-black/20 text-black"
                  : "bg-accent-blue/10 text-accent-blue")
              }
            >
              {categoryCounts[cat] || 0}
            </span>
          </button>
        ))}
      </div>

      {/* Projects grid */}
      <AnimatePresence mode="wait">
        {filtered.length > 0 ? (
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -8 }}
                className="glass rounded-xl p-6 hover:border-accent-blue/60 transition-all group flex flex-col border border-accent-blue/20"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="text-accent-blue font-mono text-xs">
                    {p.category}
                  </div>
                  <div className="flex gap-2 text-gray-500">
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-accent-blue transition"
                      title="GitHub"
                    >
                      <FiGithub />
                    </a>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-accent-blue transition"
                      title="Open"
                    >
                      <FiExternalLink />
                    </a>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-blue transition">
                  {p.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 flex-grow">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2 py-1 bg-accent-blue/10 text-accent-blue rounded font-mono border border-accent-blue/20"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl text-accent-blue/30 mb-4">◉</div>
            <p className="text-gray-500 font-mono text-sm">
              No projects in this category yet.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}