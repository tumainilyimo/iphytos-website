import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronLeft, ChevronRight, X, MapPin, Mail, Phone, Building, Users2, GraduationCap, Microscope, FlaskConical } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { getSocialIcon } from "@/utils/socialIcons";
import type { TeamMember as FullTeamMember } from "@/data/team";
import { teamMembers as fullTeamMembers, advisoryBoard } from "@/data/team";
import { cn } from "@/lib/utils";

type TeamMemberPreview = {
  id: number;
  name: string;
  role: string;
  image: string;
  description: string;
  section: 'leadership' | 'board' | 'sab';
};

// Custom hook for detecting outside clicks
const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]);

  return ref;
};

const teamMembers: TeamMemberPreview[] = fullTeamMembers.map(member => ({
  id: member.id,
  name: member.name,
  role: member.role,
  image: member.image,
  description: member.bio,
  section: member.section
}));

// Team Card Component
const TeamCard = ({ 
  member, 
  className, 
  onClick
}: { 
  member: TeamMemberPreview, 
  className?: string,
  onClick?: () => void
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const isMobile = useIsMobile();

  const handleMouseEnter = () => {
    if (!isMobile) setIsHovering(true);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setIsHovering(false);
  };

  return (
    <motion.div
      className={cn(
        "relative rounded-xl overflow-hidden cursor-pointer",
        "w-[260px] sm:w-[280px]",
        className
      )}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: isMobile ? 1.02 : 1.03, transition: { duration: 0.2 } }}
    >
      {/* Modern Tooltip that appears on hover */}
      <AnimatePresence>
        {isHovering && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-0 left-0 right-0 z-20 p-3 sm:p-4 bg-gradient-to-t from-black/80 via-black/60 to-transparent backdrop-blur-sm"
          >
            <div className="text-white">
              <h4 className="font-semibold text-xs sm:text-sm mb-1">More about {member.name.split(',')[0]}</h4>
              <p className="text-xs text-white/80 line-clamp-2 mb-2">{member.description}</p>
              <div className="flex items-center text-[10px] sm:text-xs text-white/90">
                <span className="inline-flex items-center">
                  Click to view profile
                  <ChevronRight size={10} className="ml-1" />
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card Content */}
      <div className="relative overflow-hidden bg-neutral-100 group w-full h-[260px] sm:h-[280px]">
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
        />
        
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70"></div>
        
        {/* Member info at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white z-10">
          <h3 className="font-bold text-sm sm:text-base line-clamp-1">
            {member.name.split(',')[0]}
          </h3>
          <p className="text-[10px] sm:text-xs text-white/80 mt-0.5 sm:mt-1 line-clamp-1">
            {member.role.split('|')[0].trim()}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Team = () => {
  const isMobile = useIsMobile();
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedMember, setSelectedMember] = useState<FullTeamMember | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'team' | 'advisors'>('team');
  
  // Use separate arrays for team and advisory board members
  const coreTeamMembers = teamMembers.filter(member => member.section === 'leadership');
  const advisoryMembers = advisoryBoard;
  
  // Handle body scroll lock when modal is open
  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedMember]);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedMember) return;
      
      if (e.key === 'ArrowLeft') {
        handlePrevMember(e as unknown as React.MouseEvent);
      } else if (e.key === 'ArrowRight') {
        handleNextMember(e as unknown as React.MouseEvent);
      } else if (e.key === 'Escape') {
        setSelectedMember(null);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMember, currentIndex]);
  
  // Ref for modal content to detect outside clicks
  const modalRef = useOutsideClick(() => setSelectedMember(null));
  
  // Find the full team member details when a preview member is selected
  const handleMemberClick = (previewMember: TeamMemberPreview) => {
    const isAdvisor = previewMember.section === 'sab';
    const fullMember = isAdvisor 
      ? advisoryBoard.find(m => m.name === previewMember.name)
      : fullTeamMembers.find(m => m.name === previewMember.name);

    if (fullMember) {
      setSelectedMember(fullMember);
      const sourceArray = isAdvisor ? advisoryBoard : fullTeamMembers;
      const index = sourceArray.findIndex(m => m.name === fullMember.name);
      setCurrentIndex(Math.max(0, index));
    }
  };
  
  const handlePrevMember = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedMember) return;
    
    const isAdvisor = selectedMember.section === 'sab';
    const sourceArray = isAdvisor ? advisoryBoard : fullTeamMembers;
    const prevIndex = (currentIndex - 1 + sourceArray.length) % sourceArray.length;
    setSelectedMember(sourceArray[prevIndex]);
    setCurrentIndex(prevIndex);
  };
  
  const handleNextMember = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedMember) return;
    
    const isAdvisor = selectedMember.section === 'sab';
    const sourceArray = isAdvisor ? advisoryBoard : fullTeamMembers;
    const nextIndex = (currentIndex + 1) % sourceArray.length;
    setSelectedMember(sourceArray[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-neutral-light/30 relative overflow-hidden">
      <div className="container-fluid">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-primary/10 text-primary mb-4 sm:mb-6 text-base sm:text-lg font-semibold tracking-wide"
          >
            <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-primary animate-pulse" />
            Our Leadership
          </motion.div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-dark mb-4 sm:mb-6 px-4 sm:px-0">
            Meet the Leadership Behind
            <span className="relative ml-2 sm:ml-3">
              <span className="relative z-10 text-primary">Our Innovation</span>
              <motion.svg
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute -bottom-2 left-0 w-full"
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
          <p className="text-lg text-neutral-dark/80 max-w-2xl mx-auto">
            Meet the leadership behind our innovative natural medicines and biotech research
          </p>

          {/* Tabs Navigation */}
          <div className="flex justify-center mt-12">
            <motion.div 
              className="inline-flex p-1.5 bg-neutral-100/50 backdrop-blur-sm rounded-2xl shadow-inner"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {[
                { 
                  id: 'team', 
                  label: 'Leadership', 
                  icon: <Users2 size={20} className="text-primary group-hover:text-primary/80" />
                },
                { 
                  id: 'advisors', 
                  label: 'Scientific Advisory Board', 
                  icon: <Microscope size={20} className="text-primary group-hover:text-primary/80" />
                }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'team' | 'advisors')}
                  className={`group relative px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300
                    ${activeTab === tab.id ? 'text-primary' : 'text-neutral-dark/60 hover:text-neutral-dark'}
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {tab.icon}
                    {tab.label}
                  </span>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-white rounded-xl shadow-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Team grid section */}
      <div className="container-fluid overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {isMobile ? (
              <div className="relative px-4">
                {activeTab === 'team' ? (
                  <div className="flex overflow-x-auto gap-4 snap-x snap-mandatory scrollbar-hide pb-6 -mx-4 px-4">
                    {coreTeamMembers.map((member) => (
                      <TeamCard 
                        key={member.id} 
                        member={member}
                        className="flex-shrink-0 snap-center"
                        onClick={() => handleMemberClick(member)}
                      />
                    ))}
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/70 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl"
                  >
                    <div className="relative">
                      {/* Background pattern */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                      <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                      
                      {/* Content */}
                      <div className="relative p-6 sm:p-8">
                        <div className="flex flex-col gap-6">
                          {/* Description */}
                          <div className="relative">
                            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary/30 to-transparent rounded-full" />
                            <p className="pl-4 text-neutral-dark/80 leading-relaxed text-sm">
                              At iPhytos, our Scientific Advisory Board is composed of accomplished professionals who are leaders in their respective fields. Their expertise provides strategic insight that drives the company's growth and fuels the development of next-generation phytotherapy—medicines that are safe, more effective, and precisely targeted.
                            </p>
                          </div>

                          {/* Placeholders */}
                          <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                              <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative bg-white/50 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-neutral-100/50 hover:bg-white/80 transition-all duration-300"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 rounded-xl bg-neutral-100/80 animate-pulse" />
                                  <div className="flex-1 space-y-2">
                                    <div className="h-4 w-32 bg-neutral-100/80 rounded-full animate-pulse" />
                                    <div className="h-3 w-24 bg-neutral-100/80 rounded-full animate-pulse" />
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div className="absolute left-0 top-0 bottom-6 w-4 bg-gradient-to-r from-white to-transparent" />
                <div className="absolute right-0 top-0 bottom-6 w-4 bg-gradient-to-l from-white to-transparent" />
              </div>
            ) : (
              <div className="max-w-7xl mx-auto px-4">
                <motion.div 
                  className="bg-neutral-50/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  {activeTab === 'team' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                      {coreTeamMembers.map((member, index) => (
                        <motion.div
                          key={member.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
                        >
                          <TeamCard 
                            member={member}
                            onClick={() => handleMemberClick(member)}
                          />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="max-w-5xl mx-auto">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative bg-white/70 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl"
                      >
                        {/* Background effects */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                        <div className="absolute -top-48 -right-48 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                        
                        {/* Content */}
                        <div className="relative p-8 md:p-12">
                          <div className="grid gap-8 md:gap-12">
                            

                            {/* Description */}
                            <div className="relative">
                              <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-primary/30 to-transparent rounded-full" />
                              <p className="pl-6 text-lg text-neutral-dark/80 leading-relaxed">
                                At iPhytos, our Scientific Advisory Board is composed of accomplished professionals who are leaders in their respective fields. Their expertise provides strategic insight that drives the company's growth and fuels the development of next-generation phytotherapy—medicines that are safe, more effective, and precisely targeted.
                              </p>
                            </div>

                            {/* Placeholders */}
                            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                              {[1, 2, 3, 4].map((i) => (
                                <motion.div 
                                  key={i}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="group relative bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-neutral-100/50 hover:bg-white/80 transition-all duration-300 hover:shadow-lg"
                                >
                                  <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 rounded-xl bg-neutral-100/80 animate-pulse" />
                                    <div className="flex-1 space-y-3">
                                      <div className="h-5 w-48 bg-neutral-100/80 rounded-full animate-pulse" />
                                      <div className="h-4 w-32 bg-neutral-100/80 rounded-full animate-pulse" />
                                    </div>
                                  </div>
                                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/10 rounded-2xl transition-all duration-300" />
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Detailed Member Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50 overflow-y-auto backdrop-blur-md"
            onClick={() => setSelectedMember(null)}
          >
            <div className="min-h-screen px-2 sm:px-4 py-4 sm:py-6 flex items-center justify-center">
              <motion.div
                ref={modalRef}
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden my-2 sm:my-4 relative shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                {/* Navigation buttons for desktop */}
                {!isMobile && (
                  <>
                    <button
                      onClick={handlePrevMember}
                      className="hidden md:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-primary p-2 sm:p-3 rounded-full shadow-xl"
                      aria-label="Previous team member"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={handleNextMember}
                      className="hidden md:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-primary p-2 sm:p-3 rounded-full shadow-xl"
                      aria-label="Next team member"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
                
                {/* Close button */}
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute right-2 sm:right-4 top-2 sm:top-4 z-20 bg-white/90 hover:bg-white text-neutral-dark p-1.5 sm:p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
                
                <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
                  {/* Image section */}
                  <div className="relative md:w-2/5 overflow-hidden">
                    <div className="h-[280px] sm:h-[400px] md:h-full relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-dark/20 mix-blend-multiply z-10"></div>
                      <img 
                        src={selectedMember.image} 
                        alt={selectedMember.name} 
                        className="w-full h-full object-cover object-[center_15%]"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 to-transparent md:hidden z-10">
                        <h3 className="text-xl sm:text-2xl font-bold text-white">{selectedMember.name}</h3>
                        <p className="text-sm sm:text-base text-white/80">{selectedMember.role.split('|')[0].trim()}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content section */}
                  <div className="md:w-3/5 p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto max-h-[60vh] md:max-h-[90vh]">
                    <div className="hidden md:block mb-6">
                      <h3 className="text-2xl sm:text-3xl font-bold text-primary mb-2">{selectedMember.name}</h3>
                      <p className="text-base sm:text-lg text-neutral-dark/70">{selectedMember.role}</p>
                    </div>
                    
                    {selectedMember.location && (
                      <div className="flex items-center text-sm sm:text-base text-neutral-dark/70 mb-4 sm:mb-6">
                        <MapPin size={16} className="mr-2 flex-shrink-0 text-primary" />
                        <span>{selectedMember.location}</span>
                      </div>
                    )}
                    
                    <div className="mb-6 sm:mb-8">
                      <h4 className="text-base sm:text-lg font-semibold text-primary-dark mb-2 sm:mb-3 flex items-center">
                        <span className="w-6 sm:w-8 h-1 bg-primary rounded-full mr-2 sm:mr-3"></span>
                        About
                      </h4>
                      <p className="text-sm sm:text-base text-neutral-dark/80 leading-relaxed">
                        {selectedMember.longBio || selectedMember.bio}
                      </p>
                    </div>
                    
                    {selectedMember.expertise && selectedMember.expertise.length > 0 && (
                      <div className="mb-6 sm:mb-8">
                        <h4 className="text-base sm:text-lg font-semibold text-primary-dark mb-2 sm:mb-3 flex items-center">
                          <span className="w-6 sm:w-8 h-1 bg-primary rounded-full mr-2 sm:mr-3"></span>
                          Expertise
                        </h4>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {selectedMember.expertise.map((skill, index) => (
                            <span 
                              key={index} 
                              className="bg-primary/10 text-primary px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {selectedMember.contact && (
                      <div className="mb-6">
                        <h4 className="text-base sm:text-lg font-semibold text-primary-dark mb-2 sm:mb-3 flex items-center">
                          <span className="w-6 sm:w-8 h-1 bg-primary rounded-full mr-2 sm:mr-3"></span>
                          Contact
                        </h4>
                        <div className="space-y-2 sm:space-y-3">
                          {selectedMember.contact.email && (
                            <div className="flex items-center">
                              <Mail size={16} className="mr-2 sm:mr-3 text-primary" />
                              <a 
                                href={`mailto:${selectedMember.contact.email}`} 
                                className="text-sm sm:text-base text-primary hover:text-primary-dark transition-colors"
                              >
                                {selectedMember.contact.email}
                              </a>
                            </div>
                          )}
                          {selectedMember.contact.phone && (
                            <div className="flex items-center text-sm sm:text-base">
                              <Phone size={16} className="mr-2 sm:mr-3 text-primary" />
                              <span>{selectedMember.contact.phone}</span>
                            </div>
                          )}
                          {selectedMember.contact.office && (
                            <div className="flex items-center text-sm sm:text-base">
                              <Building size={16} className="mr-2 sm:mr-3 text-primary" />
                              <span>{selectedMember.contact.office}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Social links */}
                    {selectedMember.socialLinks && Object.keys(selectedMember.socialLinks).length > 0 && (
                      <div className="flex gap-3 sm:gap-4 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-neutral-200">
                        {Object.entries(selectedMember.socialLinks).map(([platform, url]) => (
                          <a 
                            key={platform}
                            href={url as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-dark/70 hover:text-primary transition-colors p-1.5 sm:p-2 bg-neutral-100 rounded-full hover:bg-primary/10"
                          >
                            <Mail size={18} />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Mobile navigation */}
                {isMobile && (
                  <div className="flex justify-between p-3 sm:p-4 bg-white border-t border-neutral-100">
                    <button
                      onClick={handlePrevMember}
                      className="flex items-center text-neutral-dark hover:text-primary transition-colors px-3 sm:px-4 py-1.5 sm:py-2 bg-neutral-50 rounded-full text-sm"
                    >
                      <ChevronLeft size={14} className="mr-1" />
                      Previous
                    </button>
                    <button
                      onClick={handleNextMember}
                      className="flex items-center text-neutral-dark hover:text-primary transition-colors px-3 sm:px-4 py-1.5 sm:py-2 bg-neutral-50 rounded-full text-sm"
                    >
                      Next
                      <ChevronRight size={14} className="ml-1" />
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Team;
