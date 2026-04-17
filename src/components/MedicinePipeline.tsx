import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import styles from '../styles/MedicinePipeline.module.css';
import { PharmaBackground } from './animations/PharmaBackground';
import { useInView } from 'react-intersection-observer';
import { throttle } from 'lodash';

// Pipeline stages with their descriptions
const pipelineStages = [
  { 
    id: "discovery", 
    label: "Discovery", 
    description: "Initial research and identification of potential compounds",
    phases: ["Hit-to-Lead", "Lead Opt."]
  },
  { 
    id: "preclinical", 
    label: "Pre-Clinical", 
    description: "Laboratory and animal testing",
    phases: ["IND-enabling"]
  },
  { 
    id: "clinical", 
    label: "Clinical", 
    description: "Human trials and safety studies",
    phases: ["Phase I", "Phase II", "Phase III"]
  },
  { 
    id: "registered", 
    label: "Registered", 
    description: "Approved and available for use",
    phases: ["NDA/BLA", "Market"]
  }
];

// Pipeline data for each condition
const pipelineData = [
  { 
    condition: "Prostate Disorder",
    progress: 95,
    color: "#00C851",
    description: "Pioneering targeted therapies that improve men's health by addressing the root causes of prostate disorders"
  },
  { 
    condition: "Hypertension",
    progress: 45,
    color: "#3498DB",
    description: "Going beyond symptom control, targeting root causes with precision for personalized, effective, and sustainable blood pressure management"
  },
  { 
    condition: "Diabetes",
    progress: 75,
    color: "#00C851",
    description: "Challenging conventional treatments with core-focused medicines for long-term diabetes control"
  },
  { 
    condition: "Prostate & Breast Cancer",
    progress: 65,
    color: "#3498DB",
    description: "Developing precision-driven, patient-focused therapies that disrupt cancer's progression while preserving quality of life"
  },
  { 
    condition: "HIV",
    progress: 55,
    color: "#00C851",
    description: "Developing treatments that enhance immunity and improve quality of life, redefining HIV management"
  },
  { 
    condition: "Fibroids",
    progress: 72,
    color: "#3498DB",
    description: "Innovative, non-invasive solutions for fibroid treatment, ensuring care that is both effective and natural"
  },
  { 
    condition: "Peptic Ulcer Disease",
    progress: 70,
    color: "#00C851",
    description: "Rethinking gastrointestinal health with treatments that heal, protect, and restore through a science-driven approach"
  },
  { 
    condition: "Haemorrhoids",
    progress: 25,
    color: "#3498DB",
    description: "Providing effective, non-invasive relief through innovative, targeted solutions that reduce discomfort and promote healing"
  }
];

// Enhanced pipeline data with more detailed information
const enhancedPipelineData = pipelineData.map(item => ({
  ...item,
  icon: {
    "Prostate Disorder": "👨‍⚕️", // Doctor for prostate treatment
    "Hypertension": "🫀", // Heart for blood pressure
    "Diabetes": "💉", // Syringe for diabetes treatment
    "Prostate & Breast Cancer": "🎗️", // Awareness ribbon for cancer
    "HIV": "🧬", // DNA for immune system
    "Fibroids": "👩‍⚕️", // Female doctor for women's health
    "Peptic Ulcer Disease": "🫁", // Internal organ for digestive system
    "Haemorrhoids": "🏥" // Hospital for treatment
  }[item.condition] || "💊",
  targetId: {
    "Prostate Disorder": "PRO-01",
    "Hypertension": "HYP-02",
    "Diabetes": "DIA-03",
    "Prostate & Breast Cancer": "CAN-04",
    "HIV": "HIV-05",
    "Fibroids": "FIB-06",
    "Peptic Ulcer Disease": "PUD-07",
    "Haemorrhoids": "HEM-08"
  }[item.condition],
  region: {
    "Prostate Disorder": "Africa",
    "Hypertension": "Africa",
    "Diabetes": "Africa",
    "Prostate & Breast Cancer": "Africa",
    "HIV": "Africa",
    "Fibroids": "Africa",
    "Peptic Ulcer Disease": "Africa",
    "Haemorrhoids": "Africa"
  }[item.condition],
  phase: Math.floor((item.progress / 100) * 7) + 1,
  status: item.progress > 80 ? "Late Stage" : 
          item.progress > 50 ? "Mid Stage" : 
          item.progress > 30 ? "Early Stage" : "Discovery"
}));

const MedicinePipeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Only use scroll handling for desktop
  const handleScroll = useCallback(
    throttle(() => {
      if (!isMobile && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight && rect.bottom > 0);
      }
    }, 100),
    [isMobile]
  );

  useEffect(() => {
    if (!isMobile) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        handleScroll.cancel();
      };
    }
  }, [handleScroll, isMobile]);

  // Only use IntersectionObserver for desktop
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '0px',
    skip: isMobile
  });

  // Only use scroll animations on desktop
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [100, -100],
    { clamp: true }
  );
  
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0],
    { clamp: true }
  );

  // Mobile styles
  const mobileStyles = {
    opacity: 1,
    y: 0
  };

  // Desktop styles
  const desktopStyles = {
    opacity: inView ? opacity : 0,
    y: inView ? y : 100,
    willChange: 'transform, opacity'
  };

  // Use appropriate styles based on device
  const styles = isMobile ? mobileStyles : desktopStyles;

  // Simple progress bar component
  const ProgressBar = useCallback(({ progress }: { progress: number }) => {
    // Function to determine color based on the current phase
    const getPhaseColor = (progress: number) => {
      // Determine which phase we're in based on progress
      if (progress >= 80) return '#145A32'; // Phase II - Bright green
      if (progress >= 60) return '#1E8449'; // Phase I - Slightly paler green
      if (progress >= 40) return '#27AE60'; // IND-enabling - More pale green
      if (progress >= 20) return '#00C851'; // Lead Opt. - Even paler green
      return '#2ECC71'; // Hit-to-Lead - Most pale green
    };

    if (isMobile) {
      return (
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full transition-all duration-300"
            style={{ 
              width: `${progress}%`,
              backgroundColor: getPhaseColor(progress)
            }}
          />
        </div>
      );
    }

    return (
      <div className="relative">
        <div className="flex justify-between text-[10px] sm:text-xs text-gray-500 mb-1.5 sm:mb-2">
          {["Hit-to-Lead", "Lead Opt.", "IND-enabling", "Phase I", "Phase II"].map((phase) => (
            <span key={phase} className="w-1/5 text-center hidden sm:block">{phase}</span>
          ))}
        </div>
        <div className="h-2 sm:h-3 bg-gray-100 rounded-full overflow-hidden flex">
          {["Hit-to-Lead", "Lead Opt.", "IND-enabling", "Phase I", "Phase II"].map((phase, idx) => {
            const phaseProgress = Math.min(Math.max((progress - (idx * 20)) / 20, 0), 1);
            const currentPhaseColor = getPhaseColor(idx * 20);
            return (
              <div key={phase} className="w-1/5 h-full relative">
                <motion.div
                  className="absolute top-0 left-0 h-full transition-all duration-300"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${phaseProgress * 100}%` }}
                  transition={{ duration: 0.5 }}
                  style={{ 
                    backgroundColor: currentPhaseColor
                  }}
                />
                <div className="absolute top-0 right-0 w-px h-full bg-white/50" />
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [isMobile]);

  return (
    <section 
      ref={containerRef} 
      className="relative py-8 sm:py-16 md:py-24 bg-white overflow-hidden"
      aria-label="Medicine Development Pipeline"
    >
      {/* Modern pharmaceutical background - only show on desktop */}
      {!isMobile && (
        <div className="lazy-load">
          <PharmaBackground className="z-0" />
        </div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        {isMobile ? (
          <div className="text-center mb-8 sm:mb-16">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 text-primary text-sm sm:text-base mb-4 sm:mb-6">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary" />
              Research & Development Pipeline
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-dark mb-4 sm:mb-6 leading-tight">
              Wholly Owned Drug Development
              <span className="relative ml-2 sm:ml-3">
                <span className="relative z-10 text-primary">Pipeline</span>
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
              At iPhytos, we challenge the status quo in drug development. We think differently, designing precision and personalized medicines that put patients first.
            </p>
          </div>
        ) : (
          <motion.div 
            className="text-center mb-8 sm:mb-16"
            style={styles}
            ref={ref}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "0px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 text-primary text-sm sm:text-base mb-4 sm:mb-6"
            >
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-pulse" />
              Research & Development Pipeline
            </motion.div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-dark mb-4 sm:mb-6 leading-tight">
              Wholly Owned Drug Development
              <span className="relative ml-2 sm:ml-3">
                <span className="relative z-10 text-primary">Pipeline</span>
                <motion.svg
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute -bottom-1 sm:-bottom-2 left-0 w-full"
                  width="100%"
                  height="10"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M0,5 C30,5 70,5 100,5"
                    fill="none"
                    stroke="currentColor"
                    className="text-primary/30"
                    strokeWidth="4"
                  />
                </motion.svg>
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-4">
              At iPhytos, we challenge the status quo in drug development. We think differently, designing precision and personalized medicines that put patients first. By harnessing cutting-edge in silico technology and natural product innovation, we are redefining the treatment of complex diseases.
            </p>
          </motion.div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-16 mt-12 sm:mt-6">
          {[
            { 
              label: "Discovery Programs", 
              value: 20, 
              color: "#00C851"
            },
            { 
              label: "Pre-Clinical Programs", 
              value: 8, 
              color: "#3498DB"
            },
            { 
              label: "Clinical Programs", 
              value: 3, 
              color: "#2ECC71"
            },
            { 
              label: "Registered Products", 
              value: 1, 
              color: "#00C851"
            }
          ].map((stat, i) => (
            isMobile ? (
              <div
                key={i}
                className="relative bg-white rounded-lg sm:rounded-xl p-3 md:p-6 shadow-sm border border-gray-100"
              >
                <div className="flex flex-col items-start space-y-1 md:space-y-2">
                  <span 
                    className="block text-xl sm:text-2xl md:text-4xl font-bold"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </span>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium leading-tight">
                    {stat.label}
                  </p>
                </div>
              </div>
            ) : (
              <motion.div
                key={i}
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ willChange: 'transform, opacity' }}
              >
                <div className="relative bg-white rounded-lg sm:rounded-xl p-3 md:p-6 shadow-sm hover:shadow-md transition-all duration-500 border border-gray-100">
                  <div className="flex flex-col items-start space-y-1 md:space-y-2">
                    <span 
                      className="block text-xl sm:text-2xl md:text-4xl font-bold"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </span>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium leading-tight">
                      {stat.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </div>

        {/* Pipeline List */}
        <div className="relative space-y-4 sm:space-y-6 max-w-5xl mx-auto">
          {enhancedPipelineData.map((item, index) => (
            isMobile ? (
              <div
                key={item.condition}
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 sm:p-4 md:p-6"
              >
                <div className="flex flex-col space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                      <span className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium bg-[#00C851]/10 text-[#00C851] border border-[#00C851]/20">
                        {item.targetId}
                      </span>
                      <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">{item.condition}</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#00C851]/10 text-[#00C851] border border-[#00C851]/20">
                        {item.status}
                      </span>
                    </div>
                  </div>

                  <ProgressBar progress={item.progress} />

                  <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">{item.description}</p>
                </div>
              </div>
            ) : (
              <motion.div
                key={item.condition}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{ willChange: 'transform, opacity' }}
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 sm:p-4 md:p-6 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex flex-col space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                      <span className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium bg-[#00C851]/10 text-[#00C851] border border-[#00C851]/20">
                        {item.targetId}
                      </span>
                      <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900">{item.condition}</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#00C851]/10 text-[#00C851] border border-[#00C851]/20">
                        {item.status}
                      </span>
                    </div>
                  </div>

                  <ProgressBar progress={item.progress} />

                  <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">{item.description}</p>
                </div>
              </motion.div>
            )
          ))}
        </div>

        {/* Inspirational Message */}
        {isMobile ? (
          <div className="mt-8 sm:mt-12 mb-6 sm:mb-8 text-center max-w-3xl mx-auto px-4">
            <div className="relative">
              <div className="absolute -left-4 sm:-left-8 -top-4 sm:-top-8 w-12 sm:w-16 h-12 sm:h-16 text-[#00C851]/10 text-4xl sm:text-6xl">
                "
              </div>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed italic">
                At iPhytos, we believe in a future where medicine is smarter, treatments are tailored, and patients are truly cared for.
              </p>
              <div className="absolute -right-2 sm:-right-4 -bottom-4 sm:-bottom-8 w-12 sm:w-16 h-12 sm:h-16 text-[#3498DB]/10 text-4xl sm:text-6xl">
                "
              </div>
            </div>
            <div className="mt-4 sm:mt-6 h-0.5 w-16 sm:w-24 mx-auto bg-gradient-to-r from-[#00C851] to-[#3498DB]" />
          </div>
        ) : (
          <motion.div 
            className="mt-8 sm:mt-12 mb-6 sm:mb-8 text-center max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ willChange: 'transform, opacity' }}
          >
            <div className="relative">
              <motion.div
                className="absolute -left-4 sm:-left-8 -top-4 sm:-top-8 w-12 sm:w-16 h-12 sm:h-16 text-[#00C851]/10 text-4xl sm:text-6xl"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                "
              </motion.div>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed italic">
                At iPhytos, we believe in a future where medicine is smarter, treatments are tailored, and patients are truly cared for. Join us as we shape the next era of healthcare.
              </p>
              <motion.div
                className="absolute -right-2 sm:-right-4 -bottom-4 sm:-bottom-8 w-12 sm:w-16 h-12 sm:h-16 text-[#3498DB]/10 text-4xl sm:text-6xl"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                "
              </motion.div>
            </div>
            <motion.div 
              className="mt-4 sm:mt-6 h-0.5 w-16 sm:w-24 mx-auto bg-gradient-to-r from-[#00C851] to-[#3498DB]"
              initial={{ width: 0 }}
              whileInView={{ width: "6rem" }}
              transition={{ delay: 0.8 }}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default MedicinePipeline;