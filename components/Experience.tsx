"use client";

import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { useRef } from "react";

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
        "Currently, I am working as a web developer at FullstackHQ where I developed scalable APIs, integrated payment gateways like Stripe, and built custom AI solutions tailored to client needs. By leveraging MongoDB’s vector search and OpenAI API, I enhanced data analysis and decision-making. Additionally, I streamlined data pipelines to optimize workflows and improve client operations.",
      align: "right",
    },
    {
      position: "Freelance Game Developer",
      period: "May 2024 - November 2024",
      description:
        "I began freelancing right after college since it was my dream to be a game developer back then. I enjoyed creating games and developing my skills in game development. So why not earn money from what you enjoy.",
      align: "left",
    },
    {
      position: "Web Developer Intern, WAH",
      period: "Jan 2024 - Jun 2024",
      description:
        "During my project development experience, I built a COOP system from scratch, beginning with a Figma prototype and advancing to full implementation. I contributed to backend development using my expertise in the Laravel framework, designing core functionalities, and aiding in the creation of the database architecture to ensure a robust and efficient system..",
      align: "right",
    },
  ];

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold">Work Experience:</h2>
          <h3 className="text-3xl md:text-4xl font-bold mt-2">
            Beyond Boundaries,{" "}
            <span className="text-blue-500">Into Possibilities.</span>
          </h3>
          <p className="text-gray-600 mt-6 text-lg max-w-3xl">
            My experience spans building a COOP system from scratch, integrating
            scalable APIs, and developing custom AI solutions tailored to client
            needs. From creating dynamic interfaces and secure payment systems
            to leveraging AI technologies like MongoDB’s vector search and
            OpenAI API, I’ve continuously refined my skills to deliver impactful
            results. Each project reflects my dedication to learning and my
            drive to create meaningful and efficient solutions.
          </p>
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
                          hover:bg-white hover:shadow-xl
                          hover:shadow-blue-100/50
                          cursor-pointer
                          border border-transparent
                          hover:border-blue-100
                        `}
                      >
                        <motion.h3
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 1 } : {}}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          className="text-xl font-bold text-gray-900"
                        >
                          {exp.position}
                        </motion.h3>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 1 } : {}}
                          transition={{ duration: 0.5, delay: 0.5 }}
                          className="text-blue-500 font-semibold mt-1"
                        >
                          {exp.period}
                        </motion.p>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 1 } : {}}
                          transition={{ duration: 0.5, delay: 0.6 }}
                          className="text-gray-600 mt-3"
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
