import {
  ArrowLeft,
  Check,
  Shield,
  Activity,
  Zap,
  Clock,
  Calendar,
  AlertTriangle,
  Info,
  ArrowRight,
  Phone,
  Mail,
  MessageCircle,
  Loader2,
  Heart
} from 'lucide-react';
import { useState, FormEvent, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { type HTMLMotionProps } from 'framer-motion';
import { sendEmail } from '../services/emailService';
import { toast } from 'sonner';

// Form types
interface OrderFormData {
  fullName: string;
  phone: string;
  email: string;
  location: string;
  quantity: number;
  contactMethod: 'phone' | 'whatsapp' | 'email';
  notes: string;
  formType: 'order' | 'contact';
}

// Optimized animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Optimized section component
const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "0px 0px -100px 0px"
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ delay }}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
};

const Products: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("what_is");
  const [formStep, setFormStep] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<OrderFormData>({
    fullName: '',
    phone: '',
    email: '',
    location: '',
    quantity: 1,
    contactMethod: 'phone',
    notes: '',
    formType: 'order'
  });

  // Optimize scroll animations
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Prepare email data from form data
      const emailData = {
        to: 'info@iphytos.co.tz',
        subject: 'New URIPHYTOL Order',
        name: formData.fullName,
        email: formData.email || 'no-email@provided.com',
        formType: formData.formType,
        message: `Order Details:
          Phone: ${formData.phone}
          Location: ${formData.location}
          Quantity: ${formData.quantity}
          Contact Method: ${formData.contactMethod}
          Notes: ${formData.notes || 'No additional notes'}`
      };

      const response = await sendEmail(emailData);

      if (response.success) {
        toast.success('Order submitted successfully!', {
          description: 'We will contact you shortly to confirm your order.',
          duration: 5000,
        });
        // Reset form
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          location: '',
          quantity: 1,
          contactMethod: 'phone',
          notes: '',
          formType: 'order'
        });
        setFormStep(0);
      } else {
        toast.error('Failed to submit order', {
          description: response.error || 'Please try again.',
          duration: 5000,
        });
      }
    } catch (error) {
      console.error('Order submission error:', error);
      toast.error('An error occurred', {
        description: 'Failed to submit your order. Please try again.',
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextStep = () => {
    setFormStep(formStep + 1);
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
    setFormData(prev => ({ ...prev, quantity: prev.quantity + 1 }));
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
      setFormData(prev => ({ ...prev, quantity: prev.quantity - 1 }));
    }
  };

  // Lazy load images
  useEffect(() => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));

    return () => imageObserver.disconnect();
  }, []);

  return (
    <div className="pt-0">
      {/* Hero Section - Optimized */}
      <section className="bg-gradient-to-b from-primary to-primary-dark pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 md:pb-16 lg:pb-24 text-white relative">
        <div className="container-fluid px-4 sm:px-6">
          <AnimatedSection className="absolute top-4 sm:top-8 left-2 sm:left-4 md:left-8">
            <Link
              to="/products"
              className="group inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all duration-300 border border-white/20"
            >
              <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Products
            </Link>
          </AnimatedSection>

          <div className="max-w-5xl mx-auto text-center pt-8 sm:pt-12 md:pt-16">
            <AnimatedSection>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                URIPHYTOL<sup>®</sup> - 500 mg
              </h1>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-4 font-light px-4 sm:px-6 md:px-8">
                Solve the Mystery of Enlarged Prostate (BPH), Loss of Libido and Erectile Dysfunction
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 sm:mt-8 px-2 sm:px-4">
                {[
                  "One Dose, Triple Action",
                  "Lasting BPH Relief"
                ].map((tag, index) => (
                  <span
                    key={index}
                    className="bg-white/20 backdrop-blur-sm px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-[10px] sm:text-xs md:text-sm font-medium whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="mt-8 sm:mt-10">
                <a href="#product-details" className="btn btn-white text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
                  Learn More
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Featured Product Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20" id="product-details">
        <div className="container-fluid px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-12">
              {/* Product Image */}
              <motion.div
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-elevated border border-gray-100 h-full flex flex-col">
                  <div className="relative mb-6 sm:mb-8">
                    <img
                      data-src="/products-file/iphyos banner.webp"
                      alt="URIPHYTOL Product"
                      className="w-full h-auto rounded-lg shadow-md max-w-[200px] sm:max-w-xs md:max-w-sm mx-auto lg:mx-0"
                      loading="lazy"
                    />
                  </div>

                  <div className="bg-primary/5 rounded-xl p-3 sm:p-4 md:p-6 mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-primary mb-2 sm:mb-3 md:mb-4">The Reason Why Men Trust URIPHYTOL</h3>
                    <ul className="space-y-2 sm:space-y-3">
                      {[
                        "No more frequent urination",
                        "No more urgency",
                        "Improved quality of life",
                        "Better flow with comfortable urination",
                        "Libido and erectile dysfunction addressed",
                        "Natural with higher safety profile"
                      ].map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <Check size={16} className="text-primary mr-2 mt-1 flex-shrink-0 sm:w-5 sm:h-5" />
                          <span className="text-sm sm:text-base text-neutral-dark">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-tertiary/10 rounded-xl p-3 sm:p-4 md:p-6">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-tertiary mb-2 sm:mb-3 md:mb-4">Clinical Results</h3>
                    <p className="text-sm sm:text-base text-neutral-dark/80 mb-3 sm:mb-4">
                      URIPHYTOL has been clinically proven to treat BPH with:
                    </p>
                    <ul className="space-y-2 sm:space-y-3">
                      {[
                        "Symptom relief within days to weeks",
                        "Enhanced bladder emptying",
                        "Improved quality of life scores",
                        "Better erectile function compared to conventional treatments"
                      ].map((result, index) => (
                        <li key={index} className="flex items-start">
                          <Activity size={16} className="text-tertiary mr-2 mt-1 flex-shrink-0 sm:w-5 sm:h-5" />
                          <span className="text-sm sm:text-base text-neutral-dark">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Product Info Tabs */}
              <motion.div
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-elevated border border-gray-100 h-full flex flex-col">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-2 sm:mb-3 md:mb-4">URIPHYTOL<sup>®</sup> - 500 mg</h2>
                  <p className="text-sm sm:text-base md:text-lg text-neutral-dark/80 mb-4 sm:mb-6">
                    Long lasting results for BPH and LUTS
                  </p>

                  {/* Tabs Navigation */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
                    {[
                      { id: "what_is", label: "Overview" },
                      { id: "how_works", label: "Mechanism of Action" },
                      { id: "benefits", label: "Clinical Results" },
                      { id: "dosage", label: "Dosage & Safety" },
                      { id: "availability", label: "Where to Buy" }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        className={`px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-neutral-dark hover:bg-gray-200"
                          }`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="mt-4 sm:mt-6 flex-grow overflow-y-auto pr-2 custom-scrollbar">
                    {activeTab === "what_is" && (
                      <div>
                        <p className="text-neutral-dark/80 mb-4">
                          URIPHYTOL® is a clinically validated herbal medicine specifically formulated for the treatment of Benign Prostatic Hyperplasia (BPH). Through extensive scientific research and clinical trials, URIPHYTOL® offers a natural and effective solution for men experiencing urinary challenges associated with an enlarged prostate.
                        </p>

                        <div className="bg-primary/5 p-4 rounded-lg mb-4">
                          <h4 className="text-base sm:text-lg md:text-xl font-medium text-primary mb-2 sm:mb-3">Symptoms of enlarged prostate(BPH)</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <Check size={18} className="text-primary mr-2 mt-1 flex-shrink-0" />
                              <span>Frequent urination, especially during nighttime</span>
                            </li>
                            <li className="flex items-start">
                              <Check size={18} className="text-primary mr-2 mt-1 flex-shrink-0" />
                              <span>Weak or interrupted urine flow</span>
                            </li>
                            <li className="flex items-start">
                              <Check size={18} className="text-primary mr-2 mt-1 flex-shrink-0" />
                              <span>Difficulty initiating or completing urination</span>
                            </li>
                            <li className="flex items-start">
                              <Check size={18} className="text-primary mr-2 mt-1 flex-shrink-0" />
                              <span>Feelings of incomplete bladder emptying</span>
                            </li>
                            <li className="flex items-start">
                              <Check size={18} className="text-primary mr-2 mt-1 flex-shrink-0" />
                              <span>Reduced sexual desire or performance</span>
                            </li>
                          </ul>
                        </div>

                        <div className="bg-primary/5 p-4 rounded-lg">
                          <h4 className="font-medium text-primary mb-2">Why Choose URIPHYTOL®?</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <Check size={18} className="text-primary mr-2 mt-1 flex-shrink-0" />
                              <span>Natural and Effective: Combining the wisdom of nature with scientific precision</span>
                            </li>
                            <li className="flex items-start">
                              <Check size={18} className="text-primary mr-2 mt-1 flex-shrink-0" />
                              <span>Clinically Validated: Backed by robust research and clinical trials</span>
                            </li>
                            <li className="flex items-start">
                              <Check size={18} className="text-primary mr-2 mt-1 flex-shrink-0" />
                              <span>Comprehensive Health Benefits: Addressing both urinary and sexual health concerns</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}

                    {activeTab === "how_works" && (
                      <div>
                        <p className="text-neutral-dark/80 mb-4">
                          URIPHYTOL® contains potent bioactive compounds that work through multiple mechanisms:
                        </p>

                        <div className="space-y-4 mb-4">
                          <div className="bg-primary/5 p-4 rounded-lg">
                            <h4 className="font-medium text-primary mb-2">Reduce Prostate Size</h4>
                            <p className="text-sm text-neutral-dark/80">
                              URIPHYTOL® targets the underlying causes of prostate enlargement. It inhibits the 5-alpha reductase enzyme, which is responsible for converting testosterone into dihydrotestosterone (DHT). By reducing DHT levels, it helps shrink the prostate and relieve obstructive urinary symptoms.
                            </p>
                          </div>

                          <div className="bg-primary/5 p-4 rounded-lg">
                            <h4 className="font-medium text-primary mb-2">Enhance Urinary Flow</h4>
                            <p className="text-sm text-neutral-dark/80">
                              Through its anti-inflammatory properties and smooth muscle relaxation effects, URIPHYTOL® alleviates symptoms such as frequent urination and weak stream. It helps reduce tissue swelling and facilitates more complete bladder emptying.
                            </p>
                          </div>

                          <div className="bg-primary/5 p-4 rounded-lg">
                            <h4 className="font-medium text-primary mb-2">Improve Sexual Health</h4>
                            <p className="text-sm text-neutral-dark/80">
                              The unique formulation addresses erectile dysfunction (ED) and boosts libido, common concerns associated with BPH and aging. This comprehensive approach ensures both urinary and sexual health improvements.
                            </p>
                          </div>

                          <div className="bg-primary/5 p-4 rounded-lg">
                            <h4 className="font-medium text-primary mb-2">Support Long-Term Prostate Wellness</h4>
                            <p className="text-sm text-neutral-dark/80">
                              URIPHYTOL® promotes sustained relief and overall prostate health. Its protective properties help prevent or delay the progression of prostate conditions in at-risk individuals, ensuring long-term benefits.
                            </p>
                          </div>

                          <div className="bg-tertiary/10 p-4 rounded-lg">
                            <h4 className="font-medium text-tertiary mb-2">Administration Guidelines</h4>
                            <ul className="text-sm space-y-2">
                              <li className="flex items-start">
                                <Clock className="text-tertiary mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                                <span>Recommended Dosage: One capsule after every 8 hours (1x3) or two capsules twice daily</span>
                              </li>
                              <li className="flex items-start">
                                <Info className="text-tertiary mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                                <span>Take with water; do not crush or chew</span>
                              </li>
                              <li className="flex items-start">
                                <Calendar className="text-tertiary mr-2 mt-1 flex-shrink-0 h-4 w-4" />
                                <span>Minimum course of 12 weeks recommended for optimal results</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "benefits" && (
                      <div>

                        <p className="text-neutral-dark/80 mb-4">
                          URIPHYTOL® has undergone rigorous clinical evaluations demonstrating:
                        </p>

                        <div className="space-y-4 mb-4">
                          <div className="bg-tertiary/10 p-4 rounded-lg">
                            <h4 className="font-medium text-tertiary mb-2">Significant Reduction in BPH Symptoms</h4>
                            <p className="text-sm text-neutral-dark/80">
                              Clinical studies show patients reported significant decrease in urinary frequency and markedly improved flow. Results are typically noticed within the first few weeks of treatment.
                            </p>
                          </div>

                          <div className="bg-tertiary/10 p-4 rounded-lg">
                            <h4 className="font-medium text-tertiary mb-2">Enhanced Sexual Function</h4>
                            <p className="text-sm text-neutral-dark/80">
                              Notable improvements in erectile performance and libido have been documented, setting URIPHYTOL® apart from conventional treatments that often negatively impact sexual function.
                            </p>
                          </div>

                          <div className="bg-tertiary/10 p-4 rounded-lg">
                            <h4 className="font-medium text-tertiary mb-2">High Tolerability Profile</h4>
                            <p className="text-sm text-neutral-dark/80">
                              Minimal adverse effects reported across clinical trials, ensuring patient safety and comfort throughout the treatment duration.
                            </p>
                          </div>

                          <div className="bg-yellow-50 p-4 rounded-lg">
                            <h4 className="flex items-center font-medium text-yellow-800 mb-2">
                              <AlertTriangle size={18} className="mr-2" />
                              Precautions and Safety Information
                            </h4>
                            <ul className="space-y-2 text-sm text-yellow-800/90">
                              <li className="flex items-start">
                                <span className="text-yellow-800 mr-2">•</span>
                                <span>Peptic Ulcer Disease: Avoid taking on an empty stomach to prevent gastrointestinal discomfort</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-yellow-800 mr-2">•</span>
                                <span>Anticoagulant Therapy: Not recommended for use with blood thinners like warfarin</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-yellow-800 mr-2">•</span>
                                <span>Always consult healthcare provider before starting, especially if you have underlying conditions or are on other medications</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "dosage" && (
                      <div>
                        <div className="bg-primary/5 p-5 rounded-lg mb-6">
                          <h4 className="font-medium text-primary mb-3">Recommended Dosage</h4>
                          <div className="flex items-center mb-4">
                            <Clock size={24} className="text-primary mr-3 flex-shrink-0" />
                            <div>
                              <p className="font-medium">Take URIPHYTOL 500 mg</p>
                              <p className="text-sm text-neutral-dark/80">1 capsule every 8 hours (1×3) for four months.</p>
                              <p className="text-sm text-neutral-dark/80 italic">Depending on the diseases condition or as your doctor may decide, the treatment can exceed to 6 months</p>
                            </div>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-medium text-primary mb-3">Pharmacological Profile</h4>
                          <ul className="space-y-3">
                            <li className="flex items-start">
                              <Shield size={18} className="text-primary mr-2 mt-1 flex-shrink-0" />
                              <div>
                                <span className="font-medium">Safety:</span>
                                <span className="text-neutral-dark/80 ml-1">Excellent safety profile, even at elevated doses of up to 2000 mg/day, with no observed toxic effects.</span>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <Activity size={18} className="text-primary mr-2 mt-1 flex-shrink-0" />
                              <div>
                                <span className="font-medium">Excretion:</span>
                                <span className="text-neutral-dark/80 ml-1">Metabolized and safely excreted through urine and feces.</span>
                              </div>
                            </li>
                            <li className="flex items-start">
                              <Zap size={18} className="text-primary mr-2 mt-1 flex-shrink-0" />
                              <div>
                                <span className="font-medium">Onset of Action:</span>
                                <span className="text-neutral-dark/80 ml-1">Fast-acting, with symptom relief often reported within the first few days to weeks of use.</span>
                              </div>
                            </li>
                          </ul>
                        </div>

                        <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                          <h4 className="flex items-center font-medium text-yellow-800 mb-2">
                            <AlertTriangle size={18} className="mr-2" />
                            Contraindications
                          </h4>
                          <ul className="space-y-2 text-sm text-yellow-800/90">
                            <li className="flex items-start">
                              <span className="text-yellow-800 mr-2">•</span>
                              <span>Contraindicated in patients taking Warfarin due to potential herb-drug interactions affecting coagulation.</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-yellow-800 mr-2">•</span>
                              <span>Use with caution in patients with peptic ulcer disease. It should not be taken on an empty stomach to avoid gastrointestinal discomfort.</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-yellow-800 mr-2">•</span>
                              <span>Not recommended for use in pediatric populations or women due to its targeted androgenic mechanisms.</span>
                            </li>
                          </ul>
                        </div>

                        <p className="text-sm text-neutral-dark/70 italic">
                          URIPHYTOL-500 mg is manufactured by iPhytos Company Tanzania Ltd under GMP-certified conditions, ensuring consistency, purity, and high manufacturing standards.
                        </p>
                      </div>
                    )}

                    {activeTab === "availability" && (
                      <div>
                        <p className="text-neutral-dark/80 mb-4">
                          URIPHYTOL-500 mg is available at the following locations throughout Tanzania:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div>
                            <h4 className="font-medium text-primary mb-2">DAR ES SALAAM</h4>
                            <ul className="text-sm space-y-1">
                              <li>Nakiete Pharmacies</li>
                              <li>Mdee Pharmacies</li>
                              <li>Horizon Pharmacy (Morocco)</li>
                              <li>Nsee Pharmacy (Mbezi Luiz)</li>
                              <li>Farbeck Pharmacy (Manzese)</li>
                              <li>Faru Pharmacy (Manzese)</li>
                              <li>Dynax Pharmacy (Bunju)</li>
                              <li>MDM Urology Specialized Hospital</li>
                              <li>CAICA Pharmacy (Mbezi kwa Zena)</li>
                              <li>VOLTRON Pharmacy (Kijitonyama)</li>
                              <li>Eden Pharmacy</li>
                              <li>Pilipark Pharmacy (Mlimani City)</li>
                              <li>Honest Polyclinic (Bunju)</li>
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-medium text-primary mb-2">ARUSHA</h4>
                            <ul className="text-sm space-y-1">
                              <li>MMT Pharmacy</li>
                              <li>BP Pharmacy (Njiro)</li>
                              <li>Vatican Pharmacy (Ngaramtoni)</li>
                              <li>Astra Pharmacy (Uhuru Road)</li>
                            </ul>

                            <h4 className="font-medium text-primary mt-4 mb-2">DODOMA</h4>
                            <ul className="text-sm space-y-1">
                              <li>Chamwino Pharmacy</li>
                              <li>Mackay Pharmacy</li>
                              <li>Dreamland Pharmacy</li>
                              <li>Nakiete Pharmacy</li>
                              <li>Itosi Pharmacy</li>
                              <li>Brightstar Pharmacy</li>
                              <li>Decca Pharmacy</li>
                              <li>St. John University Dispensary</li>
                            </ul>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-medium text-primary mb-2">OTHER LOCATIONS</h4>
                            <ul className="text-sm space-y-1">
                              <li><span className="font-medium">BUKOBA:</span> Sakainah World Pharmacy</li>
                              <li><span className="font-medium">SONGEA:</span> Kijomu Pharmacy</li>
                              <li><span className="font-medium">TANGA:</span> International Pharmacy (Barabara ya 7), Mwafaka Pharmacy (Barabara ya 9)</li>
                              <li><span className="font-medium">MWANZA:</span> Msua Pharmacy, Kayonza Pharmacy</li>
                              <li><span className="font-medium">KILIMANJARO:</span> Kilimani Pharmacy</li>
                            </ul>
                          </div>

                          <div>
                            <ul className="text-sm space-y-1">
                              <li><span className="font-medium">MOROGORO:</span> Platnum Healthcare Polyclinic Msanvu</li>
                              <li><span className="font-medium">NJOMBE:</span> Consolatha Hospital Ikonda</li>
                              <li><span className="font-medium">IRINGA:</span> Alikoti Pharmacy (Miomboni/Mtaa wa Msikiti wa Ijumaa), ACACIA Pharmacy</li>
                              <li><span className="font-medium">MBEYA:</span> Lindima Pharmacy (Kabwe Opposite to NMB)</li>
                            </ul>
                          </div>
                        </div>

                        <div className="mt-6 bg-primary/5 p-4 rounded-lg">
                          <h4 className="font-medium text-primary mb-2">Contact Information</h4>
                          <p className="text-sm">
                            <span className="font-medium">Phone:</span> +255 752 943 392 | +255 679 277 223<br />
                            <span className="font-medium">Email:</span> info@iphytos.co.tz<br />
                            <span className="font-medium">Website:</span> www.iphytos.co.tz
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>



      {/* Interactive 3D Product Visualization Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="container-fluid px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-8 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3 md:mb-4">The Science Behind URIPHYTOL<sup>®</sup></h2>
              <p className="text-neutral-dark/80 max-w-3xl mx-auto text-sm sm:text-base">Discover how our innovative formulation works at the molecular level to provide lasting relief</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* 3D Visualization Card */}
              <motion.div
                className="lg:col-span-2 bg-white rounded-2xl shadow-elevated overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative aspect-video sm:aspect-auto sm:min-h-[300px] bg-gradient-to-br from-primary-dark to-primary flex items-center justify-center">
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0,rgba(255,255,255,0)_70%)]" />
                    <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0,rgba(255,255,255,0)_70%)]" />
                  </div>
                  <div className="relative z-10 p-4 sm:p-6 md:p-8 text-center">
                    <img
                      data-src="/products-file/clinical.jpeg"
                      alt="URIPHYTOL Clinical Results"
                      className="w-full max-w-[280px] sm:max-w-sm md:max-w-md h-auto rounded-lg shadow-lg mx-auto"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-primary mb-2 sm:mb-3">Clinically Proven Results</h3>
                  <p className="text-sm sm:text-base text-neutral-dark/80 mb-4">
                    URIPHYTOL<sup>®</sup> has been clinically tested and demonstrated superior outcomes in symptom relief, bladder emptying, prostate size reduction, quality of life, and erectile function.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6">
                    {[
                      { value: "97%", label: "Symptom Improvement" },
                      { value: "95%", label: "Patient Satisfaction" },
                      { value: "5-10", label: "Days to First Results" },
                      { value: "0.1%", label: "serious side effect and contraindication" }
                    ].map((stat, index) => (
                      <div key={index} className="text-center p-2 sm:p-3 bg-primary/5 rounded-lg">
                        <div className="text-xl sm:text-2xl font-bold text-primary">{stat.value}</div>
                        <div className="text-[10px] sm:text-xs text-neutral-dark/70">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Mechanism Cards */}
              <div className="space-y-6">
                {[
                  {
                    title: "5-Alpha Reductase Inhibition",
                    description: "Blocks DHT production to reduce prostate size",
                    icon: <Shield className="text-white" size={24} />,
                    color: "from-primary to-primary-dark"
                  },
                  {
                    title: "Smooth Muscle Relaxation",
                    description: "Relaxes muscles through nitric oxide release, improving bladder emptying.",
                    icon: <Heart className="text-white" size={24} />,
                    color: "from-blue-500 to-blue-700"
                  },
                  {
                    title: "Anti-Inflammatory Action",
                    description: "Reduces tissue swelling and enhances flow",
                    icon: <Activity className="text-white" size={24} />,
                    color: "from-tertiary to-tertiary-dark"
                  },
                  {
                    title: "Sexual Health Support",
                    description: "Enhances libido and erectile function",
                    icon: <Zap className="text-white" size={24} />,
                    color: "from-secondary to-secondary-dark"
                  }
                ].map((mechanism, index) => (
                  <motion.div
                    key={index}
                    className={`bg-gradient-to-r ${mechanism.color} rounded-2xl shadow-elevated overflow-hidden`}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="p-4 sm:p-6 text-white">
                      <div className="flex flex-col sm:flex-row sm:items-center mb-3">
                        <div className="bg-white/20 p-2 rounded-lg mb-2 sm:mb-0 sm:mr-3 inline-flex">
                          {mechanism.icon}
                        </div>
                        <h3 className="text-base sm:text-lg font-bold">{mechanism.title}</h3>
                      </div>
                      <p className="text-sm sm:text-base text-white/80">{mechanism.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Modern CTA Section */}
      <section className="py-12 md:py-20 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-10 skew-y-3 transform origin-top-right"></div>
        <div className="container-fluid px-4 sm:px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-elevated overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image Side */}
                <div className="bg-gradient-to-br from-primary to-primary-dark p-6 sm:p-8 md:p-12 text-white relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>

                  <div className="relative z-10">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="mb-6 inline-block bg-white/20 p-3 rounded-xl"
                    >
                      <img data-src="/iphytos-logo.png" alt="iPhytos Logo" className="h-12 w-12" />
                    </motion.div>

                    <motion.h2
                      className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      Transform Your<br className="hidden sm:block" /> Prostate Health
                    </motion.h2>

                    <motion.p
                      className="text-white/80 mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      Join thousands of men who have discovered the natural solution to BPH and related urinary symptoms.
                    </motion.p>
                  </div>
                </div>

                {/* Content Side */}
                <div className="p-6 sm:p-8 md:p-12">
                  <motion.h3
                    className="text-2xl font-bold text-primary mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    Ready to Experience URIPHYTOL<sup>®</sup>?
                  </motion.h3>

                  <motion.div
                    className="space-y-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <Check size={16} className="text-primary" />
                      </div>
                      <p className="text-neutral-dark/80">Fast-acting relief from urinary symptoms</p>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <Check size={16} className="text-primary" />
                      </div>
                      <p className="text-neutral-dark/80">Clinically proven to outperform conventional treatments</p>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-primary/10 p-2 rounded-full mr-3">
                        <Check size={16} className="text-primary" />
                      </div>
                      <p className="text-neutral-dark/80">Available at pharmacies and hospitals throughout Tanzania</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex flex-col sm:flex-row gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Link to="/contact" className="btn btn-primary">
                      Contact Us
                    </Link>
                    <Link to="#product-details" className="btn btn-secondary">
                      Learn More
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PDF Download Section */}
      <section className="py-16 bg-neutral-lightest overflow-hidden">
        <div className="container-fluid">
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Decorative Elements */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl max-h-3xl bg-white/50 rounded-full blur-3xl opacity-50"></div>

              <div className="relative z-10 bg-white rounded-2xl shadow-elevated overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                  {/* PDF Preview Side */}
                  <div className="md:col-span-5 bg-gradient-to-br from-primary-dark to-primary relative">
                    <div className="absolute inset-0 opacity-10">
                      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="smallGridPdf" width="10" height="10" patternUnits="userSpaceOnUse">
                            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                          </pattern>
                          <pattern id="gridPdf" width="100" height="100" patternUnits="userSpaceOnUse">
                            <rect width="100" height="100" fill="url(#smallGridPdf)" />
                            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="1" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#gridPdf)" />
                      </svg>
                    </div>

                    <div className="relative h-full p-8 md:p-12 flex flex-col justify-center items-center text-center">
                      <motion.div
                        className="relative w-64 h-80 md:w-80 md:h-96 bg-white rounded-lg mb-6 overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                      >
                        <img
                          data-src="/products-file/Uriphytos flyer.webp"
                          alt="URIPHYTOL Flyer Preview"
                          className="w-full h-full object-contain"
                        />
                      </motion.div>

                      <motion.div
                        className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-primary-dark font-bold text-sm rotate-12 shadow-lg"
                        initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 12 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <div className="text-center leading-tight">
                          <span className="block">FREE</span>
                          <span className="block text-xs font-normal">Download</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Download Info Side */}
                  <div className="md:col-span-7 p-8 md:p-12">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                        Download URIPHYTOL<sup>®</sup> Information Flyer
                      </h2>

                      <p className="text-neutral-dark/80 mb-6">
                        Get complete information about URIPHYTOL's benefits, usage instructions, and scientific background. Our comprehensive flyer provides everything you need to know about this revolutionary natural treatment for prostate health.
                      </p>

                      <div className="space-y-4 mb-8">
                        <div className="flex items-start">
                          <div className="bg-primary/10 p-2 rounded-full mr-3 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <polyline points="14 2 14 8 20 8"></polyline>
                              <line x1="16" y1="13" x2="8" y2="13"></line>
                              <line x1="16" y1="17" x2="8" y2="17"></line>
                              <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                          </div>
                          <p className="text-neutral-dark/80">Detailed dosage instructions and recommendations</p>
                        </div>

                        <div className="flex items-start">
                          <div className="bg-primary/10 p-2 rounded-full mr-3 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                              <circle cx="12" cy="12" r="10"></circle>
                              <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                          </div>
                          <p className="text-neutral-dark/80">Timeline of expected results and benefits</p>
                        </div>

                        <div className="flex items-start">
                          <div className="bg-primary/10 p-2 rounded-full mr-3 flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                              <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                          </div>
                          <p className="text-neutral-dark/80">Scientific research and clinical evidence</p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <a
                          href="/Uriphytos flyer.pdf"
                          download
                          className="btn btn-primary flex items-center justify-center gap-2 group"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                          </svg>
                          Download PDF
                        </a>

                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            window.open('/Uriphytos flyer.pdf', '_blank');
                          }}
                          className="btn btn-outline-primary flex items-center justify-center gap-2 group"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                          View PDF
                        </a>
                      </div>

                      <div className="mt-8 pt-6 border-t border-neutral-light/50">
                        <div className="flex items-center text-sm text-neutral-dark/60">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                          </svg>
                          Your privacy is important to us. We don't track downloads or require registration.
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Order Form Section */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-24 bg-gradient-to-b from-white to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-70"></div>
          <div className="absolute bottom-0 left-0 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] bg-tertiary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 opacity-70"></div>
        </div>

        <div className="container-fluid px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3 sm:mb-4">
                Order URIPHYTOL<sup>®</sup> Now
              </h2>
              <p className="text-sm sm:text-base text-neutral-dark/80 max-w-2xl mx-auto px-4 sm:px-6">
                Fill out the form below to place your order. Our team will contact you shortly to confirm your order and provide payment details.
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl shadow-elevated p-4 sm:p-6 md:p-8 lg:p-10 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Progress Steps */}
              <div className="flex justify-between items-center mb-6 sm:mb-8">
                {['Personal Info', 'Order Details', 'Review'].map((step, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${index <= formStep
                        ? "bg-primary text-white"
                        : "bg-primary/10 text-primary"
                      }`}>
                      {index + 1}
                    </div>
                    {index < 2 && (
                      <div className="h-1 w-12 sm:w-16 md:w-24 lg:w-32 mx-1 sm:mx-2 bg-primary/10">
                        <div className={`h-full bg-primary ${index < formStep ? "w-full" : "w-0"
                          } transition-all duration-300`}></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4 sm:space-y-6">
                {formStep === 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-dark mb-1.5 sm:mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm sm:text-base"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-dark mb-1.5 sm:mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm sm:text-base"
                        placeholder="e.g., +255 123 456 789"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-dark mb-1.5 sm:mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm sm:text-base"
                        placeholder="Enter your email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-dark mb-1.5 sm:mb-2">
                        City/Location *
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm sm:text-base"
                        placeholder="Enter your city or location"
                        required
                      />
                    </div>
                  </div>
                )}

                {formStep === 1 && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="border-b border-gray-100 pb-4 sm:pb-6">
                      <h3 className="text-base sm:text-lg font-semibold text-primary mb-2 sm:mb-3">Order Details</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className="block text-sm font-medium text-neutral-dark mb-1.5 sm:mb-2">
                            Quantity (Boxes) *
                          </label>
                          <div className="flex items-center">
                            <button
                              type="button"
                              onClick={handleDecrement}
                              className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-neutral-dark hover:bg-primary/5 transition-colors"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={quantity}
                              onChange={(e) => {
                                const newValue = Math.max(1, parseInt(e.target.value) || 1);
                                setQuantity(newValue);
                                setFormData({ ...formData, quantity: newValue });
                              }}
                              className="w-20 mx-2 px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-center"
                              min="1"
                              required
                            />
                            <button
                              type="button"
                              onClick={handleIncrement}
                              className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-neutral-dark hover:bg-primary/5 transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-neutral-dark mb-1.5 sm:mb-2">
                            Preferred Contact Method *
                          </label>
                          <select
                            value={formData.contactMethod}
                            onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value as 'phone' | 'whatsapp' | 'email' })}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm sm:text-base"
                            required
                          >
                            <option value="phone">Phone Call</option>
                            <option value="whatsapp">WhatsApp</option>
                            <option value="email">Email</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-dark mb-1.5 sm:mb-2">
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        rows={4}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm sm:text-base"
                        placeholder="Any special instructions or notes for your order?"
                      ></textarea>
                    </div>
                  </div>
                )}

                {formStep === 2 && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                      <h3 className="text-base sm:text-lg font-semibold text-primary mb-2 sm:mb-3">Order Summary</h3>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex justify-between items-center pb-1 border-b border-gray-200">
                          <span className="text-neutral-dark">Personal Information</span>
                          <button
                            type="button"
                            onClick={() => setFormStep(0)}
                            className="text-primary hover:text-primary-dark text-xs sm:text-sm"
                          >
                            Edit
                          </button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 text-sm sm:text-base">
                          <div>
                            <span className="text-neutral-dark/70">Full Name:</span>
                            <p className="font-medium">{formData.fullName}</p>
                          </div>
                          <div>
                            <span className="text-neutral-dark/70">Phone:</span>
                            <p className="font-medium">{formData.phone}</p>
                          </div>
                          {formData.email && (
                            <div>
                              <span className="text-neutral-dark/70">Email:</span>
                              <p className="font-medium">{formData.email}</p>
                            </div>
                          )}
                          <div>
                            <span className="text-neutral-dark/70">Location:</span>
                            <p className="font-medium">{formData.location}</p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pb-1 border-b border-gray-200 mt-2 sm:mt-3">
                          <span className="text-neutral-dark">Order Details</span>
                          <button
                            type="button"
                            onClick={() => setFormStep(1)}
                            className="text-primary hover:text-primary-dark text-xs sm:text-sm"
                          >
                            Edit
                          </button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 text-sm sm:text-base">
                          <div>
                            <span className="text-neutral-dark/70">Quantity:</span>
                            <p className="font-medium">{quantity} box(es)</p>
                          </div>
                          <div>
                            <span className="text-neutral-dark/70">Contact Method:</span>
                            <p className="font-medium capitalize">{formData.contactMethod}</p>
                          </div>
                          {formData.notes && (
                            <div className="col-span-2 sm:col-span-3">
                              <span className="text-neutral-dark/70">Additional Notes:</span>
                              <p className="font-medium">{formData.notes}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 sm:p-6">
                      <p className="text-sm text-yellow-800">
                        Please review your order details carefully before submitting. Our team will contact you shortly through your preferred contact method to confirm your order and provide payment details.
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-100">
                  {formStep > 0 && (
                    <button
                      type="button"
                      onClick={() => setFormStep(formStep - 1)}
                      className="btn btn-outline-primary w-full sm:w-auto text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
                    >
                      Back
                    </button>
                  )}
                  {formStep < 2 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="btn btn-primary w-full sm:w-auto text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-center gap-2 group"
                    >
                      Next Step
                      <ArrowRight size={14} className="transform transition-transform group-hover:translate-x-1 sm:w-4 sm:h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className={`btn btn-primary w-full sm:w-auto text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 flex items-center justify-center gap-2 group ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Order
                          <ArrowRight size={14} className="transform transition-transform group-hover:translate-x-1 sm:w-4 sm:h-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>

              {/* Contact Support */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100">
                <div className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-neutral-dark/70">
                  <Info size={14} className="mt-0.5 sm:w-4 sm:h-4" />
                  <p>
                    Need help with your order? Contact our support team at{' '}
                    <a href="tel:+255752943392" className="text-primary hover:underline">
                      +255 752 943 392 / +255 67 927 7223
                    </a>
                    {' '}or{' '}
                    <a href="mailto:info@iphytos.co.tz" className="text-primary hover:underline">
                      info@iphytos.co.tz
                    </a>
                  </p>
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