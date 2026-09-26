import { motion } from "framer-motion";
import { certifications } from "../data/portfolio";
import { FiAward } from "react-icons/fi";

export default function Certifications() {
  return (
    <section id="certs" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-white mb-3">
          <span className="text-accent font-mono">#</span> Certifications
        </h2>
        <div className="w-20 h-1 bg-accent mb-10" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {certifications.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl p-6 flex items-center gap-5 hover:border-accent/50 transition"
          >
            <div className="text-accent text-4xl">
              <FiAward />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">{c.name}</h3>
              <p className="text-gray-400 text-sm">{c.full}</p>
              <p className="text-accent font-mono text-xs mt-1">
                {c.issuer} • {c.year}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}