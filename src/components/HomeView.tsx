import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PROJECTS_DATA } from "../data/projects";
import { paths, scrollToTop } from "../lib/paths";
import { motion, useInView } from "motion/react";
import { ArrowRight, Compass, Shield, Award, Key, MapPin, CheckCircle2 } from "lucide-react";
import Seo from "./Seo";

interface HomeViewProps {
  onRequestVisit: () => void;
}

export default function HomeView({ onRequestVisit }: HomeViewProps) {
  return (
    <div id="home-view-container" className="relative">
      <Seo
        title="Immobilier de Luxe en Algérie"
        description="TROPS IMMO conçoit des résidences d'exception en Algérie : architecture haute couture, matériaux nobles et services de conciergerie cinq étoiles."
        path={paths.home}
      />

      {/* 1. HERO SECTION */}
      <HeroSection />

      {/* 2. COMPANY INTRODUCTION */}
      <CompanyIntroSection />

      {/* 3. FEATURED PROJECTS */}
      <FeaturedProjectsSection />

      {/* 4. WHY CHOOSE US */}
      <WhyChooseUsSection />

      {/* 5. PREMIUM AMENITIES */}
      <PremiumAmenitiesSection />

      {/* 6. CONSTRUCTION QUALITY */}
      <ConstructionQualitySection />

      {/* 7. FINAL CALL TO ACTION */}
      <FinalCTASection onRequestVisit={onRequestVisit} />
    </div>
  );
}

// --- SUB-COMPONENTS ---

