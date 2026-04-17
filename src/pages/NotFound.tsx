import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-primary/5 to-white flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-primary/5 [mask-image:radial-gradient(white,transparent_85%)]" />

      {/* Radial Gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-tertiary/10 rounded-full filter blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Text */}
          <h1 className="text-8xl font-bold text-primary mb-4 tracking-tighter">
            4
            <motion.span
              animate={{
                rotate: [0, -10, 10, -10, 10, 0],
                scale: [1, 1.1, 1.1, 1.1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
              className="inline-block"
            >
              0
            </motion.span>
            4
          </h1>

          {/* Message */}
          <h2 className="text-2xl md:text-3xl font-semibold text-neutral-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-neutral-600 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's get
            you back on track.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary border border-primary/20 rounded-full hover:bg-primary/5 transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>

          {/* Path Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 text-sm text-neutral-500"
          >
            Attempted path:{" "}
            <code className="bg-neutral-100 px-2 py-1 rounded">
              {location.pathname}
            </code>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
