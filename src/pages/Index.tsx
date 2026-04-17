import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from 'react-router-dom';
import Hero from "@/components/Hero";
import About from "@/components/About";
import ProductStory from "@/components/ProductStory";
import MedicinePipeline from "@/components/MedicinePipeline";
import Partners from "@/components/Partners";
import Team from "@/components/Team";
import CollaborativeProjects from "@/components/CollaborativeProjects";
import VideoShowcase from "@/components/VideoShowcase";

const Index = () => {
  // Refs for scroll animations
  const statsRef = useRef<HTMLDivElement>(null);

  // Parallax effect for statistics section
  const { scrollYProgress } = useScroll({
    target: statsRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.98, 1, 1, 0.98]);

  return (
    <div className="w-full overflow-x-hidden">
      <Hero />
      
      <div className="relative z-10 px-4 sm:px-6 mx-auto max-w-[100vw]">
        <About />
      </div>
      
      {/* Medicine Pipeline Section */}
      <div className="mt-[-1rem] sm:mt-[-2rem] md:mt-[-3rem] relative z-20 px-4 sm:px-6 mx-auto max-w-[100vw]">
        <MedicinePipeline />
      </div>

      {/* Video Showcase Section */}
      <div className="relative z-10 px-4 sm:px-6 mx-auto max-w-[100vw]">
        <VideoShowcase />
      </div>
      
      {/* Immersive Product Story Section */}
      <div className="px-4 sm:px-6 mx-auto max-w-[100vw]">
        <ProductStory />
      </div>
      
      {/* Team section with responsive spacing */}
      <div className="mt-[-1rem] sm:mt-[-2rem] md:mt-[-3rem] px-4 sm:px-6 mx-auto max-w-[100vw]">
        <Team />
      </div>
      
      {/* Collaborative Projects section */}
      <div className="px-4 sm:px-6 mx-auto max-w-[100vw]">
        <CollaborativeProjects />
      </div>
      
      {/* Partners section with consistent spacing */}
      <div className="mb-6 sm:mb-8 md:mb-12 px-4 sm:px-6 mx-auto max-w-[100vw]">
        <Partners />
      </div>
      
      <section className="section bg-primary px-4 sm:px-6 w-full">
        <div className="container-fluid mx-auto max-w-[100vw]">
          <div className="bg-white rounded-xl p-6 sm:p-8 md:p-12 shadow-elevated max-w-4xl mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-primary text-xl sm:text-2xl md:text-3xl mb-3 sm:mb-4">Experience the quality of life with our well designed medicines.</h2>
              <p className="text-base sm:text-lg text-gray-600">
                Discover our clinically proven natural medicines and learn how they can improve your health and wellbeing.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link 
                to="/products" 
                className="btn btn-primary w-full sm:w-auto text-center py-2.5 sm:py-3 px-6 sm:px-8"
              >
                Our Products
              </Link>
              <Link 
                to="/contact" 
                className="btn btn-secondary w-full sm:w-auto text-center py-2.5 sm:py-3 px-6 sm:px-8"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
