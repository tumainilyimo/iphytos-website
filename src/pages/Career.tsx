import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  ChevronRight, 
  Users, 
  BookOpen, 
  Microscope, 
  Globe, 
  Leaf, 
  Heart, 
  ArrowRight, 
  MapPin, 
  Clock, 
  Building, 
  Search,
  X
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

type JobPosition = {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  postedDate: string;
  category: 'research' | 'technical' | 'administrative';
  featured?: boolean;
};

const Career = () => {
  const [openPositionId, setOpenPositionId] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const jobPositions: JobPosition[] = [
    {
      id: 1,
      title: "Research Scientist - Natural Products",
      department: "Research & Development",
      location: "Arusha, Tanzania",
      type: "Full-time",
      description: "We are seeking a talented Research Scientist to join our Natural Products team. In this role, you will be responsible for identifying, isolating, and characterizing bioactive compounds from natural sources for potential therapeutic applications.",
      responsibilities: [
        "Conduct extraction, isolation, and purification of natural compounds from plant materials",
        "Perform analytical characterization of isolated compounds using various techniques (HPLC, MS, NMR, etc.)",
        "Design and execute bioassays to evaluate the biological activity of natural products",
        "Collaborate with computational biology team to integrate experimental data with in silico predictions",
        "Document research findings and prepare reports for internal use and potential publication"
      ],
      requirements: [
        "PhD in Natural Products Chemistry, Pharmacognosy, Medicinal Chemistry, or related field",
        "Minimum 3 years of experience in natural product isolation and characterization",
        "Proficiency in analytical techniques such as HPLC, MS, and NMR",
        "Experience with bioassay development and execution",
        "Strong scientific writing and communication skills",
        "Publication record in peer-reviewed journals preferred"
      ],
      postedDate: "2025-05-01",
      category: "research",
      featured: true
    },
    {
      id: 2,
      title: "Computational Biologist / Biophysicist",
      department: "AI & Computational Biology",
      location: "Arusha, Tanzania",
      type: "Full-time",
      description: "Join our AI & Computational Biology team to develop and apply computational methods for drug discovery. You will work at the intersection of biology, chemistry, and computer science to accelerate our natural product development pipeline.",
      responsibilities: [
        "Develop and implement computational models to predict biological activity of natural compounds",
        "Perform molecular docking and virtual screening to identify promising therapeutic candidates",
        "Analyze large biological datasets to identify patterns and generate insights",
        "Collaborate with wet lab scientists to validate computational predictions",
        "Stay current with latest developments in computational biology and AI for drug discovery"
      ],
      requirements: [
        "MSc or PhD in Computational Biology, Bioinformatics, or related field",
        "Experience with molecular modeling, docking, and virtual screening",
        "Programming skills in Python, R, or similar languages",
        "Knowledge of machine learning techniques and their applications in drug discovery",
        "Familiarity with biological databases and bioinformatics tools",
        "Strong problem-solving skills and attention to detail"
      ],
      postedDate: "2025-05-10",
      category: "technical",
      featured: true
    },
    {
      id: 3,
      title: "Clinical Research Associate",
      department: "Clinical Research",
      location: "Arusha, Tanzania",
      type: "Full-time",
      description: "We are looking for a Clinical Research Associate to support our clinical trials for natural product-based treatments. You will play a key role in ensuring the quality and integrity of our clinical research activities.",
      responsibilities: [
        "Assist in the design and implementation of clinical trials for natural product-based treatments",
        "Monitor clinical trial sites to ensure compliance with protocols and regulatory requirements",
        "Collect, verify, and manage clinical data from trial sites",
        "Prepare and maintain clinical trial documentation",
        "Liaise with healthcare professionals, regulatory authorities, and other stakeholders"
      ],
      requirements: [
        "Bachelor's or Master's degree in Life Sciences, Pharmacy, Nursing, or related field",
        "Minimum 2 years of experience in clinical research or related role",
        "Knowledge of GCP guidelines and regulatory requirements for clinical trials",
        "Strong organizational and time management skills",
        "Excellent communication and interpersonal abilities",
        "Willingness to travel to clinical sites as needed"
      ],
      postedDate: "2025-04-15",
      category: "research"
    },
    {
      id: 4,
      title: "Marketing & Communications Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      description: "We're seeking a Marketing & Communications Specialist to help share our story with the world. You'll develop and implement marketing strategies to raise awareness about our innovative natural medicines and their impact on global health.",
      responsibilities: [
        "Develop and execute marketing campaigns across digital and traditional channels",
        "Create compelling content for our website, social media, and other platforms",
        "Manage relationships with media outlets and coordinate press releases",
        "Collaborate with scientific teams to translate complex research into accessible content",
        "Track and analyze marketing metrics to optimize campaign performance"
      ],
      requirements: [
        "Bachelor's degree in Marketing, Communications, or related field",
        "3+ years of experience in marketing, preferably in healthcare or biotech",
        "Excellent writing and storytelling abilities",
        "Experience with digital marketing tools and analytics",
        "Ability to understand and communicate scientific concepts to diverse audiences",
        "Creative thinking and problem-solving skills"
      ],
      postedDate: "2025-05-18",
      category: "administrative"
    },
    {
      id: 5,
      title: "Laboratory Technician",
      department: "Research & Development",
      location: "Arusha, Tanzania",
      type: "Full-time",
      description: "Join our laboratory team to support our research efforts in natural product discovery and development. You will assist scientists in conducting experiments and maintaining laboratory operations.",
      responsibilities: [
        "Prepare and process plant samples for extraction and analysis",
        "Perform routine analytical procedures following established protocols",
        "Maintain laboratory equipment and ensure proper inventory of supplies",
        "Record and organize experimental data with attention to detail",
        "Assist research scientists with experiments and data collection"
      ],
      requirements: [
        "Associate's or Bachelor's degree in Chemistry, Biology, or related field",
        "1+ years of laboratory experience preferred",
        "Familiarity with basic laboratory techniques and equipment",
        "Good organizational skills and attention to detail",
        "Ability to follow protocols precisely and maintain accurate records",
        "Willingness to learn new techniques and adapt to changing priorities"
      ],
      postedDate: "2025-05-05",
      category: "technical"
    }
  ];

  const togglePosition = (id: number) => {
    setOpenPositionId(openPositionId === id ? null : id);
  };
  
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);
  
  const filteredPositions = jobPositions.filter(position => {
    const matchesFilter = activeFilter === 'all' || position.category === activeFilter;
    const matchesSearch = searchQuery === '' || 
      position.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      position.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      position.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="pt-[18px] md:pt-[19px]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-white to-tertiary/5 py-16 md:py-24">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-tertiary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-70"></div>
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-primary/10 rounded-full blur-xl -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
        
        {/* Floating leaves animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div 
              key={i}
              className="absolute w-8 h-8 text-primary/20"
              initial={{ 
                x: Math.random() * 100 - 50 + '%', 
                y: -20,
                rotate: Math.random() * 360
              }}
              animate={{ 
                y: '120%',
                rotate: Math.random() * 720 - 360
              }}
              transition={{ 
                duration: 15 + Math.random() * 20, 
                repeat: Infinity, 
                delay: i * 2,
                ease: "linear" 
              }}
            >
              <Leaf />
            </motion.div>
          ))}
        </div>
        
        <div className="container-fluid relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 text-center md:text-left">
                <motion.span 
                  className="inline-block text-sm uppercase tracking-widest text-primary font-semibold mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Join Our Team
                </motion.span>
                
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Careers at iPhytos
                </motion.h1>
                
                <motion.p 
                  className="text-lg md:text-xl text-neutral-dark/80 mb-8 max-w-xl mx-auto md:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Join our mission to transform global health through innovative natural medicines and be part of a team that's making a real difference.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-wrap gap-4 justify-center md:justify-start"
                >
                  <a 
                    href="#open-positions" 
                    className="bg-primary text-white font-medium px-8 py-3 rounded-full hover:bg-primary-dark transition-colors flex items-center gap-2 group"
                  >
                    View Open Positions
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                  <Link 
                    to="/contact" 
                    className="bg-white text-primary border border-primary/20 font-medium px-8 py-3 rounded-full hover:bg-primary/5 transition-colors"
                  >
                    Contact Us
                  </Link>
                </motion.div>
              </div>
              
              <motion.div 
                className="md:w-1/2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-tertiary/20 rounded-3xl blur-xl transform -rotate-6 scale-95"></div>
                  <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-white/50 backdrop-blur-sm">
                    <img 
                      src="/images/career.webp" 
                      alt="iPhytos team working in laboratory" 
                      className="w-full h-auto object-cover aspect-[4/3]"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-8 md:py-16 bg-gradient-to-br from-white via-neutral-50 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-2xl opacity-70"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-tertiary/5 rounded-full blur-2xl opacity-70"></div>
        
        <div className="container-fluid relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.span 
                className="inline-block text-sm uppercase tracking-widest text-primary font-semibold mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Benefits & Culture
              </motion.span>
              
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-primary-dark mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Why Join iPhytos?
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-20 h-1 bg-gradient-to-r from-primary to-tertiary mx-auto mb-6 rounded-full"
              ></motion.div>
              
              <motion.p 
                className="text-lg text-neutral-dark/80 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Be part of a team that's redefining medicine through nature, technology, and science
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: <Microscope className="h-8 w-8" />,
                  title: "Cutting-Edge Research",
                  description: "Work at the forefront of biophysics, AI, and natural product research to develop innovative healthcare solutions.",
                  color: "from-blue-500 to-indigo-600"
                },
                {
                  icon: <Users className="h-8 w-8" />,
                  title: "Collaborative Environment",
                  description: "Join a diverse team of scientists, researchers, and professionals working together to achieve breakthrough results.",
                  color: "from-primary to-green-600"
                },
                {
                  icon: <BookOpen className="h-8 w-8" />,
                  title: "Continuous Learning",
                  description: "Benefit from ongoing professional development opportunities and stay at the cutting edge of your field.",
                  color: "from-tertiary to-purple-600"
                },
                {
                  icon: <Globe className="h-8 w-8" />,
                  title: "Global Impact",
                  description: "Contribute to solutions that address global health challenges and improve lives around the world.",
                  color: "from-cyan-500 to-blue-600"
                },
                {
                  icon: <Leaf className="h-8 w-8" />,
                  title: "Sustainable Approach",
                  description: "Be part of an organization committed to sustainable practices and environmental responsibility.",
                  color: "from-green-500 to-teal-600"
                },
                {
                  icon: <Heart className="h-8 w-8" />,
                  title: "Comprehensive Benefits",
                  description: "Enjoy competitive compensation, health benefits, flexible work arrangements, and more.",
                  color: "from-rose-500 to-pink-600"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-white/80 backdrop-blur-sm relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-neutral-50 opacity-100 group-hover:opacity-0 transition-opacity duration-300"></div>
                  <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10">
                    <div className={`bg-gradient-to-br ${benefit.color} rounded-2xl w-16 h-16 flex items-center justify-center mb-6 text-white shadow-sm`}>
                      {benefit.icon}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-primary-dark mb-4 group-hover:text-primary transition-colors duration-300">{benefit.title}</h3>
                    <p className="text-neutral-dark/80">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-16 text-center"
            >
              <a 
                href="#open-positions" 
                className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors group"
              >
                Explore Open Positions
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="open-positions" className="py-8 md:py-16 bg-neutral-50/50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
        
        <div className="container-fluid relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.span 
                className="inline-block text-sm uppercase tracking-widest text-primary font-semibold mb-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Join Our Team
              </motion.span>
              
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-primary-dark mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Open Positions
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-20 h-1 bg-gradient-to-r from-primary to-tertiary mx-auto mb-6 rounded-full"
              ></motion.div>
              
              <motion.p 
                className="text-lg text-neutral-dark/80 max-w-2xl mx-auto mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Explore current opportunities to join our innovative team
              </motion.p>
              
              {/* Search and Filter Controls */}
              <motion.div 
                className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    { id: 'all', label: 'All Positions' },
                    { id: 'research', label: 'Research' },
                    { id: 'technical', label: 'Technical' },
                    { id: 'administrative', label: 'Administrative' }
                  ].map(filter => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeFilter === filter.id 
                        ? 'bg-primary text-white shadow-md' 
                        : 'bg-white text-neutral-dark hover:bg-primary/5 border border-neutral-200'}`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
                
                <div className="relative w-full md:w-auto">
                  {isSearchOpen ? (
                    <div className="relative w-full md:w-64">
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search positions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-4 pr-10 py-2 rounded-full border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                      <button 
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setIsSearchOpen(true)}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-neutral-dark hover:bg-primary/5 border border-neutral-200 text-sm font-medium transition-all duration-300"
                    >
                      <Search className="h-4 w-4" />
                      Search
                    </button>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Featured positions (if any) */}
            {filteredPositions.some(p => p.featured) && (
              <div className="mb-12">
                <h3 className="text-xl font-semibold text-primary-dark mb-6 px-4">Featured Positions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPositions.filter(p => p.featured).map((position) => (
                    <motion.div
                      key={`featured-${position.id}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="bg-white rounded-2xl shadow-sm border border-white/80 overflow-hidden group hover:shadow-md transition-all duration-300"
                    >
                      <div className="p-6 border-b border-neutral-100">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <span className="inline-block text-xs font-semibold text-primary-dark/60 mb-1">
                              Posted: {new Date(position.postedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                            <h3 className="text-xl font-semibold text-primary-dark group-hover:text-primary transition-colors duration-300">{position.title}</h3>
                          </div>
                          <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium">Featured</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-3 mb-4">
                          <div className="flex items-center gap-1 text-sm text-neutral-dark/80">
                            <Building className="h-4 w-4 text-primary/60" />
                            <span>{position.department}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-neutral-dark/80">
                            <MapPin className="h-4 w-4 text-primary/60" />
                            <span>{position.location}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-neutral-dark/80">
                            <Clock className="h-4 w-4 text-primary/60" />
                            <span>{position.type}</span>
                          </div>
                        </div>
                        
                        <p className="text-neutral-dark/80 text-sm line-clamp-2 mb-4">{position.description}</p>
                        
                        <button 
                          onClick={() => togglePosition(position.id)}
                          className="text-primary font-medium text-sm flex items-center gap-1 hover:text-primary-dark transition-colors"
                        >
                          View Details
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <AnimatePresence>
                        {openPositionId === position.id && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="p-6 bg-neutral-50/50">
                              <div className="mb-6">
                                <h4 className="font-semibold text-primary-dark mb-3 text-sm">Responsibilities:</h4>
                                <ul className="space-y-2">
                                  {position.responsibilities.map((responsibility, index) => (
                                    <li key={index} className="flex items-start text-sm">
                                      <span className="text-primary mr-2">•</span>
                                      <span className="text-neutral-dark/90">{responsibility}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div className="mb-6">
                                <h4 className="font-semibold text-primary-dark mb-3 text-sm">Requirements:</h4>
                                <ul className="space-y-2">
                                  {position.requirements.map((requirement, index) => (
                                    <li key={index} className="flex items-start text-sm">
                                      <span className="text-primary mr-2">•</span>
                                      <span className="text-neutral-dark/90">{requirement}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div className="flex gap-3">
                                <Link 
                                  to="/contact" 
                                  className="bg-primary text-white font-medium px-6 py-2 rounded-full hover:bg-primary-dark transition-colors text-sm"
                                >
                                  Apply Now
                                </Link>
                                <button 
                                  onClick={() => togglePosition(position.id)}
                                  className="border border-neutral-200 text-neutral-dark font-medium px-6 py-2 rounded-full hover:bg-neutral-100 transition-colors text-sm"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* All positions */}
            <div className="space-y-4">
              {filteredPositions.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
                  <p className="text-neutral-dark/80">No positions match your search criteria.</p>
                </div>
              ) : (
                filteredPositions
                  .filter(p => !p.featured)
                  .map((position) => (
                    <motion.div
                      key={position.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="bg-white rounded-2xl shadow-sm border border-white/80 overflow-hidden"
                    >
                      <div 
                        className="p-6 cursor-pointer hover:bg-neutral-50/50 transition-colors duration-300"
                        onClick={() => togglePosition(position.id)}
                      >
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                          <div>
                            <h3 className="text-xl font-semibold text-primary-dark hover:text-primary transition-colors duration-300">{position.title}</h3>
                            <div className="flex flex-wrap gap-3 mt-2">
                              <div className="flex items-center gap-1 text-sm text-neutral-dark/80">
                                <Building className="h-4 w-4 text-primary/60" />
                                <span>{position.department}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-neutral-dark/80">
                                <MapPin className="h-4 w-4 text-primary/60" />
                                <span>{position.location}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm text-neutral-dark/80">
                                <Clock className="h-4 w-4 text-primary/60" />
                                <span>{position.type}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-xs text-neutral-dark/60">
                              Posted: {new Date(position.postedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                            <ChevronRight 
                              className={`h-5 w-5 text-primary transition-transform ${openPositionId === position.id ? 'rotate-90' : ''}`} 
                            />
                          </div>
                        </div>
                      </div>
                      
                      <AnimatePresence>
                        {openPositionId === position.id && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 border-t border-neutral-100 pt-4 bg-neutral-50/50">
                              <p className="text-neutral-dark/80 mb-6">{position.description}</p>
                              
                              <div className="mb-6">
                                <h4 className="font-semibold text-primary-dark mb-3 text-sm">Responsibilities:</h4>
                                <ul className="space-y-2">
                                  {position.responsibilities.map((responsibility, index) => (
                                    <li key={index} className="flex items-start text-sm">
                                      <span className="text-primary mr-2">•</span>
                                      <span className="text-neutral-dark/90">{responsibility}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div className="mb-6">
                                <h4 className="font-semibold text-primary-dark mb-3 text-sm">Requirements:</h4>
                                <ul className="space-y-2">
                                  {position.requirements.map((requirement, index) => (
                                    <li key={index} className="flex items-start text-sm">
                                      <span className="text-primary mr-2">•</span>
                                      <span className="text-neutral-dark/90">{requirement}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div className="flex gap-3">
                                <Link 
                                  to="/contact" 
                                  className="bg-primary text-white font-medium px-6 py-2 rounded-full hover:bg-primary-dark transition-colors text-sm"
                                >
                                  Apply Now
                                </Link>
                                <button 
                                  onClick={() => togglePosition(position.id)}
                                  className="border border-neutral-200 text-neutral-dark font-medium px-6 py-2 rounded-full hover:bg-neutral-100 transition-colors text-sm"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-16 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-tertiary/5 z-0"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-70 z-0"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-tertiary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-70 z-0"></div>
        
        <div className="container-fluid relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="relative bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-10 md:p-16 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="md:max-w-xl">
                  <motion.span 
                    className="inline-block text-sm uppercase tracking-widest text-white/80 font-semibold mb-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    Open Application
                  </motion.span>
                  
                  <motion.h2 
                    className="text-3xl md:text-4xl font-bold text-white mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Don't See a Suitable Position?
                  </motion.h2>
                  
                  <motion.p 
                    className="text-white/80 text-lg mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    We're always looking for talented individuals to join our team. Send us your resume and let us know how you can contribute to our mission of transforming healthcare through natural medicine innovation.
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-wrap gap-4"
                  >
                    <Link 
                      to="/contact" 
                      className="bg-white text-primary font-medium px-8 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2 group"
                    >
                      Submit Your Application
                      <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </div>
                
                <motion.div
                  className="relative w-full md:w-auto"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl max-w-sm">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white">
                        <Users className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Join Our Talent Pool</h3>
                        <p className="text-white/70 text-sm">Stay connected for future opportunities</p>
                      </div>
                    </div>
                    
                    <ul className="space-y-3 mb-6">
                      {[
                        "Receive notifications about new positions",
                        "Fast-track application process",
                        "Connect with our recruitment team"
                      ].map((benefit, index) => (
                        <li key={index} className="flex items-start text-white/80 text-sm">
                          <span className="text-tertiary mr-2 mt-1">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link 
                      to="/contact?talent=true" 
                      className="block w-full bg-white/10 hover:bg-white/20 text-white text-center font-medium py-3 rounded-xl transition-colors duration-300 border border-white/20"
                    >
                      Join Talent Pool
                    </Link>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Career;