/* HERO SECTION */
function HeroSection() {
  const navigate = useNavigate();
  const project = PROJECTS_DATA[0];
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [
    {
      image: "/images/tower/exterior-dusk-full.jpg",
      title: "L'excellence au cœur de votre futur.",
      subtitle: project.name,
      desc: "Une tour R+15 avec attique, entre modernité et dynamisme.",
      unit: { label: "F3", area: "90 m²", beds: "2" },
    },
    {
      image: "/images/tower/exterior-aerial-signage.jpg",
      title: "Un art de vivre moderne.",
      subtitle: project.name,
      desc: "Finitions haute de gamme et sécurité 24h/24, signées Architecte K. ADDA.",
      unit: { label: "F4", area: "125 m²", beds: "3" },
    },
    {
      image: "/images/tower/exterior-facade-angle-1.jpg",
      title: "Vivez l'avenir à votre nouvelle adresse.",
      subtitle: project.name,
      desc: "Duplex en attique avec piscine privée et terrasses paysagées.",
      unit: { label: "Duplex", area: "238 m²", beds: "3" },
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div id="hero-slider-section" className="relative h-screen w-full bg-slate-950 overflow-hidden flex items-center justify-center text-white">
      {/* Background Images with Zoom & Crossfade */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Zoom effect on current slide */}
          <img
            src={slide.image}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
              index === currentSlide ? "scale-105" : "scale-100"
            }`}
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : undefined}
            decoding={index === 0 ? undefined : "async"}
          />
          {/* Luxury dark vignetting overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60" />
        </div>
      ))}

      {/* Hero Content Panel */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center select-none pt-12">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Subtle Project Label Tag */}
          <span className="text-xs uppercase tracking-[0.4em] text-accent font-semibold bg-white/5 border border-accent/20 px-4 py-2 rounded-none mb-6 backdrop-blur-sm">
            {heroSlides[currentSlide].subtitle}
          </span>

          {/* Majestic Main Heading */}
          <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-8xl font-light tracking-tight max-w-5xl leading-[1.1] mb-6 drop-shadow-md">
            {heroSlides[currentSlide].title}
          </h1>

          {/* Subtitle */}
          <p className="text-white/80 font-sans text-sm sm:text-lg tracking-wide max-w-2xl mb-12 font-light">
            {heroSlides[currentSlide].desc}
          </p>

          {/* Responsive Buttons Group */}
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <button
              id="hero-btn-explore"
              onClick={() => navigate(paths.projectDetails(project.id))}
              className="px-8 py-4 gold-gradient text-white border border-white/20 font-semibold text-xs tracking-widest uppercase rounded-none shadow-xl hover:opacity-95 hover:scale-[1.02] transition-all duration-300 flex items-center gap-2 group cursor-pointer"
            >
              <span>Explorer le domaine</span>
              <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" aria-hidden="true" />
            </button>

            <button
              id="hero-btn-all-projects"
              onClick={() => navigate(paths.projects)}
              className="px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs tracking-widest uppercase rounded-none border border-white/20 backdrop-blur-sm transition-all duration-300 cursor-pointer hover:scale-[1.02]"
            >
              Voir le Portefeuille
            </button>
          </div>
        </motion.div>
      </div>

      {/* Slider Indicators dot-nav */}
      <div className="absolute bottom-12 left-4 sm:left-8 lg:left-16 z-20 flex gap-2">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-[3px] rounded-none transition-all duration-500 cursor-pointer ${
              idx === currentSlide ? "w-8 bg-accent" : "w-3 bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* COMPANY INTRODUCTION */
function CompanyIntroSection() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref} 
      id="company-intro-section" 
      className="py-24 sm:py-36 bg-slate-950 text-white relative overflow-hidden"
    >
      {/* Subtle vertical line texture — visible but muted, never competing with the content */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(212,175,55,0.8) 0px, rgba(212,175,55,0.8) 1px, transparent 1px, transparent 46px)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Vertical Aspect Ratio High-Contrast Photo */}
          <div className="lg:col-span-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative overflow-hidden aspect-[3/4] w-full max-w-[360px] mx-auto rounded-none border border-white/10 shadow-2xl z-10"
            >
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
                alt="Sanctuaire résidentiel d'exception par TROPS IMMO"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 scale-102 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12] via-transparent to-transparent opacity-40" />
            </motion.div>
            
            {/* Elegant luxury background offset border */}
            <div className="absolute -bottom-4 -right-4 w-full h-full max-w-[360px] border border-white/5 pointer-events-none z-0 hidden lg:block" />
          </div>

          {/* Right Column: Asymmetric Editorial Storytelling Layout */}
          <div className="lg:col-span-8 flex flex-col justify-between h-full pt-4">
            
            {/* Massive Title Block matching user image */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9 }}
              className="mb-10"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#E2B755] block mb-4">NOTRE PHILOSOPHIE</span>
              <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tighter uppercase leading-[0.95]">
                PHILOSOPHIE & CONCEPT
              </h2>
            </motion.div>

            {/* Asymmetric Paragraph blocks mirroring the staggering look */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mt-4">
              
              {/* Left Paragraph - Primary objective */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.2 }}
                className="md:col-span-7 text-white/80 font-sans text-sm sm:text-base leading-relaxed font-light space-y-6"
              >
                <p>
                  Dans chaque domaine de notre collection, nous nous reposons sur une analyse approfondie des aspirations de notre clientèle d'élite, de leurs motivations et de leur vision d'un sanctuaire personnel. Cela nous permet de concevoir une architecture et des espaces de vie exclusifs qui combinent harmonie émotionnelle, esthétique intemporelle et sécurité absolue.
                </p>
                <p className="text-xs text-white/40 uppercase tracking-[0.2em] font-medium pt-2">
                  CONSTRUCTION RAFFINÉE • DÉCISION SPATIALE
                </p>
              </motion.div>

              {/* Right Paragraph - offset to the bottom right */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.4 }}
                className="md:col-span-5 md:mt-16 text-white/60 font-sans text-xs sm:text-sm leading-relaxed font-light border-l border-white/10 pl-6 space-y-6"
              >
                <p>
                  TROPS IMMO incarne une vision révolutionnaire de la promotion immobilière de luxe en Algérie. Notre objectif fondamental est de créer des chefs-d'œuvre résidentiels exclusifs qui ne se contentent pas de loger, mais d'inspirer — en bâtissant une confiance absolue, en affirmant un positionnement de premier plan et en guidant chaque propriétaire vers un art de vivre d'exception.
                </p>
                
                <div className="pt-4 flex items-center gap-4">
                  <button
                    id="intro-btn-about"
                    onClick={() => {
                      scrollToTop();
                      navigate(paths.about);
                    }}
                    className="text-[10px] uppercase tracking-widest font-bold text-[#E2B755] hover:text-white transition-colors duration-300 flex items-center gap-1 group animate-pulse"
                  >
                    <span>LIRE NOTRE HISTOIRE</span>
                    <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </button>
                </div>
              </motion.div>
            </div>

          </div>
        </div>

        {/* Bottom Line mimicking PROBLEM/SOLUTION and /02 anchor in user image */}
        <div className="mt-24 sm:mt-32 pt-6 border-t border-white/5 flex justify-between items-center text-[10px] uppercase tracking-[0.25em] text-white/30">
          <span>PORTFOLIO / PROJETS RÉCENTS</span>
          <span>/02</span>
        </div>
      </div>
    </section>
  );
}

/* FEATURED PROJECTS */
function FeaturedProjectsSection() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="featured-projects-section" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      {/* Decorative Gold Elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-none bg-accent/[0.01] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-accent block mb-3">Portefeuille Résidentiel</span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-primary font-medium tracking-tight">
              Domaines d'Exception à la Une
            </h2>
          </div>

          <button
            id="featured-btn-view-all"
            onClick={() => {
              scrollToTop();
              navigate(paths.projects);
            }}
            className="text-xs uppercase tracking-widest font-semibold border-b border-accent pb-2 text-accent hover:text-primary hover:border-primary transition-all flex items-center gap-2 group"
          >
            <span>Voir tous les projets</span>
            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" aria-hidden="true" />
          </button>
        </div>

        {/* Projects Grid */}
        <div className={`grid grid-cols-1 gap-8 ${PROJECTS_DATA.length > 1 ? "lg:grid-cols-3" : "max-w-md mx-auto"}`}>
          {PROJECTS_DATA.map((project, idx) => {
            const mapStatusToFrench = (status: "Pre-Launch" | "Under Construction" | "Completed") => {
              switch (status) {
                case "Pre-Launch":
                  return "Avant-première";
                case "Under Construction":
                  return "En cours de construction";
                case "Completed":
                  return "Livré";
                default:
                  return status;
              }
            };

            const frenchStatus = mapStatusToFrench(project.status);

            // Map status color badges
            const badgeColors = {
              "Avant-première": "bg-accent/10 text-accent border-accent/20",
              "En cours de construction": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
              "Livré": "bg-slate-100 text-slate-700 border-slate-200",
            }[frenchStatus] || "bg-slate-100 text-slate-700 border-slate-200";

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="group flex flex-col glass border border-white/60 rounded-none overflow-hidden shadow-2xl hover:shadow-2xl transition-all duration-300"
              >
                {/* Visual Area */}
                <div className="relative overflow-hidden aspect-[4/3] w-full">
                  <img
                    src={project.coverImage}
                    alt={project.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Status Badge */}
                  <span className={`absolute top-4 left-4 text-[9px] uppercase tracking-widest font-bold border px-3 py-1.5 rounded-none backdrop-blur-sm z-10 ${badgeColors}`}>
                    {frenchStatus}
                  </span>
                </div>

                {/* Content Area */}
                <div className="p-8 flex flex-col flex-grow justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 text-slate-400 text-xs uppercase tracking-wider mb-2">
                      <MapPin size={12} className="text-accent" />
                      <span>{project.location.split(",")[1] || project.location}</span>
                    </div>

                    <h3 className="font-serif-luxury text-xl sm:text-2xl font-medium text-primary mb-3">
                      {project.name}
                    </h3>
                    
                    <p className="text-slate-500 text-sm font-sans leading-relaxed line-clamp-3 font-light">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Explore button */}
                  <button
                    id={`featured-card-btn-${project.id}`}
                    onClick={() => {
                      scrollToTop();
                      navigate(paths.projectDetails(project.id));
                    }}
                    className="w-full py-4 bg-white hover:bg-slate-950 text-slate-800 hover:text-white border border-slate-200 hover:border-slate-950 rounded-none text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer hover:scale-[1.01]"
                  >
                    <span>Explorer le domaine</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* WHY CHOOSE US */
function WhyChooseUsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const reasons = [
    {
      icon: <Compass className="text-accent" size={24} />,
      title: "Pureté Architecturale d'Avant-Garde",
      desc: "Nos conceptions structurelles reposent sur du verre sans cadre à très grande portée, des volumes double hauteur et de magnifiques formes en porte-à-faux qui s'ancrent harmonieusement dans les géographies locales.",
    },
    {
      icon: <Award className="text-accent" size={24} />,
      title: "Matériaux Prestigieux et Contrastés",
      desc: "Nous importons exclusivement des marbres de qualité supérieure, des systèmes de vitrage acoustique haute densité et de la pierre de travertin brut. Nous ne nous contentons jamais de finitions standards.",
    },
    {
      icon: <Shield className="text-accent" size={24} />,
      title: "Stabilité d'Investissement & Valeur Premium",
      desc: "En conçoivent des propriétés d'exception dans les meilleurs secteurs diplomatiques et maritimes, nous garantissons des plus-values constantes et des rendements locatifs d'élite pour les acheteurs exigeants.",
    },
    {
      icon: <Key className="text-accent" size={24} />,
      title: "Gestion Résidentielle Cinq Étoiles",
      desc: "Chaque bâtiment TROPS IMMO fonctionne comme un hôtel cinq étoiles avec une conciergerie dédiée 24h/24 et 7j/7, un accès à un club privé, des caves à cigares et à vin, et des réseaux intelligents d'énergie propre.",
    },
  ];

  return (
    <section ref={ref} id="why-choose-us-section" className="py-24 sm:py-32 bg-slate-950 text-white relative overflow-hidden">
      {/* Background visual glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-none bg-accent/[0.02] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-accent block mb-3">Distinction & Excellence</span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-medium tracking-tight mb-6">
            Les Piliers de TROPS IMMO
          </h2>
          <p className="text-white/60 font-sans text-sm sm:text-base leading-relaxed">
            Notre réputation repose sur l'intégrité architecturale, une précision de construction sans compromis et des actifs financiers sécurisés pour une clientèle internationale d'élite.
          </p>
        </div>

        {/* Grid of items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {reasons.map((r, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="flex gap-6 p-10 sm:p-12 rounded-none bg-white/[0.02] border border-white/5 hover:border-accent/25 transition-all duration-300"
            >
              <div className="p-3 bg-white/5 border border-white/10 rounded-none flex-shrink-0 h-12 w-12 flex items-center justify-center">
                {r.icon}
              </div>
              <div>
                <h3 className="font-serif-luxury text-lg text-white font-medium mb-3">
                  {r.title}
                </h3>
                <p className="text-white/50 text-sm font-sans leading-relaxed">
                  {r.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* PREMIUM AMENITIES */
function PremiumAmenitiesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const amenities = [
    {
      label: "Piscine & Solarium Paysager",
      desc: "Bassin extérieur chauffé entouré d'un solarium en bois et d'espaces verts, pensé pour la détente en famille toute l'année.",
      img: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600&q=80",
    },
    {
      label: "Domotique & Accès Intelligent",
      desc: "Serrures connectées, contrôle d'accès à distance et gestion intelligente de votre logement depuis votre smartphone.",
      img: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80",
    },
    {
      label: "Vidéosurveillance & Gardiennage 24h/24",
      desc: "Caméras HD sur l'ensemble de la résidence, gardiennage permanent et contrôle d'accès pour la tranquillité des familles.",
      img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80",
    },
    {
      label: "Parking Souterrain & Groupe Électrogène",
      desc: "Places de stationnement sécurisées en sous-sol et groupe électrogène de secours garantissant l'alimentation continue de la résidence.",
      img: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <section ref={ref} id="premium-amenities-section" className="py-24 sm:py-32 bg-bg-light relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-accent block mb-3">Privilège Résidentiel</span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-primary font-medium tracking-tight mb-6">
            Le Confort au Quotidien, Sans Compromis
          </h2>
          <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed">
            Nos résidences intègrent des équipements pensés pour le mode de vie algérien : sécurité renforcée, continuité de service et espaces de bien-être au sein même de votre immeuble.
          </p>
        </div>

        {/* Bento/Aesthetic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {amenities.map((amenity, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="group relative rounded-none overflow-hidden aspect-2/3 shadow-xl bg-slate-900 border border-white/10 flex flex-col justify-end"
            >
              {/* Back Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src={amenity.img}
                  alt={amenity.label}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-750 scale-100 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/10" />
              </div>

              {/* Front Text */}
              <div className="relative z-10 p-6 flex flex-col gap-2">
                <h3 className="font-serif-luxury text-lg text-white font-semibold">
                  {amenity.label}
                </h3>
                <p className="text-white/60 text-xs font-sans leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-300 max-h-0 group-hover:max-h-20 overflow-hidden">
                  {amenity.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* CONSTRUCTION QUALITY */
function ConstructionQualitySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const standards = [
    { title: "Marbres de Calacatta & de Volakas", desc: "Sélectionnés à la main dans les carrières italiennes et grecques pour un alignement parfait des veines." },
    { title: "Systèmes Acoustiques Triple Vitrage", desc: "Fenêtres sans cadre sur mesure bloquant jusqu'à 45 dB de bruit extérieur." },
    { title: "Structure en Béton BFUP", desc: "Béton armé ultra-haute performance supportant de longues portées panoramiques suspendues." },
    { title: "Infrastructure Biométrique Intelligente", desc: "Serveurs domotiques résidentiels Loxone protégeant la vie privée et optimisant l'énergie." },
  ];

  return (
    <section ref={ref} id="construction-quality-section" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Text Info */}
          <div className="lg:col-span-6">
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-accent block mb-3">Rigueur d'Ingénierie</span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-primary font-medium tracking-tight mb-8">
              Matériaux Nobles, Infrastructures Irréprochables
            </h2>
            <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed mb-10">
              TROPS IMMO définit la référence absolue en matière de précision de construction. Nous pensons que le vrai luxe réside sous la surface visible. Nous effectuons des analyses de structure par ultrasons à plusieurs niveaux, utilisons des matériaux certifiés écologiques et isolons nos sols avec un double rembourrage acoustique.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {standards.map((std, idx) => (
                <div key={idx} className="flex gap-3">
                  <CheckCircle2 className="text-accent flex-shrink-0 mt-1" size={18} />
                  <div>
                    <h3 className="font-serif-luxury text-sm font-semibold text-primary mb-1">{std.title}</h3>
                    <p className="text-xs text-slate-500">{std.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Column */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1 }}
              className="relative aspect-video rounded-none overflow-hidden shadow-2xl z-10"
            >
              <img
                src="https://images.unsplash.com/photo-1701567805369-658b3dbb0e73?auto=format&fit=crop&w=1000&q=80"
                alt="Ouvriers sur le chantier de construction de la tour TROPS IMMO"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/10" />
            </motion.div>
            <div className="absolute -top-6 -left-6 w-full h-full border border-accent/10 rounded-none pointer-events-none z-0 hidden sm:block" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* FINAL CALL TO ACTION */
function FinalCTASection({ onRequestVisit }: { onRequestVisit: () => void }) {
  const navigate = useNavigate();

  return (
    <section id="homepage-cta-section" className="py-24 sm:py-32 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Image of spectacular architecture with deep overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover opacity-20 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950" />
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <span className="text-xs uppercase tracking-[0.4em] text-accent font-bold block mb-4">Sécurisez Votre Patrimoine</span>
        <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white mb-8 leading-tight">
          Commencez Votre Voyage Vers Le Luxe Absolu
        </h2>
        <p className="text-white/60 font-sans text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-12">
          Contactez notre bureau de conseil privé pour recevoir des plans exclusifs, des brochures et des invitations privées pour nos projets en cours et en pré-lancement.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <button
            id="cta-btn-schedule"
            onClick={onRequestVisit}
            className="w-full sm:w-auto px-8 py-4 gold-gradient text-white border border-white/20 font-semibold text-xs tracking-widest uppercase rounded-none shadow-xl hover:opacity-95 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Demander une visite privée</span>
            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" aria-hidden="true" />
          </button>

          <button
            id="cta-btn-advisor"
            onClick={() => {
              scrollToTop();
              navigate(paths.contact());
            }}
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs tracking-widest uppercase rounded-none border border-white/20 backdrop-blur-sm transition-all duration-300 cursor-pointer hover:scale-[1.02]"
          >
            Parler à un conseiller privé
          </button>
        </div>
      </div>
    </section>
  );
}
