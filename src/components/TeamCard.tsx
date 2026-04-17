import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { TeamMember } from "@/data/team";

interface TeamCardProps {
  member: TeamMember;
  className?: string;
  showInfo?: boolean;
  onClick?: () => void;
}

const TeamCard = ({ member, className, showInfo = false, onClick }: TeamCardProps) => (
  <motion.div
    className={cn(
      "bg-white rounded-lg overflow-hidden group relative cursor-pointer",
      "transition-all duration-500 shadow-light hover:shadow-card-hover border border-gray-100",
      "hover:shadow-2xl hover:shadow-primary/20", // Enhanced shadow glow
      "transform-gpu hover:scale-105", // Smooth zoom effect
      className
    )}
    whileHover={{ 
      y: -5,
      transition: { duration: 0.3 }
    }}
    onClick={onClick}
  >
    {/* Enhanced gradient background effect on hover */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-tertiary/5"></div>
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-transparent to-tertiary/20 blur-xl"></div>
      {/* Additional glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-tertiary/10 blur-2xl group-hover:opacity-70 transition-opacity duration-700"></div>
    </div>

    <div className="p-6 relative z-10">
      <div className="flex items-center gap-4 mb-4">
        {/* Avatar Image with hover effect */}
        <motion.div 
          className="flex-shrink-0"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 transition-transform duration-300 group-hover:border-primary/40">
            <motion.img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
              loading="lazy"
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </motion.div>
        
        {/* Name and Role with hover effects */}
        <div>
          <h3 className="font-bold text-lg text-primary transition-colors duration-300 group-hover:text-primary/90">
            {member.name}
          </h3>
          <p className="text-sm text-neutral-dark/60 transition-colors duration-300 group-hover:text-neutral-dark/80">
            {member.role}
          </p>
        </div>
      </div>
      
      {/* Description with hover effect */}
      <motion.p 
        className="text-neutral-dark/80 text-sm leading-relaxed transition-all duration-300"
        initial={{ height: "auto" }}
        whileHover={{ 
          color: "rgb(var(--neutral-dark))",
          transition: { duration: 0.2 }
        }}
      >
        {member.bio}
      </motion.p>

      {/* Hover reveal content */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/90 to-tertiary/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-white text-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-semibold mb-2">{member.expertise.join(" · ")}</h4>
            <p className="text-sm text-white/90">{member.longBio.substring(0, 120)}...</p>
          </motion.div>
          
          <motion.div 
            className="mt-4 text-sm text-white/80"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Click to view full profile
          </motion.div>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

export default TeamCard;
