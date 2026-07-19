import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Phone, ArrowRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { paths, scrollToTop } from "../lib/paths";
import LogoMark from "./LogoMark";

interface NavbarProps {
  onRequestVisit: () => void;
}

const NAV_ITEMS = [
  { path: paths.home, label: "Accueil" },
  { path: paths.projects, label: "Projets" },
  { path: paths.about, label: "À Propos" },
  { path: paths.contact(), label: "Contact" },
];

export default function Navbar({ onRequestVisit }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu whenever the route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogoClick = () => {
    scrollToTop();
    navigate(paths.home);
  };

  const handleNavClick = (path: string) => {
    scrollToTop();
    navigate(path);
  };

  // Determine navbar background styling based on scroll and current page
  // On home or project details page, hero is fullscreen, so start transparent
  const isHeroPage = location.pathname === paths.home || /^\/projets\/[^/]+\/?$/.test(location.pathname);
  const navBackgroundClass = isScrolled
    ? "glass shadow-xl py-3 border-b border-white/40"
    : isHeroPage
      ? "bg-transparent py-5 text-white"
      : "glass py-4 border-b border-white/40";

  const textColorClass = isScrolled
    ? "text-primary"
    : isHeroPage
      ? "text-white"
      : "text-primary";

  const linkHoverClass = isScrolled
    ? "hover:text-accent"
    : isHeroPage
      ? "hover:text-accent text-white/90"
      : "hover:text-accent";

  return (
    <>
      <motion.nav
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${navBackgroundClass}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo Group */}
            <button
              id="navbar-logo-btn"
              onClick={handleLogoClick}
              className="flex items-center gap-3 group text-left cursor-pointer"
              aria-label="TROPS IMMO — retour à l'accueil"
            >
              <div className="relative w-10 h-10 flex items-center justify-center">
                <LogoMark className="w-full h-full text-accent" />
              </div>
              <div>
                <span className={`block font-serif-luxury font-medium text-lg tracking-[0.18em] transition-colors ${textColorClass}`}>
                  TROPS IMMO
                </span>
                <span className="block text-[8px] uppercase tracking-[0.3em] font-medium text-accent">
                  Haute Couture Immobilier
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8 font-sans text-xs uppercase tracking-widest font-medium" role="navigation" aria-label="Navigation principale">
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    id={`nav-link-${item.label}`}
                    onClick={() => handleNavClick(item.path)}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative py-2 transition-colors cursor-pointer ${linkHoverClass} ${
                      isActive ? "text-accent font-semibold" : ""
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* CTAs */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                id="nav-cta-contact-phone"
                href="tel:+21341294763"
                className={`flex items-center gap-1.5 text-xs tracking-wider uppercase font-medium hover:text-accent transition-colors cursor-pointer ${textColorClass}`}
              >
                <Phone size={14} className="text-accent" aria-hidden="true" />
                <span>+213 41 29 47 63</span>
              </a>

              <button
                id="nav-cta-visit-btn"
                onClick={onRequestVisit}
                className="relative overflow-hidden px-6 py-3 gold-gradient text-white text-xs tracking-[0.15em] uppercase font-semibold rounded-none hover:opacity-95 hover:shadow-lg transition-all duration-300 shadow-md flex items-center gap-2 group cursor-pointer border border-white/20"
              >
                <span>Demander une visite</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex lg:hidden items-center gap-3">
              <button
                id="mobile-nav-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu-panel"
                className={`p-2 rounded-none border border-slate-100 transition-colors cursor-pointer ${
                  isHeroPage && !isScrolled ? "text-white border-white/10 hover:bg-white/5" : "text-primary hover:bg-slate-50"
                }`}
              >
                {mobileMenuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu-panel"
            className="fixed inset-y-0 right-0 w-full max-w-[320px] bg-slate-950 text-white z-50 p-6 flex flex-col justify-between shadow-2xl border-l border-white/5"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
          >
            <div>
              {/* Header inside mobile menu */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <LogoMark className="w-8 h-8 text-accent shrink-0" />
                  <div>
                    <span className="block font-serif-luxury font-medium text-lg text-white tracking-[0.18em]">
                      TROPS IMMO
                    </span>
                    <span className="block text-[8px] uppercase tracking-[0.3em] font-medium text-accent">
                      Haute Couture Immobilier
                    </span>
                  </div>
                </div>
                <button
                  id="mobile-menu-close-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Fermer le menu"
                  className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-none border border-white/10 cursor-pointer"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              {/* Navigation list */}
              <div className="flex flex-col gap-5 py-4">
                {NAV_ITEMS.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <button
                      key={item.path}
                      id={`mobile-nav-link-${item.label}`}
                      onClick={() => handleNavClick(item.path)}
                      aria-current={isActive ? "page" : undefined}
                      className={`text-left py-2.5 text-sm uppercase tracking-[0.2em] font-medium border-b border-white/5 transition-all cursor-pointer ${
                        isActive ? "text-accent pl-2 border-accent/20" : "text-white/70 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom info inside mobile menu */}
            <div className="flex flex-col gap-4 pt-8 border-t border-white/5">
              <button
                id="mobile-nav-cta-visit-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRequestVisit();
                }}
                className="w-full py-3.5 gold-gradient text-white text-center text-xs tracking-widest uppercase font-semibold rounded-none hover:opacity-90 transition-all flex items-center justify-center gap-2 border border-white/10"
              >
                <span>Demander une visite</span>
                <ArrowRight size={14} aria-hidden="true" />
              </button>

              <div className="text-center text-white/40 text-[10px] tracking-wider uppercase">
                <p>Coordonnées communiquées sur demande</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
