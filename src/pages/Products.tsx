import React, { useState, useCallback, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Leaf, Stethoscope, Code, ChevronRight, Pill, ActivitySquare, Server, Check, ChevronUp, ChevronDown, Microscope } from 'lucide-react';

// Lazy load heavy components
const LazyTabContent = lazy(() => import('../components/TabContent'));

const Products = () => {
  const [activeTab, setActiveTab] = useState('medicines');
  const [activeFaqTab, setActiveFaqTab] = useState('general');
  const [expandedFaq, setExpandedFaq] = useState<number>(-1);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const toggleFaq = useCallback((index: number) => {
    setExpandedFaq(current => current === index ? -1 : index);
  }, []);

  const generalFaqs = [
    {
      q: "What makes iPhytos products unique?",
      a: "Our products combine traditional herbal medicine with modern scientific methods. Each product is developed through rigorous research, clinical testing, and quality control processes to ensure safety and effectiveness."
    },
    {
      q: "Are your medicines natural?",
      a: "Yes, all our medicines are derived from natural sources. We use advanced technology to identify, extract, and optimize the therapeutic compounds found in nature while maintaining their natural properties."
    },
    {
      q: "How are your products tested?",
      a: <>
        Our products undergo a comprehensive testing process that includes:
        <ul className="mt-3 space-y-2">
          <li className="flex items-start">
            <Check size={16} className="text-primary mt-1 mr-3 flex-shrink-0" />
            <span>Rigorous laboratory testing to ensure quality and potency</span>
          </li>
          <li className="flex items-start">
            <Check size={16} className="text-primary mt-1 mr-3 flex-shrink-0" />
            <span>Clinical trials and evaluations for efficacy</span>
          </li>
          <li className="flex items-start">
            <Check size={16} className="text-primary mt-1 mr-3 flex-shrink-0" />
            <span>Continuous quality control monitoring at every production stage</span>
          </li>
          <li className="flex items-start">
            <Check size={16} className="text-primary mt-1 mr-3 flex-shrink-0" />
            <span>Comprehensive safety assessments and compliance checks</span>
          </li>
        </ul>
      </>
    },
    {
      q: "Where can I buy iPhytos products?",
      a: <>
        Our products are available through our trusted distribution network:
        <ul className="mt-3 space-y-2">
          <li className="flex items-start">
            <Check size={16} className="text-primary mt-1 mr-3 flex-shrink-0" />
            <span>Licensed pharmacies and medical stores</span>
          </li>
          <li className="flex items-start">
            <Check size={16} className="text-primary mt-1 mr-3 flex-shrink-0" />
            <span>Authorized healthcare distributors</span>
          </li>
          <li className="flex items-start">
            <Check size={16} className="text-primary mt-1 mr-3 flex-shrink-0" />
            <span>Registered healthcare facilities and clinics</span>
          </li>
          <li className="flex items-start">
            <Check size={16} className="text-primary mt-1 mr-3 flex-shrink-0" />
            <span>Official iPhytos medical centers</span>
          </li>
        </ul>
      </>
    },
    {
      q: "What support services do you offer?",
      a: <>
        We provide a comprehensive range of support services:
        <ul className="mt-3 space-y-2">
          <li className="flex items-start">
            <Check size={16} className="text-primary mt-1 mr-3 flex-shrink-0" />
            <span>Professional healthcare consulting and guidance</span>
          </li>
          <li className="flex items-start">
            <Check size={16} className="text-primary mt-1 mr-3 flex-shrink-0" />
            <span>Collaborative research & development partnerships</span>
          </li>
          <li className="flex items-start">
            <Check size={16} className="text-primary mt-1 mr-3 flex-shrink-0" />
            <span>Advanced quality assurance and testing services</span>
          </li>
          <li className="flex items-start">
            <Check size={16} className="text-primary mt-1 mr-3 flex-shrink-0" />
            <span>24/7 technical support for our software solutions</span>
          </li>
        </ul>
      </>
    }
  ];

  const uriphytolFaqs = [
    {
      q: "What is URIPHYTOL?",
      a: "URIPHYTOL is a clinically tested herbal medicine formulated to treat and manage Benign Prostatic Hyperplasia (BPH). It helps reduce prostate enlargement, improve urinary flow, and restore normal bladder function."
    },
    {
      q: "How does URIPHYTOL work?",
      a: <>
        URIPHYTOL contains potent medicinal plant extracts that:
        <ul className="mt-3 space-y-2">
          <li className="flex items-start">
            <Check size={16} className="text-primary mt-1 mr-3 flex-shrink-0" />
            <span>Reduce prostate size and inflammation</span>
          </li>
          <li className="flex items-start">
            <Check size={16} className="text-primary mt-1 mr-3 flex-shrink-0" />
            <span>Improve urine flow and bladder emptying</span>
          </li>
          <li className="flex items-start">
            <Check size={16} className="text-primary mt-1 mr-3 flex-shrink-0" />
            <span>Relieve frequent urination, especially at night</span>
          </li>
          <li className="flex items-start">
            <Check size={16} className="text-primary mt-1 mr-3 flex-shrink-0" />
            <span>Support hormonal balance and slow BPH progression</span>
          </li>
          <li className="flex items-start">
            <Check size={16} className="text-primary mt-1 mr-3 flex-shrink-0" />
            <span>Offer prophylactic (protective) effects, helping prevent prostate enlargement in men at risk</span>
          </li>
        </ul>
      </>
    },
    {
      q: "Is URIPHYTOL a supplement?",
      a: "No. URIPHYTOL is a herbal medicine, not a supplement. It has undergone clinical evaluation and is designed to treat BPH, not just provide general prostate support like dietary supplements."
    },
    {
      q: "Who should use URIPHYTOL?",
      a: <>
        URIPHYTOL is recommended for men who:
        <ul className="mt-3 space-y-2">
          <li className="flex items-start">
            <Check size={16} className="text-primary mt-1 mr-3 flex-shrink-0" />
            <span>Have been diagnosed with BPH</span>
          </li>
          <li className="flex items-start">
            <Check size={16} className="text-primary mt-1 mr-3 flex-shrink-0" />
            <span>Experience symptoms such as weak urine flow, frequent urination, and incomplete bladder emptying</span>
          </li>
          <li className="flex items-start">
            <Check size={16} className="text-primary mt-1 mr-3 flex-shrink-0" />
            <span>Want to prevent prostate enlargement due to its prophylactic effects</span>
          </li>
        </ul>
      </>
    },
    {
      q: "How long does it take to see results?",
      a: "Many users experience symptom relief within a few weeks, but for optimal therapeutic benefits, URIPHYTOL should be taken for at least 3 months as directed by a healthcare provider."
    },
    {
      q: "Is URIPHYTOL safe?",
      a: "Yes. URIPHYTOL is formulated using clinically tested herbal ingredients and is free from synthetic chemicals. It has undergone safety and efficacy evaluations, ensuring its reliability as a treatment for BPH."
    },
    {
      q: "Does URIPHYTOL have any side effects?",
      a: "URIPHYTOL is generally well tolerated. Side effects are rare, but in some cases, mild digestive discomfort may occur, which usually resolves with continued use."
    },
    {
      q: "How should URIPHYTOL be taken?",
      a: "URIPHYTOL should be taken as prescribed by a healthcare professional. The dosage and duration depend on the severity of your condition. Follow the instructions carefully for the best results."
    },
    {
      q: "Can URIPHYTOL be taken with other BPH medications?",
      a: "For BPH treatment, we recommend using URIPHYTOL alone for maximum effectiveness. While URIPHYTOL is generally safe, co-administration with other BPH medications is not advised, as it may alter the therapeutic effects. Consult your doctor before combining it with other treatments."
    },
    {
      q: "What makes URIPHYTOL different from other BPH treatments?",
      a: <>
        URIPHYTOL is unique because:
        <ul className="mt-3 space-y-2">
          <li className="flex items-start">
            <Check size={16} className="text-primary mt-1 mr-3 flex-shrink-0" />
            <span>It is a registered herbal medicine, not just a supplement</span>
          </li>
          <li className="flex items-start">
            <Check size={16} className="text-primary mt-1 mr-3 flex-shrink-0" />
            <span>It has been clinically evaluated for effectiveness</span>
          </li>
          <li className="flex items-start">
            <Check size={16} className="text-primary mt-1 mr-3 flex-shrink-0" />
            <span>It treats the root cause of BPH, not just symptoms</span>
          </li>
          <li className="flex items-start">
            <Check size={16} className="text-primary mt-1 mr-3 flex-shrink-0" />
            <span>It has prophylactic properties, helping prevent prostate enlargement</span>
          </li>
          <li className="flex items-start">
            <Check size={16} className="text-primary mt-1 mr-3 flex-shrink-0" />
            <span>It is natural and free from synthetic chemicals</span>
          </li>
        </ul>
      </>
    },
    {
      q: "Where can I buy URIPHYTOL?",
      a: <>
        URIPHYTOL is available at:
        <ul className="mt-3 space-y-2">
          <li className="flex items-start">
            <Check size={16} className="text-primary mt-1 mr-3 flex-shrink-0" />
            <span>Pharmacies and hospitals</span>
          </li>
          <li className="flex items-start">
            <Check size={16} className="text-primary mt-1 mr-3 flex-shrink-0" />
            <span>Authorized iPhytos products / medicine distributors</span>
          </li>
          <li className="flex items-start">
            <Check size={16} className="text-primary mt-1 mr-3 flex-shrink-0" />
            <span>Our official website & clinics</span>
          </li>
        </ul>
        <p className="mt-3">For orders and inquiries, contact info@iphytos.co.tz or +255752943392</p>
      </>
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Hero Section - Optimized with hardware acceleration */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary to-primary-dark pt-24 pb-16 will-change-transform">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,rgba(255,255,255,0)_70%)]" />
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0,rgba(255,255,255,0)_70%)]" />
        </div>
        
        <div className="container-fluid relative z-10">
          <div className="max-w-5xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{ opacity, scale }}
              className="will-change-transform"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4">
                Our Products & Services
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto px-4 sm:px-6">
                Discover our comprehensive range of healthcare solutions, from natural medicines to innovative software
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tabs Section - Optimized with reduced motion */}
      <section className="py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-neutral-50"></div>
        <div className="container-fluid relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Futuristic Tabs Navigation - Optimized animations */}
            <div className="relative">
              <div className="absolute -inset-[100px] bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.1),transparent_70%)]"></div>
              <div className="relative flex flex-row gap-1 sm:gap-2 rounded-2xl bg-white/60 backdrop-blur-md p-1 sm:p-2 mb-8 sm:mb-12 mx-4 sm:mx-0 shadow-lg border border-white/20">
                {[
                  { 
                    id: 'medicines', 
                    label: 'Medicines', 
                    icon: <Pill size={16} className="sm:w-5 sm:h-5" />,
                    gradient: 'from-primary-dark to-primary'
                  },
                  { 
                    id: 'services', 
                    label: 'Services', 
                    icon: <ActivitySquare size={16} className="sm:w-5 sm:h-5" />,
                    gradient: 'from-tertiary-dark to-tertiary'
                  },
                  { 
                    id: 'software', 
                    label: 'Software', 
                    icon: <Server size={16} className="sm:w-5 sm:h-5" />,
                    gradient: 'from-emerald-700 to-emerald-500'
                  }
                ].map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex-1 relative group min-w-0"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400,
                      damping: 17,
                      mass: 0.8
                    }}
                  >
                    <div className={`
                      absolute inset-0 rounded-xl bg-gradient-to-r ${tab.gradient} opacity-0 
                      transition-opacity duration-200
                      ${activeTab === tab.id ? 'opacity-10' : ''}
                    `}></div>
                    <div className={`
                      relative flex items-center justify-center gap-1 sm:gap-3 px-1 sm:px-4 py-2 sm:py-4 rounded-xl
                      transition-colors duration-200 text-center
                      ${activeTab === tab.id 
                        ? 'bg-gradient-to-r ' + tab.gradient + ' text-white shadow-lg'
                        : 'text-neutral-600 hover:text-primary-dark'
                      }
                    `}>
                      <div className={`${activeTab === tab.id ? 'animate-pulse' : ''} flex-shrink-0`}>
                        {tab.icon}
                      </div>
                      <span className="font-medium text-[10px] sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis">{tab.label}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Tab Content - Lazy loaded with Suspense */}
            <div className="mt-8">
              <Suspense fallback={
                <div className="flex items-center justify-center min-h-[200px]">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              }>
                <LazyTabContent activeTab={activeTab} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Optimized with Intersection Observer */}
      <section className="py-10 sm:py-16 bg-gradient-to-b from-white to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-primary/5 [mask-image:radial-gradient(white,transparent_85%)]"></div>
        
        <div className="container-fluid px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            <motion.div 
              className="text-center mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-neutral-dark/80 max-w-2xl mx-auto">
                Find answers to common questions about our products and services
              </p>
            </motion.div>

            {/* FAQ Tabs */}
            <div className="mb-8">
              <div className="flex gap-2 justify-center">
                {['general', 'uriphytol'].map((tab) => (
                  <motion.button
                    key={tab}
                    onClick={() => setActiveFaqTab(tab)}
                    className={`
                      px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                      ${activeFaqTab === tab 
                        ? 'bg-primary text-white shadow-lg' 
                        : 'bg-white/60 text-neutral-600 hover:bg-white hover:text-primary'}
                    `}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {(activeFaqTab === 'general' ? generalFaqs : uriphytolFaqs).map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl shadow-lg border border-neutral-100/50 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <button
                    className={`w-full text-left p-4 sm:p-6 flex items-start justify-between gap-3 sm:gap-4 transition-all duration-300 ${
                      expandedFaq === index 
                        ? 'bg-gradient-to-r from-primary/5 to-transparent rounded-t-xl' 
                        : 'hover:bg-neutral-50 rounded-xl'
                    }`}
                    onClick={() => toggleFaq(index)}
                    aria-expanded={expandedFaq === index}
                    aria-controls={`faq-content-${index}`}
                  >
                    <span className="font-semibold text-primary-dark text-sm sm:text-base">{faq.q}</span>
                    <motion.div
                      animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-primary"
                    >
                      {expandedFaq === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </motion.div>
                  </button>
                  
                  <motion.div
                    id={`faq-content-${index}`}
                    initial={false}
                    animate={{
                      height: expandedFaq === index ? 'auto' : 0,
                      opacity: expandedFaq === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 sm:p-6 pt-0 text-neutral-dark/80 leading-relaxed">
                      <div className="text-sm sm:text-base">
                        {typeof faq.a === 'string' ? (
                          faq.a
                        ) : (
                          faq.a
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Contact Us Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-8 sm:mt-12 mx-4 sm:mx-0 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-neutral-100/50"
            >
              <div className="p-6 sm:p-8 md:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
                <div className="text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-dark mb-2 sm:mb-3">Still have questions?</h3>
                  <p className="text-sm sm:text-base text-neutral-dark/80">
                    Contact our team for detailed information about our products and services
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Link 
                    to="/contact"
                    className="bg-primary text-white font-medium px-8 py-3 rounded-full hover:bg-primary-dark hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 flex items-center gap-2"
                  >
                    Contact Us
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;