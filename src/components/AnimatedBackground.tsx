import { motion } from "framer-motion";

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0">
      {/* Simplified Floating gradient orbs */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[40vw] h-[40vw] rounded-full bg-gradient-to-r from-emerald-100/30 to-blue-100/30 blur-3xl"
            animate={{
              x: [
                `${-20 + i * 50}%`,
                `${-10 + i * 40}%`,
                `${-20 + i * 50}%`
              ],
              y: [
                `${-20 + i * 40}%`,
                `${-30 + i * 50}%`,
                `${-20 + i * 40}%`
              ],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </motion.div>

      {/* Simplified gradient mesh */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(52,211,153,0.03) 0%, rgba(59,130,246,0.02) 50%, transparent 100%)',
          maskImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, black 2px, black 4px)'
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Simplified pattern overlay */}
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2334D399' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
};

export default AnimatedBackground; 