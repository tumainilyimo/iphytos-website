import { useEffect, useRef, useState, useCallback, useMemo, memo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { events } from "@/data/events";
import { slides } from "@/data/slides";
import ResponsiveImage from "./ResponsiveImage";

// Memoized background pattern component
const GeometricBackground = () => (
  <div className="absolute inset-0 bg-slate-900 will-change-transform">
    <div
      className="absolute inset-0 opacity-30"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%23475569' stroke-width='0.5' stroke-opacity='0.3'%3E%3Cpath d='M60 60m-58 0a58,58 0 1,1 116,0a58,58 0 1,1 -116,0'/%3E%3Cpath d='M60 60L0 0M60 60L120 0M60 60L0 120M60 60L120 120'/%3E%3Cpath d='M0 60l120 0M60 0l0 120'/%3E%3C/g%3E%3Cg fill='%2360a5fa' fill-opacity='0.4'%3E%3Ccircle cx='60' cy='60' r='1.5'/%3E%3Ccircle cx='0' cy='0' r='1'/%3E%3Ccircle cx='120' cy='0' r='1'/%3E%3Ccircle cx='0' cy='120' r='1'/%3E%3Ccircle cx='120' cy='120' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        willChange: 'transform',
      }}
    />
  </div>
);

// Memoized slide component for better performance
const Slide = memo(({ slide, isActive }: { slide: typeof slides[0], isActive: boolean }) => {
  if (!isActive) return null;
  
  return (
    <div className="absolute inset-0">
      <ResponsiveImage 
        src={slide.image}
        alt={slide.title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        sizes="100vw"
        onError={(e) => {
          console.error(`Error loading image: ${slide.image}`);
          console.error(e);
        }}
      />
      <div className="absolute inset-0 bg-slate-900/60" />
    </div>
  );
});

const Hero = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isEventsPanelOpen, setIsEventsPanelOpen] = useState(false);
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();
  const slideIntervalRef = useRef<NodeJS.Timeout>();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  // Memoized CSS variable for hero text position
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--hero-offset', isMobile ? '25rem' : '12rem');
  }, [isMobile]);
  
  // Optimized scroll handling with debounce and RAF
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!content) return;
          const scrollTop = window.scrollY;
          const opacity = Math.max(0.3, 1 - scrollTop / 800);
          content.style.opacity = opacity.toString();
          content.style.transform = `translateY(${Math.min(scrollTop * 0.3, 100)}px)`;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Optimized slide interval with cleanup and pause on hover
  useEffect(() => {
    if (prefersReducedMotion) return;

    const startInterval = () => {
      slideIntervalRef.current = setInterval(handleNextSlide, 7000);
    };

    const pauseInterval = () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }
    };

    startInterval();

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mouseenter', pauseInterval);
      container.addEventListener('mouseleave', startInterval);
    }

    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }
      if (container) {
        container.removeEventListener('mouseenter', pauseInterval);
        container.removeEventListener('mouseleave', startInterval);
      }
    };
  }, [prefersReducedMotion]);
  
  // Memoized handlers
  const handleDotClick = useCallback((index: number) => {
    setActiveSlide(index);
  }, []);
  
  const handlePrevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);
  
  const handleNextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  // Memoized animation variants
  const slideVariants = useMemo(() => ({
    enter: { opacity: 0, y: prefersReducedMotion ? 0 : 50 },
    center: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: prefersReducedMotion ? 0 : -50 }
  }), [prefersReducedMotion]);

  // Memoized filtered events
  const upcomingEvents = useMemo(() => 
    events.filter(event => event.type === 'upcoming'),
    []
  );

  const ongoingEvents = useMemo(() => 
    events.filter(event => event.type === 'ongoing'),
    []
  );

  const latestEvents = useMemo(() => 
    events.filter(event => event.type === 'latest'),
    []
  );

  return (
    <div 
      className="min-h-screen relative bg-slate-900" 
      ref={containerRef}
      role="banner"
      aria-label="Hero section"
    >
      {/* Slide Background Images with optimized loading */}
      <div className="absolute inset-0 overflow-hidden">
        {slides.map((slide, index) => (
          <Slide 
            key={slide.id} 
            slide={slide} 
            isActive={activeSlide === index} 
          />
        ))}
        {/* Dark gradient overlay for better text readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-900/95 via-slate-900/70 to-transparent pointer-events-none"></div>
      </div>
      
      {/* Main Hero Section with optimized animations */}
      <main className="relative z-10 min-h-screen flex items-center">
        {/* Desktop Events Panel */}
        <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-1/4 bg-white/10 backdrop-blur-md overflow-hidden shadow-2xl z-20">
          <div className="h-full overflow-y-auto pb-20 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:backdrop-blur-md [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
            {/* Section header with improved spacing */}
            <div className="py-3 px-4 border-b border-white/20">
              <h3 className="text-white font-medium text-lg mb-2">Upcoming Events</h3>
            </div>
            <div className="p-4 space-y-4">
              {upcomingEvents.map((event) => (
                <button 
                  key={event.id} 
                  className="w-full text-left border-b border-gray-200/20 p-3 hover:bg-white/5 rounded-lg transition-all duration-200 group"
                  onClick={() => navigate('/news')}
                >
                  <div className="text-xs text-blue-200 mb-1 group-hover:text-blue-100 transition-colors">{event.date} {event.year}</div>
                  <h4 className="text-white text-sm font-medium group-hover:text-blue-200 transition-colors">{event.title}</h4>
                  <p className="text-xs text-gray-300 mt-1 group-hover:text-gray-200 transition-colors">{event.description}</p>
                </button>
              ))}
            </div>

            {/* Ongoing Events */}
            <div className="py-3 px-4 border-b border-white/20">
              <h3 className="text-white font-medium text-lg mb-2">Ongoing Events</h3>
            </div>
            <div className="p-4 space-y-4">
              {ongoingEvents.map((event) => (
                <button 
                  key={event.id} 
                  className="w-full text-left border-b border-gray-200/20 p-3 hover:bg-white/5 rounded-lg transition-all duration-200 group"
                  onClick={() => event.slug && navigate(`/news/${event.slug}`)}
                >
                  <div className="text-xs text-blue-200 mb-1 group-hover:text-blue-100 transition-colors">{event.date} {event.year}</div>
                  <h4 className="text-white text-sm font-medium group-hover:text-blue-200 transition-colors">{event.title}</h4>
                  <p className="text-xs text-gray-300 mt-1 group-hover:text-gray-200 transition-colors">{event.description}</p>
                </button>
              ))}
            </div>

            {/* Latest Events */}
            <div className="py-3 px-4 border-b border-white/20">
              <h3 className="text-white font-medium text-lg mb-2">Latest Events</h3>
            </div>
            <div className="p-4 space-y-4">
              {latestEvents.map((event) => (
                <button 
                  key={event.id} 
                  className="w-full text-left border-b border-gray-200/20 p-3 hover:bg-white/5 rounded-lg transition-all duration-200 group"
                  onClick={() => navigate('/news')}
                >
                  <div className="text-xs text-blue-200 mb-1 group-hover:text-blue-100 transition-colors">{event.date} {event.year}</div>
                  <h4 className="text-white text-sm font-medium group-hover:text-blue-200 transition-colors">{event.title}</h4>
                  <p className="text-xs text-gray-300 mt-1 group-hover:text-gray-200 transition-colors">{event.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Discover All Events Button - Fixed at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-900/80 to-transparent">
            <motion.button 
              onClick={() => navigate('/news')}
              className="group relative w-full px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg overflow-hidden"
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: "0 15px 30px rgba(52, 211, 153, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)',
                  backgroundSize: '8px 8px'
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <span className="relative z-10 flex items-center justify-center">
                DISCOVER ALL EVENTS
                <ArrowRight className="ml-2 w-4 h-4" />
              </span>
            </motion.button>
          </div>
        </div>

        {/* Mobile Events Panel */}
        <motion.div 
          className={`${
            isEventsPanelOpen ? 'fixed top-[72px] inset-x-0 bottom-0' : 'hidden'
          } lg:hidden w-full bg-white/10 backdrop-blur-md overflow-hidden shadow-2xl z-20`}
          initial={{ opacity: 0, y: "100%" }}
          animate={{ 
            opacity: 1, 
            y: isEventsPanelOpen ? "0%" : "100%"
          }}
          transition={{ type: "spring", damping: 25, stiffness: 120 }}
        >
          {/* Header */}
          <div className="sticky top-0 right-0 py-3 px-4 z-10 flex justify-between items-center border-b border-white/20 backdrop-blur-sm bg-white/5">
            <h3 className="text-white font-medium text-lg">Events</h3>
            <button
              onClick={() => setIsEventsPanelOpen(false)}
              className="p-2 text-white hover:text-gray-300 hover:bg-white/10 rounded-full transition-all duration-200"
              aria-label="Close events panel"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Events Content */}
          <div className="h-full overflow-y-auto pb-20 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:backdrop-blur-md [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
            {/* Upcoming Events */}
            <div className="py-3 px-4 border-b border-white/20">
              <h3 className="text-white font-medium text-lg mb-2">Upcoming Events</h3>
            </div>
            <div className="p-4 space-y-4">
              {upcomingEvents.map((event) => (
                <button 
                  key={event.id} 
                  className="w-full text-left border-b border-gray-200/20 p-3 hover:bg-white/5 rounded-lg transition-all duration-200 group"
                  onClick={() => {
                    navigate('/news');
                    setIsEventsPanelOpen(false);
                  }}
                >
                  <div className="text-xs text-blue-200 mb-1 group-hover:text-blue-100 transition-colors">{event.date} {event.year}</div>
                  <h4 className="text-white text-sm font-medium group-hover:text-blue-200 transition-colors">{event.title}</h4>
                  <p className="text-xs text-gray-300 mt-1 group-hover:text-gray-200 transition-colors">{event.description}</p>
                </button>
              ))}
            </div>

            {/* Ongoing Events */}
            <div className="py-3 px-4 border-b border-white/20">
              <h3 className="text-white font-medium text-lg mb-2">Ongoing Events</h3>
            </div>
            <div className="p-4 space-y-4">
              {ongoingEvents.map((event) => (
                <button 
                  key={event.id} 
                  className="w-full text-left border-b border-gray-200/20 p-3 hover:bg-white/5 rounded-lg transition-all duration-200 group"
                  onClick={() => {
                    if (event.slug) {
                      navigate(`/news/${event.slug}`);
                      setIsEventsPanelOpen(false);
                    }
                  }}
                >
                  <div className="text-xs text-blue-200 mb-1 group-hover:text-blue-100 transition-colors">{event.date} {event.year}</div>
                  <h4 className="text-white text-sm font-medium group-hover:text-blue-200 transition-colors">{event.title}</h4>
                  <p className="text-xs text-gray-300 mt-1 group-hover:text-gray-200 transition-colors">{event.description}</p>
                </button>
              ))}
            </div>

            {/* Latest Events */}
            <div className="py-3 px-4 border-b border-white/20">
              <h3 className="text-white font-medium text-lg mb-2">Latest Events</h3>
            </div>
            <div className="p-4 space-y-4">
              {latestEvents.map((event) => (
                <button 
                  key={event.id} 
                  className="w-full text-left border-b border-gray-200/20 p-3 hover:bg-white/5 rounded-lg transition-all duration-200 group"
                  onClick={() => {
                    navigate('/news');
                    setIsEventsPanelOpen(false);
                  }}
                >
                  <div className="text-xs text-blue-200 mb-1 group-hover:text-blue-100 transition-colors">{event.date} {event.year}</div>
                  <h4 className="text-white text-sm font-medium group-hover:text-blue-200 transition-colors">{event.title}</h4>
                  <p className="text-xs text-gray-300 mt-1 group-hover:text-gray-200 transition-colors">{event.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Discover All Events Button - Fixed at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-900/80 to-transparent">
            <motion.button 
              onClick={() => {
                navigate('/news');
                setIsEventsPanelOpen(false);
              }}
              className="group relative w-full px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg overflow-hidden"
              whileHover={{ 
                scale: 1.05, 
                y: -2,
                boxShadow: "0 15px 30px rgba(52, 211, 153, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)',
                  backgroundSize: '8px 8px'
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <span className="relative z-10 flex items-center justify-center">
                DISCOVER ALL EVENTS
                <ArrowRight className="ml-2 w-4 h-4" />
              </span>
            </motion.button>
          </div>
        </motion.div>

        <div className="w-full h-full absolute bottom-0 left-0 lg:pr-[25%]" ref={contentRef}>
          <div className="relative h-full flex items-center justify-center lg:justify-start">
            {/* Hero Content */}
            <div className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-28 xl:py-32">              
              <div className="relative lg:translate-y-16 z-20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ 
                      duration: prefersReducedMotion ? 0 : 0.5,
                      ease: "easeInOut"
                    }}
                    className="max-w-screen-xl mx-auto"
                  >
                    <div className="max-w-[95%] md:max-w-[85%] lg:max-w-[75%] mx-auto lg:mx-0 space-y-4 sm:space-y-6">
                      {/* Tag with improved visibility */}
                      <motion.div className="mb-4 sm:mb-6">
                        <span className="inline-block px-4 py-1.5 bg-emerald-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-full">
                          <span className="text-emerald-400 text-sm sm:text-base uppercase tracking-wider font-medium">
                            Innovation in Healthcare
                          </span>
                        </span>
                      </motion.div>

                      {/* Main title with optimized hierarchy and spacing */}
                      <motion.h1 
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white"
                        style={{
                          textShadow: '0 2px 15px rgba(0,0,0,0.5)',
                          lineHeight: '1.15',
                          letterSpacing: '-0.02em'
                        }}
                      >
                        {slides[activeSlide].title}
                      </motion.h1>

                      {/* Call to action buttons */}
                      <motion.div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-4 sm:pt-6">
                        <motion.button
                          onClick={() => navigate('/products')}
                          className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          View Products
                          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                        <motion.button
                          onClick={() => navigate('/contact')}
                          className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl backdrop-blur-sm transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Contact Us
                        </motion.button>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation dots and arrows with optimized animations */}
        <div className={`absolute bottom-24 left-0 right-0 ${isEventsPanelOpen ? 'z-10' : 'z-20'} flex justify-center items-center lg:pr-[25%] transition-opacity duration-200 ${isEventsPanelOpen ? 'opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto' : 'opacity-100'}`}>
          <div className="flex items-center space-x-6">
            <button
              onClick={handlePrevSlide}
              className="w-8 h-8 flex items-center justify-center text-white bg-gray-800/50 hover:bg-gray-700/70 rounded-full transition-colors will-change-transform"
              aria-label="Previous slide"
            >
              <span className="text-xl">&lt;</span>
            </button>
            
            <div className="flex space-x-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-3 h-3 ${index === activeSlide ? 'bg-white' : 'bg-gray-500'} rounded-full hover:bg-gray-400 transition-colors will-change-transform`}
                />
              ))}
            </div>
            
            <button
              onClick={handleNextSlide}
              className="w-8 h-8 flex items-center justify-center text-white bg-gray-800/50 hover:bg-gray-700/70 rounded-full transition-colors will-change-transform"
              aria-label="Next slide"
            >
              <span className="text-xl">&gt;</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default memo(Hero);