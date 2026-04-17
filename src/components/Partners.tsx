import { motion, useDragControls, useMotionValue, useAnimationControls } from "framer-motion";
import { useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type Partner = {
  id: number;
  name: string;
  logo: string;
  url: string;
};

const partners: Partner[] = [
    {
      id: 1,
      name: "MUHAS",
      logo: "/partner/MUHAS.png",
      url: "https://muhas.ac.tz/"
    },
    {
      id: 2,
      name: "wister",
      logo: "/partner/wister.png",
      url: "https://www.wistar.org/"
    },
    {
      id: 3,
      name: "udom",
      logo: "/partner/udom.png",
      url: "https://www.udom.ac.tz/"
    },
    {
      id: 4,
      name: "UBCDD",
      logo: "/partner/UBCDD.webp",
      url: "https://www.ub-cedd.org/"
    },
    {
      id: 5,
      name: "stJOHN",
      logo: "/partner/stJOHN.png",
      url: "https://www.sjut.ac.tz/"
    },
];

const mainPartner = partners[0];
const otherPartners = partners.slice(1);

const Partners = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const controls = useAnimationControls();
  const x = useMotionValue(0);

  useEffect(() => {
    const slideWidth = 320 + 24; // increased card width + increased gap
    const totalWidth = slideWidth * partners.length;
    
    const animate = async () => {
      await controls.start({
        x: -totalWidth,
        transition: {
          duration: 25, // slower animation
          ease: "linear",
          repeat: Infinity,
        },
      });
    };
    
    animate();

    return () => {
      controls.stop();
    };
  }, [controls]);

  return (
    <section className="pt-12 sm:pt-16 pb-16 sm:pb-24 md:pt-20 md:pb-32 bg-gradient-to-b from-white to-neutral-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-tertiary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-70"></div>
      
      <div className="container-fluid relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 text-primary mb-4 sm:mb-6 text-sm sm:text-base font-medium"
          >
            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-primary animate-pulse" />
            Strategic Partnerships
          </motion.div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary-dark mb-4 sm:mb-6 px-4 sm:px-0">
            Empowering Research Through Strategic
            <span className="relative block sm:inline mt-1 sm:mt-0 sm:ml-3">
              <span className="relative z-10 text-primary">Partnerships</span>
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
          <p className="text-base sm:text-lg text-neutral-dark/80 max-w-2xl mx-auto px-4 sm:px-0">
            Working together with leading organizations to advance healthcare innovation
          </p>
        </motion.div>

        {/* Partners showcase - unified for both mobile and desktop */}
        <div className="relative overflow-hidden mx-[-2vw] sm:mx-[-4vw] px-[2vw] sm:px-[4vw]">
          <div className="relative overflow-hidden w-full">
            <div className="flex">
              <motion.div
                className="flex gap-3 sm:gap-6 w-fit"
                animate={controls}
                style={{ x }}
                initial={{ x: 0 }}
                onHoverStart={() => controls.stop()}
                onHoverEnd={() => {
                  const currentX = x.get();
                  const cardWidth = isMobile ? 280 : 320; // Smaller cards on mobile
                  const gapWidth = isMobile ? 12 : 24;
                  controls.start({
                    x: -((cardWidth + gapWidth) * partners.length),
                    transition: {
                      duration: 25 * (1 - (-currentX / ((cardWidth + gapWidth) * partners.length))),
                      ease: "linear",
                      repeat: Infinity,
                    },
                  });
                }}
              >
                {/* Triple the partners array for smoother infinite loop */}
                {[...partners, ...partners, ...partners].map((partner, index) => (
                  <motion.a
                    key={`${partner.id}-${index}`}
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-[280px] sm:w-[320px]"
                    whileHover={{ 
                      scale: isMobile ? 1.02 : 1.03,
                      transition: { duration: 0.3, ease: 'easeOut' }
                    }}
                  >
                    <div className="group relative h-[140px] sm:h-[180px] bg-gradient-to-br from-white to-neutral-50 rounded-xl sm:rounded-2xl overflow-hidden flex items-center justify-center p-4 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-white/80 backdrop-blur-sm">
                      {/* Decorative elements */}
                      <div className="absolute top-0 left-0 w-full h-full bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute -top-16 sm:-top-20 -right-16 sm:-right-20 w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-2xl transform group-hover:scale-150 transition-transform duration-700"></div>
                      <div className="absolute -bottom-16 sm:-bottom-20 -left-16 sm:-left-20 w-32 sm:w-40 h-32 sm:h-40 bg-gradient-to-tr from-tertiary/10 to-tertiary/5 rounded-full blur-2xl transform group-hover:scale-150 transition-transform duration-700"></div>
                      
                      {/* Logo container with hover effect */}
                      <div className="relative z-10 w-full h-full flex items-center justify-center transform group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-500">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="max-w-[90%] sm:max-w-[95%] max-h-[90%] sm:max-h-[95%] object-contain filter drop-shadow-sm group-hover:drop-shadow-md transition-all duration-500"
                          loading="lazy"
                          draggable="false"
                        />
                      </div>
                      
                      {/* Partner name that appears on hover */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 sm:p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white text-center text-xs sm:text-sm font-medium">{partner.name}</p>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
          
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10" />
        </div>

        {/* Funder section removed */}
      </div>
    </section>
  );
};

export default Partners;
