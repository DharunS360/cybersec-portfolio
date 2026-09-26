import { motion } from "framer-motion";
import { useState } from "react";
import { projects } from "../data/portfolio";
import { FiGithub, FiExternalLink } from "react-icons/fi";

const categories = ["All", "Web", "Network", "Forensics", "CTF"];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-white mb-3">
          <span className="text-accent font-mono">#</span> Projects
        </h2>
        <div className="w-20 h-1 bg-accent mb-10" />
      </motion.div>

      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-lg font-mono text-sm transition ${
              filter === cat
                ? "bg-accent text-black shadow-[0_0_15px_#00ff9d]"
                : "border border-accent/30 text-accent hover:bg-accent/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -8 }}
            className="glass rounded-xl p-6 hover:border-accent/60 transition-all group flex flex-col"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="text-accent font-mono text-xs">{p.category}</div>
              <div className="flex gap-2 text-gray-500">
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent transition"
                >
                  <FiGithub />
                </a>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent transition"
                >
                  <FiExternalLink />
                </a>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition">
              {p.title}
            </h3>
            <p className="text-gray-400 text-sm mb-4 flex-grow">{p.description}</p>
            <div className="flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="text-xs px-2 py-1 bg-accent/10 text-accent rounded font-mono"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}