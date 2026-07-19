import { useState, useEffect, ReactNode, Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { paths } from "./lib/paths";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import IntroLoader from "./components/IntroLoader";
import ScrollProgressBar from "./components/ScrollProgressBar";
// HomeView is the landing route for most visits, so it stays in the main
// bundle; every other page is code-split and fetched on navigation.
import HomeView from "./components/HomeView";
const ProjectsView = lazy(() => import("./components/ProjectsView"));
const ProjectDetailsView = lazy(() => import("./components/ProjectDetailsView"));
const ApartmentDetailsView = lazy(() => import("./components/ApartmentDetailsView"));
const AboutView = lazy(() => import("./components/AboutView"));
const ContactView = lazy(() => import("./components/ContactView"));

// Animations & Icons
import { motion, AnimatePresence } from "motion/react";
import { FaWhatsapp } from "react-icons/fa";

export default function App() {
  const [introActive, setIntroActive] = useState(true);
  // Separate from introActive: the page mounts as soon as the intro starts
  // sliding away (not after it fully finishes) so there's real content
  // underneath the moment it starts moving, instead of a blank gap.
  const [contentReady, setContentReady] = useState(false);

  // Always lock scrolling during intro on mount
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Lock scrolling during intro
  }, []);

  const handleIntroExitStart = () => {
    setContentReady(true);
  };

  const handleIntroComplete = () => {
    setIntroActive(false);
    document.body.style.overflow = "unset"; // Restore scrolling
  };

  return (
    <div className="relative min-h-screen bg-[#FAFAFA] font-sans text-primary selection:bg-accent selection:text-primary">
      {contentReady && <AppShell />}

      {/* CINEMATIC INTRO LOADER */}
      <AnimatePresence>
        {introActive && (
          <IntroLoader onExitStart={handleIntroExitStart} onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>
    </div>
  );
}

function AppShell() {
  const navigate = useNavigate();
  // The dedicated visit-request form was removed — every "request a visit" CTA now
  // just opens the same general contact page as the plain "Contact" link.
  const requestVisit = () => navigate(paths.contact());

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollProgressBar />
      <Navbar onRequestVisit={requestVisit} />

      <main className="flex-grow">
        <AnimatedRoutes onRequestVisit={requestVisit} />
      </main>

      <Footer />

      <WhatsAppBubble />
    </div>
  );
}

/** Wraps each routed page in the same cross-fade transition the app used before routing existed. */
function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function RouteFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-light" aria-hidden="true">
      <div className="w-10 h-10 border-2 border-accent/25 border-t-accent rounded-full animate-spin" />
    </div>
  );
}

function AnimatedRoutes({ onRequestVisit }: { onRequestVisit: () => void }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<RouteFallback />}>
      <Routes location={location} key={location.pathname}>
        <Route
          path={paths.home}
          element={
            <PageTransition>
              <HomeView onRequestVisit={onRequestVisit} />
            </PageTransition>
          }
        />
        <Route
          path={paths.projects}
          element={
            <PageTransition>
              <ProjectsView />
            </PageTransition>
          }
        />
        <Route
          path="/projets/:projectId"
          element={
            <PageTransition>
              <ProjectDetailsView onRequestVisit={onRequestVisit} />
            </PageTransition>
          }
        />
        <Route
          path="/projets/:projectId/:apartmentId"
          element={
            <PageTransition>
              <ApartmentDetailsView onRequestVisit={onRequestVisit} />
            </PageTransition>
          }
        />
        <Route
          path={paths.about}
          element={
            <PageTransition>
              <AboutView />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <ContactView />
            </PageTransition>
          }
        />
        <Route path="*" element={<Navigate to={paths.home} replace />} />
      </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function WhatsAppBubble() {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-6 right-6 z-35 flex flex-col gap-3">
      <button
        id="whatsapp-floating-bubble"
        onClick={() => navigate(paths.contact())}
        className="p-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 group cursor-pointer border border-emerald-400"
        title="Parler à un conseiller privé"
        aria-label="Contacter un conseiller privé"
      >
        <FaWhatsapp size={24} aria-hidden="true" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 text-[10px] uppercase tracking-widest font-bold font-sans whitespace-nowrap pl-0 group-hover:pl-2">
          Conseiller Privé
        </span>
      </button>
    </div>
  );
}
