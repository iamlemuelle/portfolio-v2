"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
    router.push("#projects"); // Replace with the path to your projects page
  };

  const goToContact = () => {
    router.push("#contact"); // Replace with the path to your contact page
  };

  // Calculate rotation
  const calculateRotation = (x: number, y: number) => {
    if (typeof window !== "undefined") {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const rotateX = (y - centerY) * 0.01;
      const rotateY = (x - centerX) * 0.01;
      return { rotateX, rotateY };
    }
    return { rotateX: 0, rotateY: 0 }; // Default rotation in case of SSR
  };

  const rotation = calculateRotation(mousePosition.x, mousePosition.y);

  return (
    <section className="h-screen relative overflow-hidden bg-gradient-to-b from-white to-gray-100">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full mix-blend-multiply filter blur-xl opacity-30"
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
              background: `hsl(${i * 60}, 70%, 50%)`,
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
            className="p-8 rounded-2xl backdrop-blur-sm bg-white/30 shadow-2xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-7xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600"
            >
              Hi, I'm <span className="text-primary">Jean Lemuelle</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl text-gray-700 mb-10"
            >
              Full Stack Developer | Problem Solver | Tech Enthusiast
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToProjects}
                className="bg-primary text-white px-8 py-4 rounded-full hover:bg-blue-600 transition-colors text-lg font-medium shadow-lg"
              >
                View My Work
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToContact}
                className="bg-white text-primary px-8 py-4 rounded-full hover:bg-gray-50 transition-colors text-lg font-medium shadow-lg border-2 border-primary"
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
