import { useEffect, useRef, useState, useCallback, lazy, Suspense } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// Lazy load heavy components
const AnimatedBackground = lazy(() => import('./AnimatedBackground'));

const ProductStory = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Optimize scroll handling with useCallback
  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setIsVisible(rect.top < window.innerHeight && rect.bottom > 0);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Use spring for smoother animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [100, -100]),
    { stiffness: 100, damping: 30 }
  );
  
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]),
    { stiffness: 100, damping: 30 }
  );

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen w-full bg-white overflow-hidden"
    >
      {/* Optimized Background */}
      {isVisible && (
        <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-blue-50" />}>
          <AnimatedBackground />
        </Suspense>
      )}

      <div className="relative z-10 container mx-auto px-4 py-20 flex items-center justify-center min-h-screen">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl w-full">
          
          {/* Banner Image */}
          <motion.div 
            className="relative flex items-center justify-center"
            style={{ y, opacity }}
            initial={false}
          >
            <motion.div
              className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img
                src="/products-file/iphyos banner.webp"
                alt="URIPHYTOL-500 Product Banner"
                className="w-full h-full object-cover"
                loading="lazy"
                width={800}
                height={600}
              />
            </motion.div>
          </motion.div>

          {/* Optimized Product Information */}
          <motion.div 
            className="space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="space-y-4">
              <motion.span
                className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs sm:text-sm font-medium tracking-wider uppercase"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5 }}
              >
                Advanced Next Generation Phytotherapy
              </motion.span>
              
              <motion.h1
                className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-blue-600 to-emerald-500 whitespace-nowrap leading-normal py-2"
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.6 }}
              >
                URIPHYTOL-500 mg
              </motion.h1>
            </div>

            <motion.p
              className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8 }}
            >
              A breakthrough in integrative urology, combining AI-driven molecular research with traditional botanical wisdom for advanced prostate care.
            </motion.p>

            {/* Optimized Key Features */}
            <motion.div
              className="grid grid-cols-2 gap-3 sm:gap-6 py-6 sm:py-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 1 }}
            >
              {[
                { 
                  icon: "🔬", 
                  title: "Clinically Studied", 
                  desc: "GMP-certified formulation" 
                },
                { 
                  icon: "🎯", 
                  title: "Fast Acting", 
                  desc: "Multi-target mechanism" 
                },
                { 
                  icon: "🛡️", 
                  title: "Protective Effect", 
                  desc: "Preventive benefits" 
                },
                { 
                  icon: "⚡", 
                  title: "Sexual Function", 
                  desc: "Improves libido and Address erectile dysfunction(ED)" 
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  className="group p-3 sm:p-4 rounded-xl bg-gradient-to-br from-white to-slate-50 shadow-lg border border-slate-100 text-center relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative z-10">
                    <div className="text-xl sm:text-2xl mb-1.5 sm:mb-2">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold text-slate-800 text-sm sm:text-base mb-0.5 sm:mb-1">{feature.title}</h3>
                    <p className="text-slate-600 text-xs sm:text-sm">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Optimized CTA Button */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mt-6 sm:mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1.2 }}
            >
              <motion.button
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white text-sm sm:text-base font-semibold rounded-xl shadow-lg overflow-hidden"
                whileHover={{ 
                  scale: 1.03, 
                  y: -2,
                  boxShadow: "0 15px 30px rgba(52, 211, 153, 0.2)"
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.href = '/products'}
              >
                <span className="relative z-10 flex items-center">
                  Learn More About Mechanism
                  <svg 
                    className="ml-2 w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Simplified Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
};

export default ProductStory;