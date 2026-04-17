import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, Clock, Share2, Tag, User } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { newsItems, newsDetails } from "../data/newsData";

// Helper function to estimate reading time
const calculateReadingTime = (content: string): string => {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// Helper function to extract headings from content
const extractTableOfContents = (content: string) => {
  const headings: { id: string; text: string }[] = [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const h2Elements = doc.querySelectorAll('h2, h3');
  
  h2Elements.forEach((heading, index) => {
    const id = `section-${index}`;
    heading.id = id;
    headings.push({
      id,
      text: heading.textContent || '',
    });
  });
  
  return { headings, processedContent: doc.body.innerHTML };
};

// Component code remains the same
const NewsDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>("");
  
  // Find the news item that matches the slug
  const newsItem = newsItems.find(item => item.slug === slug);
  const details = slug && newsDetails[slug as keyof typeof newsDetails];
  
  // Extract table of contents and process content
  const { headings, processedContent } = details ? extractTableOfContents(details.content) : { headings: [], processedContent: "" };
  
  // Get related articles
  const relatedArticles = newsItems
    .filter(item => item.slug !== slug && item.category === newsItem?.category)
    .slice(0, 3);

  // If no matching news item is found, redirect to news page
  useEffect(() => {
    if (!newsItem) {
      navigate('/news');
    }
  }, [newsItem, navigate]);

  // Track active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('[id^="section-"]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [details]);

  // If no matching news item is found, show the not found state
  if (!newsItem || !details) {
    return (
      <div className="min-h-screen bg-neutral-50 pt-32 pb-16">
        <div className="container-fluid">
          <motion.div 
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm">
              {/* Icon */}
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/5 text-primary">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-8 h-8" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                  />
                </svg>
              </div>
              
              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                News Article Not Found
              </h1>
              
              {/* Description */}
              <p className="text-neutral-dark/70 mb-8">
                The news article you're looking for doesn't exist or has been removed.
              </p>
              
              {/* Back Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  to="/news"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors"
                >
                  <ChevronLeft size={20} />
                  Back to News
                </Link>
              </motion.div>
            </div>

            {/* Suggested Articles */}
            <motion.div 
              className="mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-primary mb-6">
                You might be interested in
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {newsItems.slice(0, 2).map((article, index) => (
                  <Link 
                    key={article.id}
                    to={`/news/${article.slug}`}
                    className="group"
                  >
                    <motion.div 
                      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar size={14} className="text-neutral-dark/60" />
                          <span className="text-sm text-neutral-dark/60">
                            {article.date}
                          </span>
                        </div>
                        <h3 className="font-semibold text-primary line-clamp-2 group-hover:text-primary-dark transition-colors">
                          {article.title}
                        </h3>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] flex items-end bg-black">
        <div className="absolute inset-0">
          <motion.img
            src={newsItem.image}
            alt={newsItem.title}
            className="w-full h-full object-cover opacity-60"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
        </div>
        
        <motion.div 
          className="relative container-fluid py-16 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="max-w-4xl">
            <motion.div
              className="mb-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link 
                to="/news"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 backdrop-blur-sm text-white font-medium rounded-lg hover:bg-primary/30 transition-colors"
              >
                <ChevronLeft size={18} />
                Back to News
              </Link>
            </motion.div>
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full text-sm font-medium">
                {newsItem.category}
              </span>
              <span className="flex items-center gap-1 text-sm text-white/80">
                <Calendar size={14} />
                {newsItem.date}
              </span>
              <span className="flex items-center gap-1 text-sm text-white/80">
                <Clock size={14} />
                {details.readTime}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {newsItem.title}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                  <User size={20} />
                </div>
                <div>
                  <div className="font-medium">{details.author}</div>
                  <div className="text-sm text-white/60">Author</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="container-fluid py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Table of Contents - Desktop */}
            {headings.length > 0 && (
              <motion.div 
                className="hidden lg:block lg:col-span-3 sticky top-24 h-fit"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Table of Contents</h3>
                  <nav className="space-y-2">
                    {headings.map((heading) => (
                      <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className={`block text-sm py-1 px-2 rounded transition-colors ${
                          activeSection === heading.id
                            ? "bg-primary/10 text-primary"
                            : "text-neutral-dark/70 hover:text-primary"
                        }`}
                      >
                        {heading.text}
                      </a>
                    ))}
                  </nav>
                </div>
              </motion.div>
            )}

            {/* Main Content */}
            <motion.div 
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm">
                <div 
                  className="prose prose-lg max-w-none prose-headings:scroll-mt-24"
                  dangerouslySetInnerHTML={{ __html: processedContent }}
                />

                {/* Tags */}
                <div className="mt-8 pt-8 border-t">
                  <div className="flex flex-wrap gap-2">
                    {details.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-primary/5 text-primary px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <motion.div 
                  className="mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {relatedArticles.map((article, index) => (
                      <Link 
                        key={article.id} 
                        to={`/news/${article.slug}`}
                        className="group"
                      >
                        <motion.div 
                          className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        >
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={article.image}
                              alt={article.title}
                              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          </div>
                          <div className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Calendar size={14} className="text-neutral-dark/60" />
                              <span className="text-sm text-neutral-dark/60">{article.date}</span>
                            </div>
                            <h3 className="font-semibold text-primary line-clamp-2 mb-2 group-hover:text-primary-dark transition-colors">
                              {article.title}
                            </h3>
                            <p className="text-sm text-neutral-dark/70 line-clamp-2">
                              {article.excerpt}
                            </p>
                          </div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Social Share & Navigation - Desktop */}
            <motion.div 
              className="hidden lg:block lg:col-span-2 sticky top-24 h-fit"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                <h3 className="text-sm font-medium text-neutral-dark/60 mb-4">Share This Article</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                    Tweet
                  </button>
                  <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                    Share
                  </button>
                  <button className="w-full flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/20 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19.7 3H4.3A1.3 1.3 0 003 4.3v15.4A1.3 1.3 0 004.3 21h15.4a1.3 1.3 0 001.3-1.3V4.3A1.3 1.3 0 0019.7 3zM8.339 18.338H5.667v-8.59h2.672v8.59zM7.004 8.574a1.548 1.548 0 11-.002-3.096 1.548 1.548 0 01.002 3.096zm11.335 9.764H15.67v-4.177c0-.996-.017-2.278-1.387-2.278-1.389 0-1.601 1.086-1.601 2.206v4.249h-2.667v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711z" clipRule="evenodd" />
                    </svg>
                    LinkedIn
                  </button>
                </div>
              </div>

              <Link
                to="/news"
                className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 text-primary">
                  <ChevronLeft size={20} />
                  <span className="font-medium">Back to News</span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
