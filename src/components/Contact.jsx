import { motion } from "framer-motion";
import { useState } from "react";
import { personal } from "../data/portfolio";
import { FiSend, FiMail, FiGithub, FiLinkedin, FiAward } from "react-icons/fi";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }
    window.location.href = `mailto:${personal.email}?subject=Contact from ${form.name}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${form.email}`;
    setStatus("success");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setStatus(""), 4000);
  };

  return (
    <section
      id="contact"
      className="py-20 px-6 max-w-6xl mx-auto scroll-mt-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="inline-block px-3 py-1 rounded-full glass text-xs font-mono text-accent-blue mb-4">
          <span className="text-accent-cyan">●</span> CONTACT
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Get In <span className="text-accent-blue">Touch</span>
        </h2>
        <p className="text-gray-400 text-sm max-w-xl mx-auto">
          Open to internship opportunities, collaboration, and security discussions.
        </p>
        <div className="w-20 h-1 bg-accent-blue mx-auto mt-4" />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="glass rounded-xl p-6 mb-6">
            <p className="text-accent-blue font-mono text-sm mb-4">
              $ contact --info
            </p>
            <a
              href={`mailto:${personal.email}`}
              className="flex items-center gap-3 text-gray-300 hover:text-accent-blue mb-3 transition"
            >
              <FiMail /> {personal.email}
            </a>
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-gray-300 hover:text-accent-blue mb-3 transition"
            >
              <FiGithub /> GitHub
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-gray-300 hover:text-accent-blue mb-3 transition"
            >
              <FiLinkedin /> LinkedIn
            </a>
            {/* LetsDefend Profile Link */}
            <a
              href={personal.letsdefend}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 text-gray-300 hover:text-accent-purple transition"
            >
              <FiAward /> LetsDefend Profile
            </a>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="glass rounded-xl p-6 space-y-4"
        >
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full bg-bg-primary border border-accent-blue/20 rounded-lg px-4 py-3 text-white focus:border-accent-blue outline-none transition font-mono text-sm"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-bg-primary border border-accent-blue/20 rounded-lg px-4 py-3 text-white focus:border-accent-blue outline-none transition font-mono text-sm"
          />
          <textarea
            rows={5}
            placeholder="Your Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full bg-bg-primary border border-accent-blue/20 rounded-lg px-4 py-3 text-white focus:border-accent-blue outline-none transition font-mono text-sm resize-none"
          />
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent-blue text-black font-bold rounded-lg hover:shadow-[0_0_20px_#00bfff] transition"
          >
            <FiSend /> Send Message
          </button>
          {status === "success" && (
            <p className="text-accent text-sm font-mono">
              ✓ Opening mail client...
            </p>
          )}
          {status === "error" && (
            <p className="text-red-500 text-sm font-mono">
              ✗ Please fill all fields
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}