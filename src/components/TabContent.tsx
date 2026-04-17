import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Code, ChevronRight, FlaskConical, Users, Dna, Check, Rat, TestTubes } from 'lucide-react';

interface TabContentProps {
  activeTab: string;
}

const TabContent: React.FC<TabContentProps> = ({ activeTab }) => {
  return (
    <>
      {/* Modern Registered Medicines */}
      {activeTab === 'medicines' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
          {/* URIPHYTOL Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col"
          >
            <Link
              to="/products/uriphytol"
              className="group relative bg-gradient-to-br from-white to-primary/5 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl block"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-rgb),0.1),transparent_50%)] group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="relative p-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className="relative z-10">
                  <div className="mb-6 perspective-1000">
                    <motion.div 
                      className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl transform-gpu group-hover:rotate-y-12 transition-transform duration-500"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 z-10 group-hover:from-primary/40 transition-all duration-300"></div>
                      <picture>
                        <source
                          type="image/webp"
                          srcSet="/products-file/iphyos banner.webp"
                          sizes="(max-width: 640px) 100vw,
                                 (max-width: 1024px) 50vw,
                                 33vw"
                        />
                        <img
                          src="/products-file/iphyos banner.webp"
                          alt="URIPHYTOL"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      </picture>
                    </motion.div>
                  </div>

                  <div className="relative">
                    <motion.h3 
                      className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent mb-2 sm:mb-3"
                      whileHover={{ scale: 1.01 }}
                    >
                      URIPHYTOL<sup>®</sup>
                    </motion.h3>
                    <p className="text-sm sm:text-base text-neutral-600 mb-4 sm:mb-6 line-clamp-2">
                      Natural solution for prostate health and urinary disorders
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">Natural</span>
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">Clinical</span>
                      </div>
                      <div className="group-hover:translate-x-1 transition-transform duration-200">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shadow-lg">
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Coming Soon Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-col"
          >
            <div className="group relative bg-gradient-to-br from-white to-primary/5 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-rgb),0.1),transparent_50%)] group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="relative p-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className="relative z-10">
                  <div className="mb-6 perspective-1000">
                    <motion.div 
                      className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-xl transform-gpu group-hover:rotate-y-12 transition-transform duration-500"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 z-10 group-hover:from-primary/40 transition-all duration-300"></div>
                      <img
                        src="/products-file/comingsoon.jpeg"
                        alt="Coming Soon"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </motion.div>
                  </div>

                  <div className="relative">
                    <motion.h3 
                      className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent mb-2 sm:mb-3"
                      whileHover={{ scale: 1.01 }}
                    >
                      Coming Soon
                    </motion.h3>
                    <p className="text-sm sm:text-base text-neutral-600 mb-4 sm:mb-6 line-clamp-2">
                      New phytotherapy solutions targeting the root causes of Fibroids and Type 2 Diabetes.
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">Phytotherapy</span>
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">Innovation</span>
                      </div>
                      <div className="group-hover:translate-x-1 transition-transform duration-200">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shadow-lg">
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Services */}
      {activeTab === 'services' && (
        <div className="space-y-12">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-lg text-neutral-dark/80 leading-relaxed">
              We provide a range of services ranging from insilico drug screening, laboratory analysis 
              and purification/identification of active medicinal compounds to in vivo drug activities.
            </p>
          </motion.div>

          {/* Main Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
            {/* In Silico Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="group relative bg-gradient-to-br from-white to-blue-50/30 rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl inline-block">
                  <Code className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-primary-dark mb-3 sm:mb-4">In Silico Drug Profiling</h3>
                <p className="text-sm sm:text-base text-neutral-600 mb-4 sm:mb-6">
                  Our insilico tools help to make several prediction of medicinal compounds and 
                  increases the chances of success in your drug design projects.
                </p>
                <div className="space-y-3">
                  {['Molecular Modeling', 'Structure Analysis', 'Activity Prediction', 'Drug-likeness Assessment'].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-neutral-600">
                      <Check className="w-4 h-4 text-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Laboratory Analysis Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="group relative bg-gradient-to-br from-white to-green-50/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="mb-6 p-4 bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-xl inline-block">
                  <FlaskConical className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary-dark mb-4">Natural /Medical Compounds Profiling</h3>
                <p className="text-neutral-600 mb-6">
                  We have state-of-the-art technologies to analyse and purify active medicinal compounds.
                </p>
                <div className="space-y-3">
                  {['Compound Purification', 'Active Compound Identification', 'Quality Control', 'Stability Testing'].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-neutral-600">
                      <Check className="w-4 h-4 text-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* In Vivo Analysis Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="group relative bg-gradient-to-br from-white to-purple-50/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="mb-6 p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl inline-block">
                  <span className="text-3xl" role="img" aria-label="Laboratory Mouse">🐁</span>
                </div>
                <h3 className="text-xl font-bold text-primary-dark mb-4">In Vivo Efficacy And Safety Profiling</h3>
                <p className="text-neutral-600 mb-6">
                  Our pre-clinical facilities includes animal lab where we perform extensive studies 
                  of the active compounds using animal models.
                </p>
                <div className="space-y-3">
                  {['Pre-clinical Studies', 'Animal Models', 'Safety Assessment', 'Efficacy Testing'].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-neutral-600">
                      <Check className="w-4 h-4 text-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="max-w-2xl mx-auto text-center bg-gradient-to-r from-primary/5 to-primary-dark/5 rounded-2xl p-8 mt-12"
          >
            <h4 className="text-xl font-bold text-primary-dark mb-4">Ready to Start Your Project?</h4>
            <p className="text-neutral-600 mb-6">
              Let us help you bring your innovative healthcare solutions to life with our comprehensive suite of services.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition-colors duration-200"
            >
              Get Started!
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      )}

      {/* Software */}
      {activeTab === 'software' && (
        <div className="space-y-12">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center max-w-4xl mx-auto px-4"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-primary-dark mb-6">Verdia™ Suite</h3>
            <p className="text-lg text-neutral-dark/80 leading-relaxed">
              Our Verdia™ suite is developed to assist scientists and researchers accomplish their projects timely with higher success rates. 
              Integrating full pipelines for drug design and development from initial design to clinical prediction outcomes.
            </p>
          </motion.div>

          {/* Software Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            {[
              {
                title: 'VerdiaChem42',
                description: 'Advanced chemical analysis and modeling platform for drug design',
                features: [
                  'Molecular Modeling',
                  'Structure Activity Prediction',
                  'Chemical Property Analysis',
                  'Compound Library Management'
                ],
                gradient: 'from-green-600/20 to-emerald-400/20',
                icon: <FlaskConical className="w-6 h-6" />
              },
              {
                title: 'VerdiaOmics',
                description: 'Comprehensive omics data analysis and integration platform',
                features: [
                  'Multi-omics Integration',
                  'Pathway Analysis',
                  'Biomarker Discovery',
                  'Network Visualization'
                ],
                gradient: 'from-lime-600/20 to-green-500/20',
                icon: <Dna className="w-6 h-6" />
              },
              {
                title: 'VerdiaTrials',
                description: 'Clinical trial management and prediction system',
                features: [
                  'Trial Design Optimization',
                  'Outcome Prediction',
                  'Patient Stratification',
                  'Real-time Analytics'
                ],
                gradient: 'from-teal-600/20 to-emerald-500/20',
                icon: <Users className="w-6 h-6" />
              }
            ].map((software, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`group bg-gradient-to-br ${software.gradient} rounded-2xl p-6 hover:shadow-xl transition-all duration-300`}
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 inline-block mb-6">
                  {React.cloneElement(software.icon, { className: 'text-primary' })}
                </div>
                <h3 className="text-2xl font-bold text-primary-dark mb-3">{software.title}</h3>
                <p className="text-neutral-700 mb-6">{software.description}</p>
                <ul className="space-y-3">
                  {software.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-neutral-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="max-w-3xl mx-auto mt-16 text-center px-4"
          >
            <div className="bg-gradient-to-r from-primary/10 to-tertiary/10 rounded-2xl p-8 backdrop-blur-sm">
              <h4 className="text-2xl font-bold text-primary-dark mb-4">Want to Test Our Tools?</h4>
              <p className="text-neutral-600 mb-6">
                Experience the power of Verdia™ suite with a personalized demo tailored to your research needs.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full hover:bg-primary-dark transition-colors duration-200 group"
              >
                Request Demo
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default TabContent; 