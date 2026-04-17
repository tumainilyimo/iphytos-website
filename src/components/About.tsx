import { FC, ReactNode, useEffect, useRef, useState, memo, Suspense, lazy } from "react";
import { motion, AnimatePresence, HTMLMotionProps, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Leaf, 
  Microscope, 
  FlaskConical as Flask,
  Dna,
  Binary,
  Building2,
  Brain,
  Atom,
  Laptop,
  Database,
  Network,
  GraduationCap,
  Beaker,
  ScrollText,
  PencilRuler,
  Coffee,
  Pill,
  TestTubes,
  Rabbit,
  TabletSmartphone,
  Syringe,
  MousePointer2,
  ClipboardCheck,
  Rat,
  Users,
  Stethoscope
} from "lucide-react";
import { cn } from "@/lib/utils";
import FeatureCard from "./FeatureCard";

// Types for motion components
type MotionDivProps = HTMLMotionProps<"div">;
type MotionButtonProps = HTMLMotionProps<"button">;
type MotionSpanProps = HTMLMotionProps<"span">;

// Memoized components for better performance
const MemoizedFeatureCard = memo(FeatureCard);

// Optimized motion variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Optimized image loading
const ImageWithLazyLoading = memo(({ src, alt, className, style }: { src: string; alt: string; className?: string; style?: React.CSSProperties }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoading(false);
    };
  }, [src]);
  
  return (
    <div className={cn("relative overflow-hidden", className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" 
               style={{ 
                 backgroundSize: '200% 100%',
                 animation: 'shimmer 2s infinite'
               }} />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          ...style,
          transition: 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), filter 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-700",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
});

// Optimized tab content
const TabContent = memo(({ content, isActive }: { content: ReactNode; isActive: boolean }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className="min-h-[200px] relative"
    >
      {content}
    </motion.div>
  );
});

// Types for tab content
interface TabContentType {
  label: string;
  content: ReactNode;
}

// Platform interface
interface Platform {
  title: string;
  icon: ReactNode;
  description: string;
  bgColor: string;
  features: {
    icon: ReactNode;
    title: string;
    description: string;
    link?: string;
  }[];
}

