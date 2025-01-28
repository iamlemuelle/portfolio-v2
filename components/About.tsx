"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "/Lam-Ang.png", // Replace with your image URLs
    "/Taya.png",
    "/AI.png",
    "/1722528132972.jpg",
  ];

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
    // Replace with your resume file path
    window.open("/path-to-your-resume.pdf", "_blank");
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-center mb-16"
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
            <div className="relative w-full h-[300px] rounded-xl overflow-hidden">
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
            </div>
            <p className="text-xl text-gray-600 leading-relaxed">
              I am a passionate developer with a strong focus on backend
              technologies, specializing in building AI-driven solutions and
              scalable systems. With expertise in advanced frameworks and tools,
              I design efficient, data-driven solutions that enhance user
              experiences and business outcomes.
            </p>
            <p className="text-xl text-gray-600 leading-relaxed">
              My journey in backend development has involved working with
              cutting-edge technologies, including AI, machine learning, and
              database optimization, all while staying updated with the latest
              industry advancements at my current company, Fullstack HQ.
            </p>
            <button
              onClick={handleDownloadResume}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              Download Resume
            </button>
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
                className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="text-3xl font-bold text-primary mb-2"
                >
                  {stat.value}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="text-gray-600"
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
