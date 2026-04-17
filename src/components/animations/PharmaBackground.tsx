import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate } from 'framer-motion';
import React, { useEffect, useState, useCallback } from 'react';

interface Props {
  className?: string;
}

export const PharmaBackground: React.FC<Props> = ({ className = '' }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [leftHelixHovered, setLeftHelixHovered] = useState(false);
  const [rightHelixHovered, setRightHelixHovered] = useState(false);
  
  // Track mouse position within helix
  const helixMouseX = useMotionValue(0);
  const helixMouseY = useMotionValue(0);

  // Create smooth spring animations for the glow effect
  const glowRadius = useSpring(0, { stiffness: 100, damping: 30 });
  const glowOpacity = useSpring(0, { stiffness: 100, damping: 30 });
  
  // Transform mouse position into glow position
  const glowX = useTransform(helixMouseX, [-100, 100], [-50, 50]);
  const glowY = useTransform(helixMouseY, [-100, 100], [-50, 50]);

  // Create dynamic glow gradient based on mouse position
  const glowBackground = useMotionTemplate`radial-gradient(
    circle ${glowRadius}px at ${glowX}px ${glowY}px,
    rgba(0, 200, 81, ${glowOpacity}),
    rgba(52, 152, 219, ${glowOpacity}),
    transparent
  )`;

  // Handle mouse move within helix
  const handleHelixMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 200 - 100;
    const y = ((e.clientY - rect.top) / rect.height) * 200 - 100;
    helixMouseX.set(x);
    helixMouseY.set(y);
    glowRadius.set(100);
    glowOpacity.set(0.3);
  }, []);

  // Handle mouse leave
  const handleHelixMouseLeave = useCallback(() => {
    glowRadius.set(0);
    glowOpacity.set(0);
  }, []);

  // Smooth spring animation for mouse movement
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  // Transform mouse movement for parallax effect
  const backgroundX = useTransform(smoothMouseX, [0, window.innerWidth], [-20, 20]);
  const backgroundY = useTransform(smoothMouseY, [0, window.innerHeight], [-20, 20]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Enhanced gradient background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-[#00C851]/5 via-transparent to-[#3498DB]/5"
        style={{ scale: 1.1, x: backgroundX, y: backgroundY }}
        animate={{ 
          background: [
            'linear-gradient(to bottom right, rgba(0, 200, 81, 0.05), transparent 50%, rgba(52, 152, 219, 0.05))',
            'linear-gradient(to bottom right, rgba(52, 152, 219, 0.05), transparent 50%, rgba(0, 200, 81, 0.05))',
            'linear-gradient(to bottom right, rgba(0, 200, 81, 0.05), transparent 50%, rgba(52, 152, 219, 0.05))',
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating molecules */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`molecule-${i}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: `radial-gradient(circle at center, ${
              i % 2 === 0 ? '#00C851' : '#3498DB'
            }, transparent)`,
            left: `${(i * 100) / 12}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, i % 2 ? 30 : -30, 0],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Interactive connection lines */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`connection-${i}`}
          className="absolute w-px h-px"
          style={{
            left: `${(i * 100) / 8}%`,
            top: '50%',
          }}
          animate={{
            boxShadow: [
              '0 0 100px 100px rgba(0, 200, 81, 0.03)',
              '0 0 150px 150px rgba(52, 152, 219, 0.03)',
              '0 0 100px 100px rgba(0, 200, 81, 0.03)',
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Animated grid pattern with glow */}
      <motion.div 
        className="absolute inset-0 opacity-[0.02]"
        style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, #00C851 1px, transparent 0)`,
          backgroundSize: '48px 48px',
          x: backgroundX,
          y: backgroundY
        }}
        animate={{
          backgroundImage: [
            'radial-gradient(circle at 2px 2px, #00C851 1px, transparent 0)',
            'radial-gradient(circle at 2px 2px, #3498DB 1px, transparent 0)',
            'radial-gradient(circle at 2px 2px, #00C851 1px, transparent 0)',
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Modern floating orbs */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-[40%_60%_70%_30%/40%_50%_60%_50%] mix-blend-overlay"
          style={{
            background: `radial-gradient(circle at center, ${
              ['#00C851', '#3498DB', '#2ECC71'][i % 3]
            }05, transparent)`,
            width: `${300 + Math.random() * 300}px`,
            height: `${300 + Math.random() * 300}px`,
            left: `${[5, 25, 45, 65, 85, 95][i]}%`,
            top: `${[15, 35, 55, 75, 25, 85][i]}%`,
            filter: 'blur(50px)',
          }}
          animate={{
            borderRadius: ['40% 60% 70% 30% / 40% 50% 60% 50%', '70% 30% 50% 70% / 60% 30% 70% 40%'],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, i % 2 ? 20 : -20, 0],
            y: [0, i % 2 ? -20 : 20, 0],
          }}
          transition={{
            duration: 20 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Animated medical symbols */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`symbol-${i}`}
          className="absolute text-3xl opacity-5"
          style={{
            left: `${20 + i * 30}%`,
            top: `${30 + i * 20}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.05, 0.1, 0.05],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {['⚕️', '🧬', '💊'][i]}
        </motion.div>
      ))}

      {/* Neural Network Effect */}
      {Array.from({ length: 8 }).map((_, i) => {
        const x1 = Math.random() * 100;
        const y1 = Math.random() * 100;
        return (
          <React.Fragment key={`network-${i}`}>
            <motion.div
              className="absolute w-2 h-2 rounded-full bg-[#00C851]/20"
              style={{
                left: `${x1}%`,
                top: `${y1}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
            {/* Connection Lines */}
            {Array.from({ length: 2 }).map((_, j) => {
              const x2 = (x1 + (Math.random() * 20 - 10)) % 100;
              const y2 = (y1 + (Math.random() * 20 - 10)) % 100;
              return (
                <motion.div
                  key={`connection-${i}-${j}`}
                  className="absolute h-[1px] origin-left"
                  style={{
                    left: `${x1}%`,
                    top: `${y1}%`,
                    width: `${Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))}%`,
                    background: 'linear-gradient(90deg, #00C851/20, transparent)',
                    transform: `rotate(${Math.atan2(y2 - y1, x2 - x1)}rad)`,
                  }}
                  animate={{
                    opacity: [0.1, 0.2, 0.1],
                    scaleX: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3 + j * 0.5,
                  }}
                />
              );
            })}
          </React.Fragment>
        );
      })}

      {/* Enhanced DNA Helixes */}
      {[
        { side: 'left', rotate: -360, hover: leftHelixHovered, setHover: setLeftHelixHovered },
        { side: 'right', rotate: 360, hover: rightHelixHovered, setHover: setRightHelixHovered }
      ].map((helix) => (
        <motion.div
          key={helix.side}
          className={`absolute ${helix.side}-[10%] h-[600px] w-[2px] origin-center hidden lg:block cursor-pointer`}
          style={{ 
            top: '50%', 
            translateY: '-50%',
            background: glowBackground
          }}
          animate={{ 
            rotateY: helix.rotate,
          }}
          onMouseMove={handleHelixMouseMove}
          onMouseLeave={handleHelixMouseLeave}
          onHoverStart={() => helix.setHover(true)}
          onHoverEnd={() => helix.setHover(false)}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(10)].map((_, i) => (
            <React.Fragment key={i}>
              <motion.div
                className="absolute w-8 h-[2px]"
                style={{ 
                  top: `${i * 60}px`,
                  background: helix.hover
                    ? `linear-gradient(90deg, 
                        rgba(0, 200, 81, ${0.4 + Math.sin(i * 0.5 + helixMouseY.get() * 0.01) * 0.3}), 
                        rgba(0, 200, 81, ${0.2 + Math.sin(i * 0.5 + helixMouseX.get() * 0.01) * 0.2}))`
                    : 'rgba(0, 200, 81, 0.1)',
                  filter: helix.hover ? 'brightness(1.5) contrast(1.2) blur(0.5px)' : 'none',
                  boxShadow: helix.hover
                    ? '0 0 20px rgba(0, 200, 81, 0.4), 0 0 40px rgba(0, 200, 81, 0.2)'
                    : 'none'
                }}
                animate={{ 
                  rotate: [0, helix.side === 'left' ? -360 : 360],
                  scale: helix.hover ? [1, 1.2, 1] : 1
                }}
                transition={{
                  duration: helix.hover ? 6 : 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
              />
              <motion.div
                className="absolute w-8 h-[2px]"
                style={{ 
                  top: `${i * 60 + 30}px`,
                  right: 0,
                  background: helix.hover
                    ? `linear-gradient(90deg, 
                        rgba(52, 152, 219, ${0.4 + Math.cos(i * 0.5 + helixMouseY.get() * 0.01) * 0.3}), 
                        rgba(52, 152, 219, ${0.2 + Math.cos(i * 0.5 + helixMouseX.get() * 0.01) * 0.2}))`
                    : 'rgba(52, 152, 219, 0.1)',
                  filter: helix.hover ? 'brightness(1.5) contrast(1.2) blur(0.5px)' : 'none',
                  boxShadow: helix.hover
                    ? '0 0 20px rgba(52, 152, 219, 0.4), 0 0 40px rgba(52, 152, 219, 0.2)'
                    : 'none'
                }}
                animate={{ 
                  rotate: [180, helix.side === 'left' ? -180 : 540],
                  scale: helix.hover ? [1, 1.2, 1] : 1
                }}
                transition={{
                  duration: helix.hover ? 6 : 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
              />
            </React.Fragment>
          ))}

          {/* Interactive glow overlay */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: helix.hover
                ? 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.1), transparent 50%)'
                : 'none',
              '--mouse-x': `${helixMouseX.get()}%`,
              '--mouse-y': `${helixMouseY.get()}%`
            } as any}
          />
        </motion.div>
      ))}
    </div>
  );
};
