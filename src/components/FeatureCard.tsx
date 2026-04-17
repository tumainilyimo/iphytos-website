import { FC, ReactNode } from "react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard: FC<FeatureCardProps> = ({ icon, title, description, index }) => {
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.5, 
          ease: [0.22, 1, 0.36, 1],
          delay: index * 0.1 
        }
      }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="group h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary-dark/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
        
        <div className="h-full backdrop-blur-sm bg-white/90 group-hover:bg-white/10 p-4 sm:p-6 md:p-8 border border-white/20 shadow-lg transition-all duration-500 relative z-10">
          <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="flex-shrink-0 p-2 sm:p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-white/20 group-hover:text-white transition-all duration-500">
              {icon}
            </div>
            
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary-dark group-hover:text-white transition-colors duration-500">{title}</h3>
            </div>
          </div>
          
          <p className="text-sm sm:text-base text-neutral-dark group-hover:text-white/90 transition-colors duration-500">{description}</p>
          
          <div 
            className="mt-4 sm:mt-6 flex items-center text-primary font-medium group-hover:text-white/90 transition-colors duration-500 group-hover:translate-x-1"
          >
            Learn more
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureCard; 