const About: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [activePlatform, setActivePlatform] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModalContent, setActiveModalContent] = useState<{
    title: string;
    description: string;
    icon: ReactNode;
  } | null>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // Optimize carousel images with preloading
  const carouselImages = [
    {
      src: "/images/about-us1.jpeg",
      alt: "iPhytos Research"
    },
    {
      src: "/images/about-us2.jpeg",
      alt: "iPhytos Laboratory"
    },
  ];

  // Preload next image
  useEffect(() => {
    const nextIndex = (currentImageIndex + 1) % carouselImages.length;
    const img = new Image();
    img.src = carouselImages[nextIndex].src;
  }, [currentImageIndex]);

  // Optimize auto-advance carousel with requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = 0;
    const interval = 5000;

    const animate = (time: number) => {
      if (time - lastTime >= interval) {
        setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
        lastTime = time;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Optimize mouse move effect with throttling
  useEffect(() => {
    let ticking = false;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgRef.current || ticking) return;
      
      ticking = true;
      requestAnimationFrame(() => {
        const { clientX, clientY } = e;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        const moveX = (clientX / windowWidth) - 0.5;
        const moveY = (clientY / windowHeight) - 0.5;
        
        if (bgRef.current) {
          bgRef.current.style.transform = `translate(${moveX * 30}px, ${moveY * 30}px)`;
        }
        ticking = false;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const tabs: TabContentType[] = [
    { 
      label: "Our Mission", 
      content: (
        <div>
          <p className="text-lg text-neutral-dark leading-relaxed mb-8">
            Our mission is to unlock the healing potential of natural products, addressing the root causes of illness through innovative drug discovery. We're creating a future where nature, technology, and science converge to transform global health.
          </p>
          <div className="grid grid-cols-2 gap-4 max-w-lg">
            {[
              { value: "1", label: "Registered Medicine" },
              { value: "3", label: "Clinical Programs" },
              { value: "8", label: "Pre-clinical Programs" },
              { value: "2", label: "Collaborative Projects" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-4 shadow-lg border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.1 * index,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <div className="text-primary font-bold text-2xl">{stat.value}</div>
                <p className="text-neutral-dark text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )
    },
    { 
      label: "Our Vision", 
      content: "We envision a world where medicine works in harmony with the body's natural systems, where treatments are precise, effective, and free from harmful side effects. iPhytos is pioneering this new paradigm in healthcare."
    },
    { 
      label: "Our Values", 
      content: (
        <div className="space-y-8">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg text-neutral-dark/90 italic text-center relative"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-dark to-tertiary font-semibold">
              Our values are the cornerstone of everything we do, shaping our approach to innovation and healthcare.
            </span>
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto relative">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div 
                className="absolute -top-20 -left-20 w-[400px] h-[400px] rounded-full bg-gradient-to-r from-primary/10 to-tertiary/10 blur-[100px]"
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
                className="absolute -bottom-20 -right-20 w-[400px] h-[400px] rounded-full bg-gradient-to-l from-primary/10 to-tertiary/10 blur-[100px]"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </div>

            {/* Customer-Centric Evolution Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group relative"
            >
              <div className="group/card relative min-h-[200px] backdrop-blur-md rounded-2xl border border-white/20 transition-all duration-500 cursor-pointer"
                   onClick={() => handleCardClick(
                     "Customer-Centric Evolution",
                     "Like nature adapting to change, we evolve with our customers' needs. Our agile approach ensures rapid responses to healthcare challenges, creating solutions that grow with your requirements. We believe in continuous improvement and adaptation to serve our customers better.",
                     <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-primary-dark transform rotate-45" />
                   )}>
                {/* Card Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-500" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:12px_12px] opacity-20" />
                
                {/* Content Container */}
                <div className="relative p-6 flex flex-col h-full">
                  {/* Icon Container */}
                  <div className="mb-4">
                    <div className="relative w-12 h-12">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl transform group-hover/card:scale-110 transition-all duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-primary-dark transform rotate-45 group-hover/card:rotate-90 transition-all duration-500" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Text Content */}
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-dark to-primary">
                      Customer-Centric Evolution
                    </h4>
                    <p className="text-neutral-dark/80 text-sm line-clamp-2">
                      Like nature adapting to change, we evolve with our customers' needs, ensuring rapid responses to healthcare challenges.
                    </p>
                    <div className="flex items-center gap-1 text-primary text-sm font-medium mt-2 group-hover/card:translate-x-1 transition-transform">
                      Read More <ArrowRight size={16} className="group-hover/card:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Pioneering Breakthroughs Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative"
            >
              <div className="group/card relative min-h-[200px] backdrop-blur-md rounded-2xl border border-white/20 transition-all duration-500 cursor-pointer"
                   onClick={() => handleCardClick(
                     "Pioneering Breakthroughs",
                     "Merging nature's wisdom with cutting-edge science, we're crafting tomorrow's healthcare solutions today. Our innovative approach transforms traditional medicine into precise, personalized care, setting new standards in medical innovation.",
                     <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-tertiary to-primary-dark transform -rotate-45" />
                   )}>
                {/* Card Background */}
                <div className="absolute inset-0 bg-gradient-to-bl from-white/40 to-white/10" />
                <div className="absolute inset-0 bg-gradient-to-bl from-tertiary/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-500" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:12px_12px] opacity-20" />
                
                {/* Content Container */}
                <div className="relative p-6 flex flex-col h-full">
                  {/* Icon Container */}
                  <div className="mb-4">
                    <div className="relative w-12 h-12">
                      <div className="absolute inset-0 bg-gradient-to-bl from-tertiary/20 to-tertiary/5 rounded-xl transform group-hover/card:scale-110 transition-all duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-tertiary to-primary-dark transform -rotate-45 group-hover/card:-rotate-90 transition-all duration-500" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Text Content */}
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-tertiary to-primary-dark">
                      Pioneering Breakthroughs
                    </h4>
                    <p className="text-neutral-dark/80 text-sm line-clamp-2">
                      Merging nature's wisdom with cutting-edge science to craft tomorrow's healthcare solutions.
                    </p>
                    <div className="flex items-center gap-1 text-primary text-sm font-medium mt-2 group-hover/card:translate-x-1 transition-transform">
                      Read More <ArrowRight size={16} className="group-hover/card:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Trusted Partnership Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group relative sm:col-span-2 lg:col-span-1"
            >
              <div className="group/card relative min-h-[200px] backdrop-blur-md rounded-2xl border border-white/20 transition-all duration-500 cursor-pointer"
                   onClick={() => handleCardClick(
                     "Trusted Partnership",
                     "Building on the foundation of transparency and integrity, we foster lasting partnerships. Every breakthrough, every innovation is guided by our commitment to ethical excellence and reliable results, ensuring trust in all our relationships.",
                     <div className="w-6 h-6 rounded-lg bg-gradient-to-b from-primary-dark to-primary transform rotate-180" />
                   )}>
                {/* Card Background */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-white/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-all duration-500" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:12px_12px] opacity-20" />
                
                {/* Content Container */}
                <div className="relative p-6 flex flex-col h-full">
                  {/* Icon Container */}
                  <div className="mb-4">
                    <div className="relative w-12 h-12">
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/20 to-primary-dark/5 rounded-xl transform group-hover/card:scale-110 transition-all duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-b from-primary-dark to-primary transform rotate-180 group-hover/card:rotate-[360deg] transition-all duration-500" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Text Content */}
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-dark via-primary to-primary-dark">
                      Trusted Partnership
                    </h4>
                    <p className="text-neutral-dark/80 text-sm line-clamp-2">
                      Building lasting partnerships through transparency and integrity in healthcare innovation.
                    </p>
                    <div className="flex items-center gap-1 text-primary text-sm font-medium mt-2 group-hover/card:translate-x-1 transition-transform">
                      Read More <ArrowRight size={16} className="group-hover/card:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )
    }
  ];

  const platforms = [
    {
      title: "In-silico Drug Design",
      icon: <Laptop size={24} />,
      description: "Our VerdiaTM platform combines biophysics and AI to revolutionize drug discovery. Through advanced computational methods, we predict and optimize drug candidates with unprecedented accuracy.",
      bgColor: "from-blue-500/20 to-purple-500/20",
      features: [
        {
          icon: <Flask size={20} />,
          title: "VerdiaChem42",
          description: "Molecular Intelligence platform analyzing compounds for drug-likeness, ADMET properties, toxicity, and synthetic accessibility.",
          link: "/about"
        },
        {
          icon: <Dna size={20} />,
          title: "VerdiaOmics",
          description: "Network Pharmacology Engine mapping interactions between compounds, genes, proteins, and disease pathways.",
          link: "/about"
        },
        {
          icon: <Users size={20} />,
          title: "VerdiaTrials",
          description: "AI-Powered Clinical Outcome Prediction simulating real-world outcomes using patient data and disease models.",
          link: "/about"
        }
      ]
    },
    {
      title: "Pre-clinical Facility",
      icon: <Rat size={24} />,
      description: "At iPhytos\n\nAt iPhytos, we bridge traditional herbal knowledge with rigorous science through advanced preclinical research. Our dedicated facilities are designed to support the full pipeline from natural product discovery to in vivo efficacy and safety testing.",
      bgColor: "from-emerald-500/20 to-green-500/20",
      features: [
        {
          icon: "🧪",
          title: "Natural Products & Medicinal Chemistry Lab",
          description: "Our extraction and compound testing lab focuses on isolating, purifying, and characterizing bioactive compounds from medicinal plants. Using both traditional and modern techniques, we evaluate phytochemical properties, stability, and biological activity to inform product development.",
          highlights: [
            "Phytochemical screening",
            "Compound isolation & purification",
            "In vitro bioassays"
          ]
        },
        {
          icon: "🐁",
          title: "Animal Research Laboratory",
          description: "Our licensed animal facility supports in vivo testing to assess the pharmacological effects, pharmacokinetics, and safety of herbal formulations. We follow strict ethical and regulatory guidelines in all preclinical studies.",
          highlights: [
            "Pharmacokinetics & toxicity profiling",
            "Efficacy studies in disease models",
            "Dose optimization & safety assessment"
          ]
        },
        {
          icon: "💊",
          title: "Product Development Lab",
          description: "We translate active compounds into real-world formulations. Our formulation scientists work on creating stable, effective, and safe herbal medicines, guided by scientific validation and patient needs.",
          highlights: [
            "Capsule, tablet, syrup, and ointment formulation",
            "Stability and shelf-life testing",
            "Pilot batch production for clinical readiness"
          ]
        },
        {
          icon: "🔬",
          title: "Natural Product Analysis & Quality Assurance",
          description: "At iPhytos, our Analytical & Quality Control Unit ensures the integrity, safety, and efficacy of every formulation.",
          highlights: []
        }
      ]
    },
    {
      title: "Clinical Facility",
      icon: <Stethoscope size={24} />,
      description: "A modern clinical research facility dedicated to conducting safe and efficient human trials of our innovative treatments.",
      bgColor: "from-orange-500/20 to-red-500/20",
      features: [
        {
          icon: <Database size={20} />,
          title: "Data-Driven Trials",
          description: "Comprehensive clinical trials supported by advanced analytics."
        },
        {
          icon: <Users size={20} />,
          title: "Patient Monitoring",
          description: "State-of-the-art patient monitoring and data collection systems."
        },
        {
          icon: <Brain size={20} />,
          title: "Precision Medicine",
          description: "Tailoring treatments to individual patient profiles."
        }
      ]
    },
    {
      title: "Production Facility",
      icon: <Pill size={24} />,
      description: "Our cutting-edge production facility ensures the highest quality standards in manufacturing precision-formulated medicines.",
      bgColor: "from-purple-500/20 to-pink-500/20",
      features: [
        {
          icon: <Atom size={20} />,
          title: "Precision Formulation",
          description: "Creating targeted formulations for optimal drug delivery and efficacy."
        },
        {
          icon: <Binary size={20} />,
          title: "Quality Control",
          description: "Rigorous quality assurance processes at every production stage."
        },
        {
          icon: <Pill size={20} />,
          title: "Scale Optimization",
          description: "Efficient scaling of production while maintaining precise quality standards."
        }
      ]
    }
  ];

  // Modal component
  const Modal = ({ isOpen, onClose, content }: {
    isOpen: boolean;
    onClose: () => void;
    content: {
      title: string;
      description: string;
      icon: ReactNode;
    } | null;
  }) => {
    if (!content) return null;

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ 
                duration: 0.2,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-xl bg-primary/10">
                    {content.icon}
                  </div>
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-dark to-primary">
                    {content.title}
                  </h3>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <p className="text-neutral-dark leading-relaxed">
                  {content.description}
                </p>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-100 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Replace the tooltip sections with click handlers
  const handleCardClick = (title: string, description: string, icon: ReactNode) => {
    setActiveModalContent({ title, description, icon });
    setIsModalOpen(true);
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-neutral-lightest to-white">
      <ShimmerStyle />
      {/* Background elements with will-change for better performance */}
      <div 
        ref={bgRef} 
        className="absolute inset-0 pointer-events-none overflow-hidden will-change-transform"
      >
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-tertiary/5 blur-3xl opacity-70" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDYwaDYwVjBoLTYweiIvPjxwYXRoIGQ9Ik0zMCAwdjYwIiBzdHJva2U9InJnYmEoMCwwLDAsMC4wMikiIHN0cm9rZS1saW5lY2FwPSJzcXVhcmUiLz48cGF0aCBkPSJNMCAzMGg2MCIgc3Ryb2tlPSJyZ2JhKDAsMCwwLDAuMDIpIiBzdHJva2UtbGluZWNhcD0ic3F1YXJlIi8+PC9nPjwvc3ZnPg==')] opacity-40" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header with optimized animations */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="text-center max-w-4xl mx-auto mb-12 md:mb-20 px-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 text-primary text-sm sm:text-base mb-4 sm:mb-6"
          >
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-pulse" />
            About iPhytos
          </motion.div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-dark mb-3 sm:mb-4 md:mb-6 leading-tight">
            Pioneering Next-Generation{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-primary">Phytotherapy</span>
              <motion.svg
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute -bottom-0.5 sm:-bottom-1 left-0 w-full"
                width="100%"
                height="8"
                viewBox="0 0 100 8"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M0,4 C30,4 70,4 100,4"
                  fill="none"
                  stroke="currentColor"
                  className="text-primary/30"
                  strokeWidth="3"
                />
              </motion.svg>
            </span>
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-neutral-dark/80 leading-relaxed max-w-3xl mx-auto px-4">
          At iPhytos, we are a pioneering biotech company at the intersection of nature and cutting-edge science  developing innovative solutions for complex health challenges. We bridge traditional wisdom with modern science to deliver next-generation precision phytotherapy for a better quality of life.
          </p>
        </motion.div>
        
        {/* Main content with optimized image loading */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 xl:gap-16 items-start mb-12 sm:mb-16 md:mb-20 lg:mb-24 px-4 max-w-[1920px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="relative w-full"
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl lg:shadow-2xl group aspect-[4/3] w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full"
                >
                  <ImageWithLazyLoading
                    src={carouselImages[currentImageIndex].src}
                    alt={carouselImages[currentImageIndex].alt}
                    className="w-full h-full transform group-hover:scale-105 group-hover:brightness-95"
                    style={{ 
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/50 via-primary-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Navigation dots */}
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex 
                        ? "bg-white scale-125" 
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Navigation arrows - Hidden on mobile, shown on hover for larger screens */}
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)}
                className="hidden sm:block absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/30"
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)}
                className="hidden sm:block absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/30"
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 sm:-bottom-8 sm:-right-8 w-20 h-20 sm:w-40 sm:h-40 bg-primary/10 rounded-full blur-2xl sm:blur-3xl" />
            <div className="absolute -top-4 -left-4 sm:-top-8 sm:-left-8 w-20 h-20 sm:w-40 sm:h-40 bg-tertiary/10 rounded-full blur-2xl sm:blur-3xl" />
          </motion.div>
          
          {/* Right column with optimized tab content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="relative w-full"
          >
            <div className="backdrop-blur-xl bg-white/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl lg:shadow-2xl border border-white/20 relative overflow-hidden">
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-tertiary/5 pointer-events-none" />
              
              {/* Tab navigation - Compact and responsive */}
              <div className="flex justify-center items-center gap-1 sm:gap-2 mb-6 sm:mb-8">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    className={cn(
                      "relative min-w-0 px-2.5 sm:px-4 py-2 rounded-lg font-medium transition-all duration-300",
                      "text-xs sm:text-sm md:text-base",
                      activeTab === index 
                        ? "text-white" 
                        : "text-neutral-dark/60 hover:text-primary"
                    )}
                    onClick={() => setActiveTab(index)}
                  >
                    {activeTab === index && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark rounded-lg"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 whitespace-nowrap">{tab.label}</span>
                  </button>
                ))}
              </div>
              
              <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center">Loading...</div>}>
                <TabContent
                  content={tabs[activeTab].content}
                  isActive={true}
                />
              </Suspense>
              
              {/* Call to action */}
              <motion.div
                className="mt-6 sm:mt-8"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link to="/about">
                  <motion.button 
                    className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium transition-all duration-300 hover:shadow-xl hover:scale-[1.02] text-sm sm:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center gap-2 sm:gap-3">
                      Learn More About Us 
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Platforms Section with optimized animations */}
        <div className="mt-12 sm:mt-16 md:mt-20 lg:mt-24 px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 text-primary text-sm sm:text-base mb-4 sm:mb-6"
            >
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary animate-pulse" />
              Our Platform
            </motion.div>
            <h4 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-dark mb-4 sm:mb-6">
            Our Advanced Platforms for <span className="text-primary">Next-Generation Phytotherapy</span>
            </h4>
            <p className="text-base sm:text-lg text-neutral-dark/80 leading-relaxed px-4">
            Our cutting-edge platforms bridge traditional wisdom with advanced science to create safe, effective, and personalized herbal therapeutics for today's health challenges.
            </p>
          </motion.div>

          {/* Platform Navigation - Compact grid layout */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-2 mb-8 sm:mb-12">
            {platforms.map((platform, index) => (
              <motion.button
                key={index}
                className={cn(
                  "group relative px-3 sm:px-4 py-2 sm:py-3 rounded-xl font-medium transition-all duration-500 flex items-center gap-2",
                  "before:absolute before:inset-0 before:rounded-xl before:transition-all before:duration-500",
                  "text-xs sm:text-sm md:text-base w-full sm:w-auto",
                  activePlatform === index
                    ? "text-white before:bg-gradient-to-r before:from-primary before:to-primary-dark before:opacity-100 before:shadow-lg"
                    : "text-neutral-dark hover:text-primary before:bg-white/80 before:opacity-70 hover:before:opacity-100"
                )}
                onClick={() => setActivePlatform(index)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <span className="relative flex items-center gap-1.5 sm:gap-2 justify-center sm:justify-start w-full">
                  <span className={cn(
                    "p-1.5 rounded-lg transition-colors duration-500",
                    activePlatform === index
                      ? "bg-white/20 text-white"
                      : "bg-primary/10 text-primary group-hover:bg-primary/20"
                  )}>
                    {platform.icon}
                  </span>
                  <span className="relative">{platform.title}</span>
                </span>
              </motion.button>
            ))}
          </div>

          {/* Platform Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePlatform}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="relative backdrop-blur-xl bg-white/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-xl lg:shadow-2xl border border-white/20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                  {platforms[activePlatform].features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group relative backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/20 hover:border-primary/20 transition-all duration-300"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex-none w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                          {feature.icon}
                        </div>
                        <h5 className="text-base sm:text-lg font-semibold text-primary-dark">{feature.title}</h5>
                      </div>
                      <p className="text-sm sm:text-base text-neutral-dark/80 mb-4">
                        {feature.description}
                      </p>
                      {feature.highlights && feature.highlights.length > 0 && (
                        <ul className="space-y-2">
                          {feature.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-neutral-dark/70">
                              <span className="flex-none w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {feature.link && (
                        <div className="mt-4">
                          <a
                            href={feature.link}
                            className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-dark transition-colors"
                          >
                            Learn more
                            <ArrowRight size={16} />
                          </a>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Add Modal component */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={activeModalContent}
      />
    </section>
  );
};

// Add shimmer animation keyframes for loading effect
const shimmerAnimation = `
  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

// Add this before the About component
const ShimmerStyle = () => (
  <style>{shimmerAnimation}</style>
);

// Add SEO metadata
export const Head = () => (
  <>
    <title>About iPhytos - Pioneering Biotech Solutions</title>
    <meta name="description" content="iPhytos is a pioneering biotech company at the intersection of nature and cutting-edge science, developing innovative solutions for complex health challenges." />
    <meta name="keywords" content="biotech, healthcare, drug discovery, natural products, medical research" />
    <meta property="og:title" content="About iPhytos - Pioneering Biotech Solutions" />
    <meta property="og:description" content="iPhytos is a pioneering biotech company at the intersection of nature and cutting-edge science, developing innovative solutions for complex health challenges." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="About iPhytos - Pioneering Biotech Solutions" />
    <meta name="twitter:description" content="iPhytos is a pioneering biotech company at the intersection of nature and cutting-edge science, developing innovative solutions for complex health challenges." />
  </>
);

export default memo(About);
