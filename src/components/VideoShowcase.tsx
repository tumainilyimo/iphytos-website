import { useState, useEffect, useRef, useCallback } from 'react';
import { Play } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet';

interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
}

const videos: Video[] = [
  {
    id: '8D9XB3e3vVw',
    title: "iPhytos Company Overview",
    description: "Discover how we're revolutionizing natural medicine through innovative research and development.",
    duration: '3:45'
  },
  {
    id: 'E9VFp6Yjjy4', 
    title: "enlarged prostate (bph) and it's symptoms",
    description: "Understanding Benign Prostatic Hyperplasia (BPH): Learn about common symptoms, risk factors, and its impact on men's health.",
    duration: '3:45'
  },
  {
    id: 'csVFQWQDHi4',
    title: "URIPHYTOL clinical results",
    description: "Explore the scientifically proven effectiveness of URIPHYTOL through comprehensive clinical trial data and patient outcomes.",
    duration: '3:45'
  },
  {
    id: 'RNl36iRe8QM', 
    title: "Our community impact",
    description: "See how our natural medicine solutions are making a positive difference in communities worldwide through sustainable healthcare practices.",
    duration: '3:45'
  }
];

const VideoShowcase = () => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  // Set the first video as selected when component mounts
  useEffect(() => {
    if (videos.length > 0 && !selectedVideo) {
      setSelectedVideo(videos[0]);
    }
  }, [selectedVideo]);

  const VideoPlayer = ({ video }: { video: Video }) => {
    return (
      <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${video.id}?loading=lazy`}
          title={video.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  };

  const VideoCard = ({ video, isActive, onClick }: { video: Video; isActive: boolean; onClick: () => void }) => {
    return (
      <div
        className={`flex gap-4 p-4 rounded-lg cursor-pointer transition-colors ${
          isActive ? 'bg-primary/10' : 'hover:bg-gray-100'
        }`}
        onClick={onClick}
      >
        <div className="relative flex-shrink-0 w-40 sm:w-48 aspect-video rounded-lg overflow-hidden">
          <img
            src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
            alt={video.title}
            className="w-full h-full object-cover"
            loading="lazy"
            width={480}
            height={360}
          />
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 rounded">
            {video.duration}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-medium line-clamp-2 mb-1">
            {video.title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
            {video.description}
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>iPhytos Video Showcase - Natural Medicine Innovation</title>
        <meta name="description" content="Discover iPhytos' innovative approach to natural medicine through our featured video collection. Learn about our research, clinical results, and community impact." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "VideoGallery",
            "name": "iPhytos Video Showcase",
            "description": "Featured videos showcasing iPhytos' natural medicine innovations",
            "video": videos.map(video => ({
              "@type": "VideoObject",
              "name": video.title,
              "description": video.description,
              "thumbnailUrl": `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`,
              "embedUrl": `https://www.youtube.com/embed/${video.id}`
            }))
          })}
        </script>
      </Helmet>

      <section 
        ref={containerRef}
        className="py-12 sm:py-16 md:py-24 relative overflow-hidden"
      >
        {/* Optimized Background */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-tertiary/10"
          style={{ willChange: 'transform' }}
        >
          <div className="absolute inset-0 backdrop-blur-[100px]" />
          <div 
            className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[100px] opacity-20"
            style={{ 
              willChange: 'opacity',
              animation: 'pulse 4s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-tertiary/20 blur-[100px] opacity-20"
            style={{ 
              willChange: 'opacity',
              animation: 'pulse 4s ease-in-out infinite 2s'
            }}
          />
        </div>

        <div className="container-fluid relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Optimized Header */}
            {isInView && (
              <motion.div 
                className="text-center mb-8 sm:mb-12 md:mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg mb-4 sm:mb-6"
                >
                  <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-primary" />
                  <Play size={12} className="sm:hidden text-primary" />
                  <Play size={14} className="hidden sm:block text-primary" />
                  <span className="text-[10px] sm:text-xs font-medium bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent">
                    Featured Videos
                  </span>
                </motion.div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-dark mb-4 sm:mb-6">
                  Our Story in{' '}
                  <span className="relative inline-block">
                    <span className="relative z-10 bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent">
                      Motion
                    </span>
                    <motion.div
                      className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-primary to-tertiary rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </span>
                </h2>
              </motion.div>
            )}

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              {/* Video Player */}
              <div className="lg:col-span-2 relative">
                <div className="aspect-video bg-black/20 rounded-2xl overflow-hidden shadow-xl">
                  {selectedVideo && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full"
                    >
                      <VideoPlayer video={selectedVideo} />
                    </motion.div>
                  )}
                </div>
                
                {/* Video Info */}
                <div className="mt-4 sm:mt-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-primary-dark mb-2">
                    {selectedVideo?.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 line-clamp-2 sm:line-clamp-none">
                    {selectedVideo?.description}
                  </p>
                </div>
              </div>

              {/* Optimized Playlist */}
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-primary-dark">
                    Featured Videos
                  </h3>
                  <span className="text-xs sm:text-sm text-gray-500">
                    {videos.length} videos
                  </span>
                </div>

                <div className="space-y-4">
                  {videos.map((video, index) => (
                    <motion.button
                      key={video.id}
                      onClick={() => setSelectedVideo(video)}
                      className={`w-full flex items-start gap-3 sm:gap-4 p-2 sm:p-3 rounded-xl transition-all ${
                        selectedVideo?.id === video.id
                          ? 'bg-primary/10'
                          : 'hover:bg-white/5'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ willChange: 'transform' }}
                    >
                      {/* Thumbnail */}
                      <div className="relative w-24 sm:w-32 aspect-video rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                          alt={video.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          width={320}
                          height={180}
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm sm:text-base font-medium text-primary-dark mb-1 line-clamp-2 text-left">
                          {video.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-500 line-clamp-1 text-left">
                          {video.duration}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VideoShowcase;
