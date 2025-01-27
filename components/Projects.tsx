"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function Projects() {
  const projects = [
    {
      title: "Project 1",
      description:
        "A full-stack web application built with Next.js and MongoDB",
      image: "/placeholder.jpg",
      tags: ["Next.js", "MongoDB", "Tailwind CSS"],
      link: "#",
    },
    {
      title: "Project 2",
      description: "Real-time chat application with WebSocket integration",
      image: "/placeholder.jpg",
      tags: ["React", "Node.js", "Socket.io"],
      link: "#",
    },
    {
      title: "Project 3",
      description: "E-commerce platform with payment integration",
      image: "/placeholder.jpg",
      tags: ["Next.js", "Stripe", "PostgreSQL"],
      link: "#",
    },
    {
      title: "Project 3",
      description: "E-commerce platform with payment integration",
      image: "/placeholder.jpg",
      tags: ["Next.js", "Stripe", "PostgreSQL"],
      link: "#",
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

      // Check on mount and when window resizes
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

  // Handle mouse wheel event
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
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-[90%] mx-auto relative" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold text-center mb-16"
        >
          Featured Projects
        </motion.h2>

        {/* Navigation Buttons - Only shown when content is overflowing */}
        {isOverflowing && (
          <>
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 bg-white p-3 rounded-full shadow-lg z-10 hover:bg-gray-100 transition-colors"
              aria-label="Previous project"
            >
              <svg
                className="w-6 h-6 text-gray-800"
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
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 bg-white p-3 rounded-full shadow-lg z-10 hover:bg-gray-100 transition-colors"
              aria-label="Next project"
            >
              <svg
                className="w-6 h-6 text-gray-800"
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

        {/* Horizontal scrolling container */}
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
              className="flex-none w-[350px] md:w-[400px] snap-center bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-800">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <motion.a
                  href={project.link}
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center text-primary hover:text-blue-600 font-medium"
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

        {/* Scroll indicator */}
        <div className="mt-8 flex justify-center gap-2">
          {projects.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-gray-300 transition-colors duration-300"
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
