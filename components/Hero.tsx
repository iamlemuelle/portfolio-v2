"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  const goToProjects = () => {
    router.push("#projects");
  };

  const goToContact = () => {
    router.push("#contact");
  };

  const calculateRotation = (x: number, y: number) => {
    if (typeof window !== "undefined") {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const rotateX = (y - centerY) * 0.01;
      const rotateY = (x - centerX) * 0.01;
      return { rotateX, rotateY };
    }
    return { rotateX: 0, rotateY: 0 };
  };

  const rotation = calculateRotation(mousePosition.x, mousePosition.y);

  return (
    <section className="h-screen relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Matrix-like background effect */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
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

      {/* Glowing orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full mix-blend-screen filter blur-xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              background: `rgba(${i * 50}, ${255 - i * 30}, ${
                150 + i * 20
              }, 0.15)`,
              left: `${i * 20}%`,
              top: `${i * 15}%`,
            }}
          />
        ))}
      </div>

      <div className="relative flex items-center justify-center h-full">
        <motion.div
          className="text-center"
          style={{
            perspective: 1000,
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            animate={{
              rotateX: rotation.rotateX,
              rotateY: rotation.rotateY,
            }}
            transition={{ type: "spring", stiffness: 75, damping: 15 }}
            className="p-12 rounded-3xl backdrop-blur-md bg-gray-900/50 shadow-2xl border border-gray-700"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-mono text-green-400 mb-4"
            >
              <TypeAnimation
                sequence={[
                  '> const developer = new Developer("Jean Lemuelle");',
                  1000,
                  "> developer.start();",
                  1000,
                ]}
                repeat={Infinity}
                speed={50}
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400"
            >
              Jean Lemuelle
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl text-gray-300 mb-8 font-light"
            >
              <TypeAnimation
                sequence={[
                  "Building web applications",
                  2000,
                  "Solving complex problems",
                  2000,
                  "Creating user experiences",
                  2000,
                ]}
                repeat={Infinity}
                speed={50}
              />
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-3 justify-center mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {["TypeScript", "React", "Node.js", "Next.js", "PostgreSQL"].map(
                (tech, index) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-full text-sm font-mono bg-gray-800/50 text-gray-300 border border-gray-700"
                  >
                    {tech}
                  </span>
                )
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#3B82F6" }}
                whileTap={{ scale: 0.95 }}
                onClick={goToProjects}
                className="bg-blue-500 text-white px-8 py-4 rounded-full transition-colors text-lg font-medium shadow-lg shadow-blue-500/25 border border-blue-400"
              >
                View Projects
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={goToContact}
                className="bg-transparent text-white px-8 py-4 rounded-full transition-colors text-lg font-medium shadow-lg border border-gray-700 hover:border-gray-500"
              >
                Contact Me
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
