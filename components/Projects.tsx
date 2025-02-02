"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";

export default function Projects() {
  const [windowHeight, setWindowHeight] = useState(1000); // Default value

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowHeight(window.innerHeight);
    }
  }, []);
  const projects = [
    {
      title: "Quizzzbee",
      description:
        "A web application that provides learning materials to students who wants to learn efficiently",
      image: "/ai-tutor.png",
      tags: ["Next.js", "MongoDB", "OpenAI", "Perplexity AI"],
      link: "https://quizzzbee.netlify.app/",
    },
    {
      title: "Post with Proof",
      description:
        "A full-stack web application built with Next.js and MongoDB",
      image: "/AI.png",
      tags: ["Next.js", "MongoDB", "Tailwind CSS", "Perplexity API"],
      link: "https://postwithproof.netlify.app/",
    },
    {
      title: "AI Chatbot",
      description:
        "A full-stack web application built with Next.js and MongoDB with OpenAI",
      image: "/ai-chatbot.png",
      tags: ["Next.js", "MongoDB", "OpenAI"],
      link: "https://certivo.netlify.app/auth",
    },
    {
      title: "Taya!",
      description:
        "An android platformer game developed meant to serve as an educational game",
      image: "/Taya.png",
      tags: ["Unity Engine"],
      link: "https://lemuu03.itch.io/taya",
    },
    {
      title: "Istory ni Lam-Ang",
      description:
        "A 2D RPG Game developed to play as Lam-Ang and learn his story",
      image: "/Lam-Ang.png",
      tags: ["Unity Engine", "Unity Relay", "Multiplay Hosting"],
      link: "https://lemuu03.itch.io/biag-ni-lam-ang",
    },
  ];

  const ref = useRef(null);
  const scrollRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkOverflow = () => {
        if (scrollRef.current) {
          const { scrollWidth, clientWidth } = scrollRef.current;
          setIsOverflowing(scrollWidth > clientWidth);
        }
      };

      checkOverflow();
      window.addEventListener("resize", checkOverflow);

      return () => {
        window.removeEventListener("resize", checkOverflow);
      };
    }
  }, []);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleWheel = (e) => {
    if (e.deltaY !== 0 && isOverflowing) {
      e.preventDefault();
      const container = scrollRef.current;
      if (container) {
        container.scrollLeft += e.deltaY;
      }
    }
  };

  return (
    <section
      id="projects"
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
              y: [windowHeight, -100],
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

      <div className="max-w-[90%] mx-auto relative" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400"
        >
          Featured Projects
        </motion.h2>

        <div className="text-center mb-12">
          <TypeAnimation
            sequence={[
              "> const projects = portfolio.map(project => {",
              1000,
              "> const projects = portfolio.map(project => {\n  return project.showcase();",
              1000,
            ]}
            repeat={Infinity}
            speed={50}
            wrapper="div"
            className="text-sm font-mono text-green-400 inline-block text-left"
          />
        </div>

        {isOverflowing && (
          <>
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 bg-gray-800 p-3 rounded-full shadow-lg z-10 hover:bg-gray-700 transition-colors border border-gray-700"
              aria-label="Previous project"
            >
              <svg
                className="w-6 h-6 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 bg-gray-800 p-3 rounded-full shadow-lg z-10 hover:bg-gray-700 transition-colors border border-gray-700"
              aria-label="Next project"
            >
              <svg
                className="w-6 h-6 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}

        <div
          ref={scrollRef}
          onWheel={handleWheel}
          className="flex overflow-x-auto gap-8 pb-8 snap-x snap-mandatory hide-scrollbar scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex-none w-[350px] md:w-[400px] snap-center bg-gray-800/50 backdrop-blur-md rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 border border-gray-700 hover:border-blue-500/50"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-200">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-gray-900/50 text-gray-300 text-sm px-3 py-1 rounded-full border border-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <motion.a
                  href={project.link}
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
                >
                  View Project
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {projects.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-gray-700 transition-colors duration-300"
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
