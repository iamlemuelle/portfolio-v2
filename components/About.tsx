"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = ["/Lam-Ang.png", "/Taya.png", "/AI.png", "/1722528132972.jpg"];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: "Years Experience", value: "1+" },
    { label: "Projects Completed", value: "7+" },
    { label: "Satisfied Clients", value: "10+" },
    { label: "Tech Stacks", value: "6+" },
  ];

  const handleDownloadResume = () => {
    window.open("/path-to-your-resume.pdf", "_blank");
  };

  return (
    <section id="about" className="py-20 bg-gray-900 relative overflow-hidden">
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
          className="text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400"
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="relative w-full h-[300px] rounded-xl overflow-hidden border border-gray-700">
              {images.map((src, index) => (
                <Image
                  key={src}
                  src={src}
                  alt={`Profile image ${index + 1}`}
                  fill
                  className={`object-cover transition-opacity duration-1000 ${
                    currentImageIndex === index ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
            </div>
            <div className="font-mono text-green-400 mb-4">
              <TypeAnimation
                sequence={[
                  "> const aboutMe = {",
                  1000,
                  '> const aboutMe = {\n  passion: "development",',
                  1000,
                  '> const aboutMe = {\n  passion: "development",\n  focus: "backend & AI"',
                  1000,
                  '> const aboutMe = {\n  passion: "development",\n  focus: "backend & AI",\n  goal: "innovation"',
                  1000,
                ]}
                repeat={Infinity}
                speed={50}
                wrapper="pre"
                className="text-sm"
              />
            </div>
            <p className="text-xl text-gray-300 leading-relaxed">
              I am a passionate developer with a strong focus on backend
              technologies, specializing in building AI-driven solutions and
              scalable systems.
            </p>
            <p className="text-xl text-gray-300 leading-relaxed">
              My journey in backend development has involved working with
              cutting-edge technologies, including AI, machine learning, and
              database optimization.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#3B82F6" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadResume}
              className="bg-blue-500 text-white px-8 py-4 rounded-full transition-colors text-lg font-medium shadow-lg shadow-blue-500/25 border border-blue-400"
            >
              Download Resume
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-md border border-gray-700 hover:border-blue-500/50 transition-all duration-300"
              >
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2"
                >
                  {stat.value}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="text-gray-300"
                >
                  {stat.label}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
