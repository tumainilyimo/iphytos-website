import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type LayoutProps = {
  children: React.ReactNode;
};

const navItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/products", label: "Products & Services" },
  { path: "/news", label: "News & Events" },
  { path: "/career", label: "Career" },
  { path: "/contact", label: "Contact" },
];

const Layout = ({ children }: LayoutProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHomePage, setIsHomePage] = useState(false);
  const [isInHeroSection, setIsInHeroSection] = useState(true);
  const location = useLocation();

  // Check if current page is home page and set initial states
  useEffect(() => {
    const isHome = location.pathname === '/';
    setIsHomePage(isHome);
    setIsInHeroSection(isHome); // Set to true if on home page
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight;

      // Update scroll state
      if (scrollPosition > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Update hero section state
      if (isHomePage) {
        setIsInHeroSection(scrollPosition < heroHeight - 100);
      }
    };

    // Call handleScroll once on mount to set initial state
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 w-full",
          isHomePage && isInHeroSection
            ? "bg-transparent py-4 sm:py-6"
            : "bg-white py-3 sm:py-4 shadow-medium"
        )}
      >
        <div className="container-fluid px-4 sm:px-6 mx-auto max-w-[100vw] flex items-center justify-between">
          <NavLink
            to="/"
            className="flex items-center z-50"
            onClick={() => window.scrollTo(0, 0)}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <img
                src="/iphytos-logo.png"
                alt="iPhytos Logo"
                className={cn(
                  "transition-all duration-300",
                  isHomePage && isInHeroSection
                    ? "h-8 sm:h-12 md:h-16 lg:h-20" // Adjusted sizes
                    : "h-8 sm:h-10 md:h-12" // Consistent mobile size
                )}
                style={{
                  filter: isHomePage && isInHeroSection ? 'brightness(0) invert(1)' : 'none',
                  transition: 'all 0.3s ease-in-out'
                }}
              />
            </motion.div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className={cn(
            "hidden lg:flex items-center space-x-4 xl:space-x-6",
            isHomePage && isInHeroSection ? "absolute left-1/2 transform -translate-x-1/2" : ""
          )}>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "navbar-link relative text-sm xl:text-base font-medium transition-all duration-200 px-2",
                    "after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5",
                    "after:bg-gradient-to-r after:from-primary after:to-tertiary",
                    "after:transform after:scale-x-0 after:origin-left after:transition-transform",
                    isActive && "after:scale-x-100",
                    isHomePage && isInHeroSection
                      ? "text-white hover:text-gray-200"
                      : "text-gray-700 hover:text-primary"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "lg:hidden p-2 rounded-md transition-all duration-200 z-50 relative",
              isHomePage && isInHeroSection
                ? "text-white hover:bg-white/10"
                : "text-primary hover:bg-gray-100"
            )}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "lg:hidden fixed inset-x-0 top-[56px] sm:top-[64px] w-full",
                isHomePage && isInHeroSection
                  ? "bg-black/90 backdrop-blur-md"
                  : "bg-white shadow-lg"
              )}
            >
              <div className="container-fluid px-4 py-4 mx-auto max-w-[100vw] flex flex-col space-y-3">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        "navbar-link py-3 px-4 rounded-md transition-colors duration-200 text-base",
                        isHomePage && isInHeroSection
                          ? "text-white hover:bg-white/10"
                          : "text-gray-700 hover:bg-gray-50",
                        isActive && (isHomePage && isInHeroSection ? "bg-white/20" : "bg-gray-50 font-medium")
                      )
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <motion.main
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "flex-grow w-full overflow-x-hidden",
          isHomePage ? "" : "pt-16 sm:pt-20"
        )}
      >
        {children}
      </motion.main>

      <footer className="bg-primary text-white py-8 sm:py-12 w-full overflow-x-hidden">
        <div className="container-fluid px-4 sm:px-6 mx-auto max-w-[100vw]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img src="/iphytos-logo.png" alt="iPhytos Logo" className="h-10 mr-3" />
                {/* <h4 className="text-xl font-semibold">iPhytos</h4> */}
              </div>
              <p className="text-sm leading-relaxed">
                Redefining medicine through nature, technology, and science to transform global health
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <NavLink to="/" className="hover:text-secondary transition-colors">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" className="hover:text-secondary transition-colors">
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/products" className="hover:text-secondary transition-colors">
                    Products & Services
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/news" className="hover:text-secondary transition-colors">
                    News & Events
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/career" className="hover:text-secondary transition-colors">
                    Career
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" className="hover:text-secondary transition-colors">
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Contact</h4>
              <p className="text-sm leading-relaxed">
                <strong>Email:</strong> info@iphytos.co.tz
                <br />
                {/* <strong>Address:</strong> P O Box 447 Arusha, Tanzania */}
              </p>
            </div>
          </div>
          <div className="border-t border-white/20 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} iPhytos. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
