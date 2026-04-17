import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Leaf SVG paths for different leaf types
const leafPaths = [
  "M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9zm0 0c-4.97 0-9-4.03-9-9 4.97 0 9 4.03 9 9zm0 0c0-4.97-4.03-9-9-9 0 4.97 4.03 9 9 9zm0 0c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9z",
  "M12 22c0-5.52 4.48-10 10-10-5.52 0-10-4.48-10-10 0 5.52-4.48 10-10 10 5.52 0 10 4.48 10 10z",
  "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z"
];

interface LeafProps {
  id: string;
  x: number;
  y: number;
  leafType: number;
  scale: number;
  rotation: number;
}

const LeafCursor = () => {
  const [leaves, setLeaves] = useState<LeafProps[]>([]);

  useEffect(() => {
    // Create leaf on click
    const handleClick = (e: MouseEvent) => {
      // Generate 1-3 leaves per click
      const numLeaves = Math.floor(Math.random() * 3) + 1;
      
      const newLeaves = Array.from({ length: numLeaves }, (_, i) => {
        // Add some randomness to position
        const offsetX = (Math.random() - 0.5) * 20;
        const offsetY = (Math.random() - 0.5) * 20;
        
        return {
          id: `${Date.now()}-${i}`,
          x: e.clientX + offsetX,
          y: e.clientY + offsetY,
          leafType: Math.floor(Math.random() * 3),
          scale: 0.7 + Math.random() * 0.6, // Random scale between 0.7 and 1.3
          rotation: Math.random() * 360 // Random rotation
        };
      });
      
      // Add new leaves
      setLeaves(prev => [...prev, ...newLeaves]);
      
      // Remove oldest leaves if more than 15 leaves
      if (leaves.length > 15) {
        setLeaves(prev => prev.slice(newLeaves.length));
      }
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [leaves.length]);

  return (
    <AnimatePresence>
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="fixed pointer-events-none z-40"
          style={{ left: leaf.x, top: leaf.y }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ 
            scale: [0, leaf.scale, leaf.scale * 0.9], 
            opacity: [1, 1, 0],
            y: leaf.y - 80,
            rotate: leaf.rotation
          }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 1.5,
            ease: "easeOut"
          }}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.2))" }}
          >
            <path 
              d={leafPaths[leaf.leafType]} 
              fill="#4CAF50" 
              fillOpacity={0.8 + Math.random() * 0.2}
            />
          </svg>
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default LeafCursor;
