"use client";

import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { useRef } from "react";
import { TypeAnimation } from "react-type-animation";

export default function WorkExperience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const experiences = [
    {
      position: "Web Developer, FullstackHQ",
      period: "Aug 2024 - Present",
      description:
        "Currently, I am working as a web developer at FullstackHQ where I developed scalable APIs, integrated payment gateways like Stripe, and built custom AI solutions tailored to client needs.",
      align: "right",
    },
    {
      position: "Freelance Game Developer",
      period: "May 2024 - November 2024",
      description:
        "I began freelancing right after college since it was my dream to be a game developer back then. I enjoyed creating games and developing my skills in game development.",
      align: "left",
    },
    {
      position: "Web Developer Intern, WAH",
      period: "Jan 2024 - Jun 2024",
      description:
        "During my project development experience, I built a COOP system from scratch, beginning with a Figma prototype and advancing to full implementation.",
      align: "right",
    },
  ];

  return (
    <section
      id="experience"
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

      <div className="max-w-6xl mx-auto px-4 relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
            Work Experience
          </h2>
          <div className="mt-4 font-mono text-green-400">
            <TypeAnimation
              sequence={[
                "> for (const role of experience) {",
                1000,
                "> for (const role of experience) {\n  console.log(role.impact);",
                1000,
              ]}
              repeat={Infinity}
              speed={50}
              wrapper="div"
              className="text-sm"
            />
          </div>
        </motion.div>

        <div className="relative">
          {/* Animated timeline line */}
          <motion.div
            className="absolute left-16 h-full w-0.5 bg-blue-500 origin-top"
            style={{ scaleY }}
          />

          {/* Experience items */}
          <div className="space-y-16">
            {experiences.map((exp, index) => {
              const itemRef = useRef(null);
              const isInView = useInView(itemRef, {
                once: true,
                margin: "-100px",
              });

              return (
                <motion.div
                  key={index}
                  ref={itemRef}
                  className="relative flex items-start"
                >
                  {/* Animated timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="absolute left-16 w-3 h-3 bg-blue-500 rounded-full transform -translate-x-1.5 mt-2"
                  />

                  <div className="ml-32 w-full">
                    <div
                      className={`flex ${
                        exp.align === "right" ? "justify-end" : "justify-start"
                      } w-full`}
                    >
                      <motion.div
                        initial={{
                          opacity: 0,
                          x: exp.align === "right" ? 50 : -50,
                        }}
                        animate={
                          isInView
                            ? {
                                opacity: 1,
                                x: 0,
                              }
                            : {}
                        }
                        whileHover={{
                          scale: 1.02,
                          transition: { duration: 0.2 },
                        }}
                        transition={{
                          duration: 0.5,
                          delay: 0.3,
                          type: "spring",
                          stiffness: 100,
                        }}
                        className={`
                          max-w-lg ${
                            exp.align === "right" ? "text-right" : "text-left"
                          }
                          p-6 rounded-lg
                          transition-all duration-300
                          bg-gray-800/50 backdrop-blur-md
                          hover:shadow-xl
                          hover:shadow-blue-500/10
                          cursor-pointer
                          border border-gray-700
                          hover:border-blue-500/50
                        `}
                      >
                        <motion.h3
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 1 } : {}}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          className="text-xl font-bold text-gray-200"
                        >
                          {exp.position}
                        </motion.h3>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 1 } : {}}
                          transition={{ duration: 0.5, delay: 0.5 }}
                          className="text-blue-400 font-semibold mt-1"
                        >
                          {exp.period}
                        </motion.p>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 1 } : {}}
                          transition={{ duration: 0.5, delay: 0.6 }}
                          className="text-gray-400 mt-3"
                        >
                          {exp.description}
                        </motion.p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
