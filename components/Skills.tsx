"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { TypeAnimation } from "react-type-animation";

export default function Skills() {
  const technologies = [
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "Next.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    },
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Laravel",
      icon: "/laravel-original.svg",
    },
    {
      name: "Tailwind",
      icon: "/tailwindcss-original.svg",
    },
    {
      name: "Unity Engine",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg",
    },
    {
      name: "PHP",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg",
    },
    {
      name: "MongoDB",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
    {
      name: "PostgreSQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    },
    {
      name: "MySQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    },
    {
      name: "OpenAI API",
      icon: "/openai-2.svg",
    },
    {
      name: "Perplexity AI API",
      icon: "/perplexity-color.svg",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-20 bg-gray-900 relative overflow-hidden">
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

      <div className="max-w-6xl mx-auto px-4 relative" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400"
        >
          Tech Stack
        </motion.h2>

        <div className="text-center mb-12">
          <TypeAnimation
            sequence={[
              "> const skills = technologies.map(tech => {",
              1000,
              "> const skills = technologies.map(tech => {\n  return tech.mastery;",
              1000,
            ]}
            repeat={Infinity}
            speed={50}
            wrapper="pre"
            className="text-sm font-mono text-green-400 inline-block text-left"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotateY: 180 }}
              className="flex flex-col items-center justify-center p-6 bg-gray-800/50 backdrop-blur-md rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-700 hover:border-blue-500/50 group"
            >
              <div className="relative w-16 h-16 mb-3">
                <motion.img
                  src={tech.icon}
                  alt={`${tech.name} logo`}
                  className="w-full h-full object-contain filter group-hover:brightness-125 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-10 rounded-full transition-opacity duration-300" />
              </div>
              <span className="text-sm font-medium text-gray-300 group-hover:text-blue-400 transition-colors duration-300">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
