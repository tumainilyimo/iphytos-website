import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Leaf, 
  ArrowRight, 
  MessageSquare, 
  Building, 
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Loader2
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { sendEmail } from '../services/emailService';
import { toast } from 'sonner';

const Contact = () => {
  const location = useLocation();
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    joinTalentPool: false,
    formType: 'contact' as 'contact' | 'order'
  });
  
  const [activeTab, setActiveTab] = useState<'general' | 'support' | 'partnership'>('general');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [formStep, setFormStep] = useState(1);
  
  // Subject options based on active tab
  const subjectOptions = {
    general: [
      { value: "Product Inquiry", label: "Product Inquiry" },
      { value: "Support", label: "Support" },
      { value: "Other", label: "Other" }
    ],
    support: [
      { value: "Technical Support", label: "Technical Support" },
      { value: "Product Information", label: "Product Information" },
      { value: "Order Support", label: "Order Support" }
    ],
    partnership: [
      { value: "Business Partnership", label: "Business Partnership" },
      { value: "Distribution", label: "Distribution" },
      { value: "Collaboration", label: "Collaboration" }
    ]
  };

  // Reset subject when tab changes
  useEffect(() => {
    setFormData(prev => ({ ...prev, subject: "" }));
  }, [activeTab]);

  // Check if coming from talent pool link
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('talent') === 'true') {
      setFormData(prev => ({ ...prev, joinTalentPool: true, subject: 'Career' }));
    }
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const nextStep = () => {
    setFormStep(2);
  };
  
  const prevStep = () => {
    setFormStep(1);
  };
  
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Get contact type label
      const contactTypeLabel = {
        general: "General Inquiry",
        support: "Product Support",
        partnership: "Partnership"
      }[activeTab];

      // Prepare email data from form data
      const emailData = {
        to: 'info@iphytos.co.tz',
        subject: `${contactTypeLabel}: ${formData.subject}`,
        name: formData.name,
        email: formData.email,
        formType: formData.formType,
        message: `Contact Details:
          Contact Type: ${contactTypeLabel}
          Phone: ${formData.phone}
          Subject: ${formData.subject}
          Message: ${formData.message}
          Join Talent Pool: ${formData.joinTalentPool ? 'Yes' : 'No'}`
      };

      const response = await sendEmail(emailData);
      
      if (response.success) {
        toast.success('Message sent successfully!', {
          description: 'We will get back to you as soon as possible.',
          duration: 5000,
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          joinTalentPool: false,
          formType: 'contact'
        });
        setFormStep(1);
      } else {
        toast.error('Failed to send message', {
          description: response.error || 'Please try again.',
          duration: 5000,
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('An error occurred', {
        description: 'Failed to send your message. Please try again.',
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-[18px] md:pt-[20px]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-white to-tertiary/5 py-12 md:py-16">
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
                  Get In Touch
                </motion.span>
                
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Contact Us
                </motion.h1>
                
                <motion.p 
                  className="text-lg md:text-xl text-neutral-dark/80 mb-8 max-w-xl mx-auto md:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Have questions about our products, partnerships, or career opportunities? We're here to help you connect with the right people at iPhytos.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-wrap gap-4 justify-center md:justify-start"
                >
                  <button 
                    onClick={scrollToForm}
                    className="bg-primary text-white font-medium px-8 py-3 rounded-full hover:bg-primary-dark transition-colors flex items-center gap-2 group"
                  >
                    Send a Message
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                  <a 
                    href="tel:+255752943392" 
                    className="bg-white text-primary border border-primary/20 font-medium px-8 py-3 rounded-full hover:bg-primary/5 transition-colors flex items-center gap-2"
                  >
                    <Phone className="h-4 w-4" />
                    Call Us
                  </a>
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
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-white/50">
                    <div className="grid grid-cols-2 divide-x divide-y divide-neutral-100">
                      {[
                        { icon: <Mail className="h-6 w-6 text-primary" />, title: "Email", value: "info@iphytos.co.tz", link: "mailto:info@iphytos.co.tz" },
                        { icon: <Phone className="h-6 w-6 text-primary" />, title: "Phone", value: "+255 752 943 392", link: "tel:+255752943392" },
                        { icon: <MapPin className="h-6 w-6 text-primary" />, title: "Office", value: "Usa Plaza building, Arusha, Tanzania", link: "#map-section" },
                        { icon: <Clock className="h-6 w-6 text-primary" />, title: "Hours", value: "Mon-Fri, 9AM-4PM", link: null }
                      ].map((item, index) => (
                        <div key={index} className="p-6">
                          <div className="flex flex-col items-center text-center">
                            <div className="bg-primary/10 rounded-full p-3 mb-3">
                              {item.icon}
                            </div>
                            <h3 className="font-medium text-primary-dark mb-1">{item.title}</h3>
                            {item.link ? (
                              <a href={item.link} className="text-neutral-dark/80 hover:text-primary transition-colors">
                                {item.value}
                              </a>
                            ) : (
                              <p className="text-neutral-dark/80">{item.value}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-6 border-t border-neutral-100">
                      <div className="flex justify-center space-x-4">
                        {[
                          { icon: <Facebook className="h-5 w-5" />, label: "Facebook", href: "https://www.facebook.com/profile.php?id=61560460083157&mibextid=LQQJ4d" },
                          { icon: <Twitter className="h-5 w-5" />, label: "Twitter", href: "#" },
                          { icon: <Instagram className="h-5 w-5" />, label: "Instagram", href: "https://www.instagram.com/invites/contact/?i=yk1irseuj50f&utm_content=tipxqyv" },
                          { icon: <Linkedin className="h-5 w-5" />, label: "LinkedIn", href: "#" }
                        ].map((social, index) => (
                          <a 
                            key={index}
                            href={social.href}
                            aria-label={social.label}
                            className="bg-primary/10 hover:bg-primary/20 transition-colors rounded-full p-3 text-primary"
                          >
                            {social.icon}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section ref={formRef} className="py-8 md:py-16 bg-gradient-to-br from-white via-neutral-50 to-white relative overflow-hidden">
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
                How Can We Help?
              </motion.span>
              
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-primary-dark mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Get In Touch With Us
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
                Choose a contact option below or fill out the form and we'll get back to you as soon as possible
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-white/50 backdrop-blur-sm"
            >
              {/* Contact Tabs */}
              <div className="flex border-b border-neutral-100">
                {[
                  { id: 'general', label: 'General Inquiry', icon: <MessageSquare className="h-4 w-4" /> },
                  { id: 'support', label: 'Product Support', icon: <Leaf className="h-4 w-4" /> },
                  { id: 'partnership', label: 'Partnerships', icon: <Building className="h-4 w-4" /> }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'general' | 'support' | 'partnership')}
                    className={`flex-1 py-4 px-4 flex items-center justify-center gap-2 text-sm font-medium transition-all duration-300 ${activeTab === tab.id 
                      ? 'text-primary border-b-2 border-primary' 
                      : 'text-neutral-dark/70 hover:text-primary hover:bg-neutral-50'}`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
              
              <div className="p-8 md:p-10">
                {/* Success and Error Messages */}
                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 flex items-center gap-3 border border-green-100"
                    >
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <p>Thank you for your message! We'll get back to you as soon as possible.</p>
                    </motion.div>
                  )}
                  
                  {submitError && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 flex items-center gap-3 border border-red-100"
                    >
                      <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <p>There was an error sending your message. Please try again later.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Multi-step Form */}
                <form onSubmit={handleSubmit}>
                  <AnimatePresence mode="wait">
                    {formStep === 1 ? (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-neutral-dark mb-2">
                              Full Name*
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white/50"
                              placeholder="Your name"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-neutral-dark mb-2">
                              Email Address*
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white/50"
                              placeholder="Your email"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-neutral-dark mb-2">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white/50"
                              placeholder="Your phone (optional)"
                            />
                          </div>
                          <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-neutral-dark mb-2">
                              Subject*
                            </label>
                            <select
                              id="subject"
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white/50 appearance-none"
                              style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23666%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><polyline points=%226 9 12 15 18 9%22></polyline></svg>')" ,
                                      backgroundRepeat: "no-repeat",
                                      backgroundPosition: "right 1rem center",
                                      backgroundSize: "1em" }}
                            >
                              <option value="">Select a subject</option>
                              {subjectOptions[activeTab].map(option => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        
                        {formData.subject === 'Career' && (
                          <div className="mb-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                name="joinTalentPool"
                                checked={formData.joinTalentPool}
                                onChange={handleChange}
                                className="w-5 h-5 rounded border-neutral-300 text-primary focus:ring-primary/30"
                              />
                              <span className="text-sm text-neutral-dark">Add me to the iPhytos talent pool for future opportunities</span>
                            </label>
                          </div>
                        )}
                        
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={nextStep}
                            className="bg-primary text-white font-medium px-6 py-3 rounded-full hover:bg-primary-dark transition-colors flex items-center gap-2 group"
                          >
                            Next Step
                            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="mb-6">
                          <label htmlFor="message" className="block text-sm font-medium text-neutral-dark mb-2">
                            Your Message*
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={6}
                            className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white/50 resize-none"
                            placeholder="How can we help you?"
                          ></textarea>
                        </div>
                        
                        <div className="flex justify-between">
                          <button
                            type="button"
                            onClick={prevStep}
                            className="bg-white text-primary border border-primary/20 font-medium px-6 py-3 rounded-full hover:bg-primary/5 transition-colors flex items-center gap-2"
                          >
                            Back
                          </button>
                          
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-primary text-white font-medium px-8 py-3 rounded-full hover:bg-primary-dark transition-colors flex items-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Sending...
                              </>
                            ) : (
                              <>
                                Send Message
                                <Send className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                              </>
                            )}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="map-section" className="py-8 md:py-16 bg-gradient-to-br from-neutral-50/50 via-white to-neutral-50/50 relative overflow-hidden">
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
                Our Location
              </motion.span>
              
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-primary-dark mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Visit Our Office
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-20 h-1 bg-gradient-to-r from-primary to-tertiary mx-auto mb-6 rounded-full"
              ></motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative bg-white rounded-3xl shadow-xl overflow-hidden border border-white/50 backdrop-blur-sm"
            >
              <div className="aspect-video rounded-lg overflow-hidden relative">
                {/* Google Maps iframe */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.9041789175294!2d36.84518387568725!3d-3.373594941471664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1837113df21c6fd9%3A0xf6a65a59dd58f0de!2sUsa%20Plaza!5e0!3m2!1sen!2stz!4v1748955368175!5m2!1sen!2stz" 
                  className="w-full h-full"
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                
                {/* Overlay card */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg max-w-sm">
                  <div className="bg-primary/10 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary-dark mb-2">iPhytos Headquarters</h3>
                  <p className="text-neutral-dark/80 mb-4">Usa Plaza building, Arusha, Tanzania</p>
                  
                  <div className="flex justify-center">
                    <a 
                      href="https://www.google.com/maps/place/Usa+Plaza/@-3.373594941471664,36.84518387568725,17z/data=!3m1!4b1!4m6!3m5!1s0x1837113df21c6fd9:0xf6a65a59dd58f0de!8m2!3d-3.3735949!4d36.8451839!16s%2Fg%2F11s7m50_mc?entry=ttu" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-primary text-white font-medium px-5 py-2 rounded-full hover:bg-primary-dark transition-colors text-sm flex items-center gap-2"
                    >
                      <Globe className="h-4 w-4" />
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="p-8 md:p-10 border-t border-neutral-100 bg-gradient-to-br from-white to-neutral-50">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-3 mr-4 flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-primary-dark mb-1">Address</h3>
                      <p className="text-neutral-dark/80">
                        iPhytos Headquarters<br />
                        Usa Plaza building,<br />
                        Arusha, Tanzania
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-3 mr-4 flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-primary-dark mb-1">Office Hours</h3>
                      <p className="text-neutral-dark/80">
                        Monday - Friday<br />
                        9:00 AM - 4:00 PM
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary/10 rounded-full p-3 mr-4 flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-primary-dark mb-1">Contact</h3>
                      <p className="text-neutral-dark/80">
                        <a href="tel:+255752943392" className="hover:text-primary transition-colors block">+255 752 943 392</a>
                        <a href="mailto:info@iphytos.co.tz" className="hover:text-primary transition-colors">info@iphytos.co.tz</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
