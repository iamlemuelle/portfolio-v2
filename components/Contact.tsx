"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { TypeAnimation } from "react-type-animation";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formState);
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gray-900 relative overflow-hidden"
    >
      {/* Matrix-like background effect */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-500 text-opacity-20 font-mono text-sm"
            initial={{ y: -100 }}
            animate={{
              y: [window.innerHeight, -100],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
            style={{
              left: `${i * 5}%`,
            }}
          >
            {[...Array(20)].map((_, j) => (
              <div key={j}>{Math.random().toString(36).substring(2, 3)}</div>
            ))}
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
            Get In Touch
          </h2>
          <div className="text-center mb-8">
            <TypeAnimation
              sequence={[
                "> const contact = async () => {",
                1000,
                "> const contact = async () => {\n  await sendMessage();",
                1000,
                '> const contact = async () => {\n  await sendMessage();\n  return "Looking forward to connecting!";',
                2000,
              ]}
              repeat={Infinity}
              speed={50}
              wrapper="div"
              className="text-sm font-mono text-green-400 inline-block text-left"
            />
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-6 bg-gray-800/50 p-8 rounded-xl shadow-lg backdrop-blur-md border border-gray-700"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Name
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={(e) =>
                setFormState({ ...formState, name: e.target.value })
              }
              className="mt-1 block w-full rounded-lg bg-gray-900 border-gray-700 text-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email
            </label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={(e) =>
                setFormState({ ...formState, email: e.target.value })
              }
              className="mt-1 block w-full rounded-lg bg-gray-900 border-gray-700 text-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Message
            </label>
            <motion.textarea
              whileFocus={{ scale: 1.01 }}
              id="message"
              name="message"
              rows={4}
              value={formState.message}
              onChange={(e) =>
                setFormState({ ...formState, message: e.target.value })
              }
              className="mt-1 block w-full rounded-lg bg-gray-900 border-gray-700 text-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-all duration-200"
              required
            ></motion.textarea>
          </div>
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "#3B82F6" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-blue-500 text-white px-8 py-4 rounded-full transition-colors text-lg font-medium shadow-lg shadow-blue-500/25 border border-blue-400"
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
