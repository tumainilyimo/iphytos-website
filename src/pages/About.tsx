import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  ArrowDown,
  Dna, 
  Network, 
  Microscope,
  FlaskConical,
  Building2,
  LucideIcon,
  Atom,
  Braces,
  Binary,
  Brain,
  Activity,
  HeartPulse,
  Users,
  VenetianMask,
  Workflow,
  Database
} from "lucide-react";
import { cn } from "@/lib/utils";

// Timeline component
interface TimelineItemProps {
  date: string;
  title: string;
  isLast?: boolean;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ date, title, isLast = false, index }) => {
  const isLeft = index % 2 === 1;
  const itemRef = useRef<HTMLDivElement>(null);
  
  return (
    <motion.div 
      ref={itemRef}
      className={`relative flex flex-col md:flex-row items-center ${isLeft ? 'md:flex-row-reverse' : ''} mb-8 md:mb-12`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          delay: index * 0.1
        }
      }}
      viewport={{ 
        once: false,
        margin: "-100px",
        amount: 0.3
      }}
      onViewportLeave={() => {
        if (itemRef.current) {
          itemRef.current.style.opacity = "0";
          itemRef.current.style.transform = `translateY(${isLeft ? '50px' : '-50px'})`;
        }
      }}
    >
      {/* Content */}
      <motion.div 
        className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? 'md:pl-8' : 'md:pr-8'} mb-4 md:mb-0`}
        initial={{ opacity: 0, x: isLeft ? 30 : -30 }}
        whileInView={{ 
          opacity: 1, 
          x: 0,
          transition: {
            duration: 0.7,
            delay: 0.2 + index * 0.1
          }
        }}
        viewport={{ once: false, margin: "-100px" }}
      >
        <motion.div 
          className="bg-white/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
          transition={{ duration: 0.2 }}
        >
          <motion.p 
            className="text-sm font-medium text-primary mb-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            {date}
          </motion.p>
          <motion.h5 
            className="text-base sm:text-lg font-semibold text-primary-dark"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            {title}
          </motion.h5>
        </motion.div>
      </motion.div>

      {/* Center Point - Updated for better mobile display */}
      <div className="relative md:absolute md:left-1/2 md:transform md:-translate-x-1/2 flex items-center justify-center my-4 md:my-0">
        <motion.div 
          className="w-3 h-3 sm:w-4 sm:h-4 bg-primary rounded-full z-10"
          initial={{ scale: 0 }}
          whileInView={{ 
            scale: 1,
            transition: {
              duration: 0.5,
              delay: 0.1 + index * 0.1
            }
          }}
          viewport={{ once: false }}
        >
          <motion.div 
            className="absolute w-full h-full rounded-full bg-primary/30"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        {/* Connecting Line - Only visible on desktop */}
        {!isLast && (
          <motion.div 
            className="hidden md:block absolute top-full left-1/2 transform -translate-x-1/2 h-12 w-0.5 bg-gradient-to-b from-primary/50 to-primary/10"
            initial={{ height: 0 }}
            whileInView={{ height: 48 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          />
        )}
      </div>

      {/* Empty Space for Alternating Layout - Only on desktop */}
      <div className="hidden md:block w-[calc(50%-2rem)]" />
    </motion.div>
  );
};

// Platform card component
interface PlatformCardProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  index: number;
}

const PlatformCard: React.FC<PlatformCardProps> = ({
  title,
  subtitle,
  description,
  features,
  icon: Icon,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-tertiary/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
      <div className="relative">
        <div className="mb-6">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
        <h4 className="text-xl font-semibold text-primary-dark mb-2">{title}</h4>
        <p className="text-sm text-primary mb-4">{subtitle}</p>
        <p className="text-neutral-dark/80 mb-6">{description}</p>
        <ul className="space-y-2 md:space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center text-sm text-neutral-dark/70">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const navigate = useNavigate();
  
  const scrollToHistory = () => {
    historyRef.current?.scrollIntoView({ 
      behavior: "smooth",
      block: "start"
    });
  };

  const handleContactClick = () => {
    navigate('/contact');
  };

  const handleProductsClick = () => {
    navigate('/products');
  };

  // Parallax effect for hero section with improved scaling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const patternY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div className="pt-0" ref={containerRef}>
      {/* Hero Section - Full screen with modern design */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center -mt-16 pt-16">
        {/* Background Image with Parallax */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ scale: heroScale }}
        >
          <img 
            src="/hero/hero-5.webp" 
            alt="iPhytos Research" 
            className="w-full h-full object-cover"
          />
          
          {/* Modern Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/40 via-primary/20 to-primary-dark/60 md:from-primary-dark/50 md:via-primary/30 md:to-primary-dark/80" />
          
          {/* Animated Pattern Overlay */}
          <motion.div 
            className="absolute inset-0 opacity-30"
            style={{ y: patternY }}
          >
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </motion.div>
        </motion.div>
        
        {/* Content Container */}
        <motion.div 
          className="container mx-auto px-4 relative z-10 mt-60"
          style={{ opacity: heroOpacity, y: textY }}
        >
          <motion.div 
            className="max-w-4xl mx-auto text-center text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Decorative Line */}
            <motion.div
              className="w-20 h-0.5 bg-primary mx-auto mb-8"
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 1, delay: 0.2 }}
            />
            
            {/* <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 md:mb-8 leading-tight">
              About <span className="text-primary">iPhytos</span>
            </h1> */}
            
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mb-8 md:mb-12 leading-relaxed max-w-3xl mx-auto">
              Challenging the status quo by thinking differently
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button 
                onClick={scrollToHistory}
                className="group px-8 py-4 bg-white text-primary rounded-full font-medium hover:bg-neutral-lightest transition-all duration-300 flex items-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Our Story 
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button 
                onClick={scrollToHistory}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-medium hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
        
        
      </section>

      {/* Our History & Journey Section */}
      <section ref={historyRef} className="py-8 md:py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-lightest via-white to-neutral-lightest" />
        
        {/* Floating Background Elements */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-tertiary/5 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        <div className="container mx-auto px-4 relative">
          {/* Header Section */}
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark mb-6 md:mb-8">
              Our Story
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-primary-dark mb-6">
              Pioneering the Future of{" "}
              <span className="relative inline-block">
                <span className="text-primary">Natural Medicine</span>
                <motion.span 
                  className="absolute -bottom-2 left-0 w-full h-1 bg-primary/20 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                />
              </span>
            </h3>
          </motion.div>

          {/* History Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
                <div className="space-y-6">
                  <motion.p 
                    className="text-lg text-neutral-dark/80 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    iPhytos is making progress in leveraging in silico driven technologies to design and develop faster, better, safer, and more precise medicines.
                  </motion.p>
                  
                  <motion.p 
                    className="text-neutral-dark/80 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    We are driven by a steadfast belief that the quality of life should never be compromised by age or disease. In a world where non-communicable diseases (NCDs) are on the rise and treatments often fail to improve patients' well-being, we chose to challenge the status quo.
                  </motion.p>

                  <motion.p 
                    className="text-neutral-dark/80 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    By thinking differently and embracing innovation, we set out to create safe, precise, and transformative medicines.
                  </motion.p>
                </div>
                
                {/* Decorative elements */}
                <motion.div
                  className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-8 h-8 sm:w-12 sm:h-12 bg-primary/10 rounded-lg"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute -bottom-6 -right-6 w-16 h-16 bg-tertiary/10 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>

            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl overflow-hidden aspect-[16/12] shadow-2xl max-w-2xl mx-auto"
            >
              <img 
                src="/history.webp" 
                alt="iPhytos Research Lab"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Verdia Platform Section */}
      <section className="py-8 md:py-12 lg:py-16 bg-gradient-to-br from-white via-neutral-50 to-neutral-lightest relative overflow-hidden">
        {/* Animated background particles - Hidden on mobile and reduced on desktop */}
        <div className="hidden md:block">
          {[...Array(15)].map((_, i) => ( // Reduced number of particles
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full will-change-transform"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0], // Reduced movement
                opacity: [0.3, 0.5, 0.3], // Reduced opacity range
                scale: [1, 1.2, 1] // Reduced scale
              }}
              transition={{
                duration: 4 + Math.random() * 2, // Increased duration
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear" // Simplified easing
              }}
            />
          ))}
        </div>

        {/* Large glowing orbs - Hidden on mobile and optimized */}
        <motion.div
          className="hidden md:block absolute top-1/4 -left-20 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/5 rounded-full blur-[100px] will-change-transform"
          animate={{
            scale: [1, 1.1, 1], // Reduced scale
            opacity: [0.2, 0.3, 0.2], // Reduced opacity range
          }}
          transition={{
            duration: 10, // Increased duration
            repeat: Infinity,
            ease: "linear" // Simplified easing
          }}
        />
        <motion.div
          className="hidden md:block absolute bottom-1/4 -right-20 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-tertiary/5 rounded-full blur-[120px] will-change-transform"
          animate={{
            scale: [1, 1.2, 1], // Reduced scale
            opacity: [0.1, 0.2, 0.1], // Reduced opacity range
          }}
          transition={{
            duration: 12, // Increased duration
            repeat: Infinity,
            ease: "linear", // Simplified easing
            delay: 1
          }}
        />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 md:mb-20">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8"
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.3 }}
              >
                <motion.span 
                  className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-primary rounded-full will-change-transform"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.7, 0.5] 
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <span className="text-xs sm:text-sm text-primary font-medium tracking-wide uppercase">Next-Gen Technology</span>
              </motion.div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-dark via-primary to-tertiary mb-4 sm:mb-6 tracking-tight">
                 AI-powered innovation for Next-Generation Phytotherapy
                <span className="relative inline-block">
                  <motion.div 
                    className="absolute -bottom-2 left-0 w-full h-1 will-change-transform"
                    style={{
                      background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
                    }}
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: "100%", opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                  />
                </span>
              </h2>
              <motion.p 
                className="text-base sm:text-lg md:text-xl text-neutral-dark/80 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.3 }}
              >
                Verdia™: Our AI-Powered Innovation Tool for Next-Generation Phytotherapy
              </motion.p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 relative">
            {[
              {
                icon: FlaskConical,
                title: "VerdiaChem42",
                subtitle: "Molecular Intelligence for Drug Discovery",
                description: "Advanced machine learning platform that analyzes, scores, and filters chemical compounds for drug-likeness, ADMET properties, toxicity, and synthetic accessibility. Perfect for exploring both natural products and synthetic leads.",
                features: [
                  "AI-driven compound scoring",
                  "ADMET property prediction",
                  "Toxicity assessment",
                  "Synthetic accessibility analysis",
                  "Drug-likeness evaluation"
                ],
                tagline: "Explore molecules. Predict properties. Accelerate discovery.",
                gradient: "from-green-600/20 to-emerald-400/20"
              },
              {
                icon: Dna,
                title: "VerdiaOmics",
                subtitle: "Network Pharmacology Engine for Systems-Level Insight",
                description: "Advanced platform that maps interactions between compounds, genes, proteins, and disease pathways. Integrates multi-omics data to reveal how natural compounds affect human biology at scale.",
                features: [
                  "Multi-omics integration",
                  "Pathway enrichment analysis",
                  "Network pharmacology mapping",
                  "Target identification",
                  "Mechanism of action insights"
                ],
                tagline: "Reveal mechanisms. Connect targets. Inform decisions.",
                gradient: "from-lime-600/20 to-green-500/20"
              },
              {
                icon: Users,
                title: "VerdiaTrials",
                subtitle: "AI-Powered Clinical Outcome Prediction",
                description: "Sophisticated simulation platform that predicts real-world clinical outcomes using patient data, pathway modulation, and disease progression models. Enables virtual patient stratification and side effect prediction.",
                features: [
                  "Virtual patient stratification",
                  "Side effect prediction",
                  "Efficacy forecasting",
                  "Patient response modeling",
                  "Risk assessment"
                ],
                tagline: "Simulate trials. Predict outcomes. Reduce failure.",
                gradient: "from-teal-600/20 to-emerald-500/20"
              }
            ].map((card, index) => (
              <motion.div
                key={card.title}
                className="group relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-xl will-change-transform" />
                
                <div className="relative h-full bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="mb-6 sm:mb-8 relative">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl sm:rounded-2xl flex items-center justify-center transform group-hover:rotate-3 transition-all duration-300 will-change-transform">
                      <card.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary transform group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <motion.div
                      className={`absolute -inset-4 rounded-3xl bg-gradient-to-r ${card.gradient}`}
                      style={{ opacity: 0.1 }}
                      whileHover={{ opacity: 0.15, scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>

                  <div className="space-y-2 sm:space-y-4 mb-6 sm:mb-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-primary-dark group-hover:text-primary transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-primary/80">
                      {card.subtitle}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-neutral-dark/80 mb-6 sm:mb-8 leading-relaxed group-hover:text-neutral-dark transition-colors duration-300">
                    {card.description}
                  </p>

                  <div className="mb-6 sm:mb-8">
                    <h4 className="text-xs sm:text-sm font-semibold text-primary-dark mb-3 sm:mb-4">Key Capabilities</h4>
                    <ul className="space-y-2">
                      {card.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          className="flex items-center text-xs sm:text-sm text-neutral-dark/70 group-hover:text-neutral-dark/90 transition-colors duration-300"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.2, delay: 0.1 * i }}
                        >
                          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-primary to-tertiary mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 sm:pt-4 border-t border-neutral-200/50">
                    <p className="text-xs sm:text-sm font-medium text-primary">
                      {card.tagline}
                    </p>
                  </div>

                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent will-change-transform"
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Training & Innovation Section */}
      <section className="py-8 md:py-12 lg:py-16 bg-gradient-to-br from-white via-neutral-50 to-white relative overflow-hidden">
        {/* Animated background elements - Hidden on mobile */}
        <div className="absolute inset-0 hidden md:block">
          <motion.div 
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-primary/5 to-tertiary/5 rounded-full blur-[120px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-tertiary/5 to-primary/5 rounded-full blur-[100px]"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-tertiary/10 via-tertiary/5 to-tertiary/10 backdrop-blur-sm px-6 py-3 rounded-full mb-8"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Workflow className="w-5 h-5 text-tertiary" />
                <span className="text-sm text-tertiary font-medium tracking-wide uppercase">Training & Innovation</span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark mb-8">
                Shaping the Future of{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-tertiary">Healthcare Innovation</span>
                  <motion.div 
                    className="absolute -bottom-2 left-0 w-full h-1 bg-tertiary/20"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                  />
                </span>
              </h2>
            </motion.div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Column - Why We Invest */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 sm:p-10 border border-white/20 shadow-xl overflow-hidden">
                  <div className="relative mb-8 -mx-10 -mt-10">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src="/images/training.webp" 
                        alt="Training at iPhytos"
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80" />
                    </div>
                    <div className="absolute bottom-4 left-10">
                      <Users className="w-12 h-12 text-primary drop-shadow-lg" />
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-primary-dark mb-6">
                    Why We Invest in Training
                  </h3>
                  <p className="text-lg text-neutral-dark/80 leading-relaxed">
                    At iPhytos, we believe scientific breakthroughs happen when we challenge conventional thinking. That's why we train scientists to think differently, innovate boldly, and push boundaries in medicine. Our goal is to create the next generation of innovators who will transform healthcare.
                  </p>
                </div>
              </motion.div>

              {/* Right Column - Building Capacity */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 sm:p-10 border border-white/20 shadow-xl overflow-hidden">
                  <div className="relative mb-8 -mx-10 -mt-10">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src="/images/capacity.webp" 
                        alt="Building Capacity at iPhytos"
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80" />
                    </div>
                    <div className="absolute bottom-4 left-10">
                      <Building2 className="w-12 h-12 text-tertiary drop-shadow-lg" />
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-primary-dark mb-6">
                    Building Capacity for the Future
                  </h3>
                  <p className="text-lg text-neutral-dark/80 leading-relaxed">
                    We believe in building capacity in innovative medicine through hands-on training and mentorship. Whether in in silico drug design, natural product research, or precision medicine, our approach fosters deep scientific curiosity and practical expertise.
                  </p>
                </div>

                {/* Decorative Elements */}
                <motion.div
                  className="absolute -top-6 -right-6 w-12 h-12 bg-tertiary/10 rounded-lg"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute -bottom-6 -left-6 w-16 h-16 bg-primary/10 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-8 md:py-12 lg:py-16 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <motion.div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-tertiary/5 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto">
            <motion.div
              className="bg-gradient-to-b from-white to-neutral-50 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 border border-neutral-100 shadow-xl relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Decorative elements */}
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                initial={{ width: "0%" }}
                whileInView={{ width: "50%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
              />
              
              <div className="text-center relative z-10">
                <motion.h2 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-dark mb-6 tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  Join Us in Transforming Healthcare
                </motion.h2>
                <motion.p 
                  className="text-xl text-neutral-dark/80 mb-12 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Discover how our innovative approach to medicine is changing lives and creating a healthier future for all.
                </motion.p>
                <div className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center">
                  <motion.button 
                    onClick={handleContactClick}
                    className="group px-6 sm:px-8 py-3 sm:py-4 md:py-5 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-all duration-300 flex items-center justify-center shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 text-sm sm:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Contact Our Team
                    <motion.span
                      className="inline-block ml-2"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight size={18} />
                    </motion.span>
                  </motion.button>
                  <motion.button 
                    onClick={handleProductsClick}
                    className="group px-6 sm:px-8 py-3 sm:py-4 md:py-5 bg-white text-primary-dark rounded-full font-medium border-2 border-primary/10 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Learn About Our Products
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
