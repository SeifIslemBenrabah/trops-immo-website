import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { PROJECTS_DATA } from "../data/projects";
import { paths, scrollToTop } from "../lib/paths";
import { motion, useInView } from "motion/react";
import { MapPin, Check, ChevronRight, ArrowLeft } from "lucide-react";
import Seo from "./Seo";

interface ProjectDetailsViewProps {
  onRequestVisit: () => void;
}

export default function ProjectDetailsView({ onRequestVisit }: ProjectDetailsViewProps) {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const project = PROJECTS_DATA.find((p) => p.id === projectId);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    // Reset active image and scroll to top whenever the viewed project changes
    setActiveImageIdx(0);
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project) {
    return <Navigate to={paths.projects} replace />;
  }

  const translateStatus = (status: "Pre-Launch" | "Under Construction" | "Completed") => {
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

  const handleNavigateToApartment = (apartmentId: string) => {
    navigate(paths.apartmentDetails(project.id, apartmentId));
  };

  return (
    <div id="project-details-container" className="bg-gradient-to-b from-[#FAFAFA] to-[#F6F6F4] min-h-screen relative pb-32">
      <Seo
        title={project.name}
        description={project.shortDescription}
        path={paths.projectDetails(project.id)}
        image={project.coverImage}
      />
      {/* Dynamic Header Hero with Back Button */}
      <div className="relative h-[70vh] w-full bg-slate-950 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 scale-105 transition-transform duration-[10000ms] ease-out"
          style={{ backgroundImage: `url(${project.coverImage})` }}
          role="img"
          aria-label={project.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-[#0D1117]/40 to-slate-950/60" />

        {/* Floating Back Action */}
        <div className="absolute top-28 left-4 sm:left-8 lg:left-16 z-30">
          <button
            id="project-details-back-btn"
            onClick={() => navigate(paths.projects)}
            className="flex items-center gap-2 px-6 py-3 bg-slate-950/70 hover:bg-slate-950 text-white border border-white/20 rounded-none text-xs font-semibold uppercase tracking-widest backdrop-blur-md cursor-pointer transition-all hover:scale-105 hover:shadow-xl"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            <span>Portefeuille</span>
          </button>
        </div>

        {/* Project Meta Title Panel */}
        <div className="absolute bottom-16 left-4 sm:left-8 lg:left-16 z-20 max-w-4xl text-white">
          <span className="text-xs uppercase tracking-[0.3em] text-accent font-bold mb-4 block">
            Chef-d'œuvre Résidentiel
          </span>
          <h1 className="font-serif-luxury text-5xl sm:text-7xl font-extralight tracking-tight leading-tight mb-6">
            {project.name}
          </h1>
          <div className="flex items-center gap-2.5 text-white/80 text-xs sm:text-sm tracking-widest uppercase">
            <MapPin size={14} className="text-accent" />
            <span>{project.location}</span>
          </div>
        </div>
      </div>

      {/* Grid Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* LEFT COLUMN: Narrative & Details (8 columns) */}
        <div className="lg:col-span-8 flex flex-col gap-24">
          
          {/* Section 1: Presentation Narrative */}
          <div id="project-presentation-block">
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-light text-primary mb-8 pb-4 border-b border-slate-200/60 tracking-tight">
              La Vision & Présentation
            </h2>
            <p className="text-slate-600 font-sans text-base sm:text-lg leading-relaxed mb-8 max-w-3xl font-light">
              {project.description}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 glass p-8 rounded-none border border-white/60 shadow-xl mt-12">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold block mb-2">État du projet</span>
                <span className="font-serif-luxury text-lg font-bold text-primary">{translateStatus(project.status)}</span>
              </div>
              <div className="border-t sm:border-t-0 sm:border-x border-slate-900/10 pt-4 sm:pt-0 sm:px-6">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold block mb-2">Avancement des travaux</span>
                <span className="font-serif-luxury text-lg font-bold text-accent">
                  {typeof project.progress === "number" ? `${project.progress}% Terminé` : "Communiqué sur demande"}
                </span>
              </div>
              <div className="pt-4 sm:pt-0">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold block mb-2">Promoteur</span>
                <span className="font-serif-luxury text-lg font-bold text-primary">TROPS IMMO</span>
              </div>
            </div>
          </div>

          {/* Section 2: Architecture */}
          <div id="project-architecture-block" className="grid grid-cols-1 sm:grid-cols-12 gap-10 items-center">
            <div className="sm:col-span-7">
              <span className="text-xs uppercase tracking-[0.25em] font-bold text-accent block mb-3">Design Spatial</span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-primary font-light mb-6 tracking-tight">Philosophie Architecturale</h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light max-w-2xl">
                {project.architectureText}
              </p>
            </div>
            <div className="sm:col-span-5">
              <div className="aspect-square rounded-none overflow-hidden shadow-2xl border border-white/80 group">
                <img
                  src={project.gallery[4] || project.coverImage}
                  alt={`Détails architecturaux de ${project.name}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[4000ms]"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Luxury Amenities Grid */}
          <div id="project-amenities-block" className="bg-gradient-to-br from-[#0D1117] to-[#171B22] text-white p-8 sm:p-12 rounded-none border border-white/10 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/[0.04] rounded-none blur-3xl pointer-events-none" />
            
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-accent block mb-3">Plan d'Exclusivité</span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl text-white font-light mb-8 tracking-tight">Équipements & Privilèges</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {project.amenitiesList.map((amenity, idx) => (
                <div key={idx} className="flex items-start gap-3.5 group">
                  <div className="p-1.5 bg-accent/10 border border-accent/20 rounded-none mt-0.5 group-hover:bg-accent/25 transition-colors">
                    <Check size={12} className="text-accent" />
                  </div>
                  <span className="text-sm text-white/80 font-sans leading-relaxed font-light">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Construction Timeline Progress (only when real milestone data exists) */}
          {project.progressTimeline && project.progressTimeline.length > 0 && (
            <div id="project-timeline-block">
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-light text-primary mb-10 pb-4 border-b border-slate-200/60 tracking-tight">
                Calendrier des Travaux
              </h2>

              {/* Custom Progress Bar */}
              {typeof project.progress === "number" && (
                <div className="mb-14">
                  <div className="flex justify-between text-xs uppercase tracking-[0.15em] font-bold font-sans mb-4 text-slate-400">
                    <span>Lancement du chantier</span>
                    <span className="text-accent font-semibold">{project.progress}% Terminé</span>
                    <span>Remise des clés</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-none overflow-hidden p-[1px]">
                    <div className="h-full bg-accent rounded-none transition-all duration-1000" style={{ width: `${project.progress}%` }} />
                  </div>
                </div>
              )}

              {/* Vertical Nodes */}
              <div className="relative pl-8 sm:pl-10 border-l border-slate-200/80 ml-4 flex flex-col gap-12">
                {project.progressTimeline.map((milestone, idx) => (
                  <div key={idx} className="relative group">
                    {/* Timeline bullet node */}
                    <div
                      className={`absolute -left-[41px] sm:-left-[49px] top-0 w-8 h-8 rounded-none border-2 flex items-center justify-center bg-white transition-all duration-300 ${
                        milestone.isCompleted
                          ? "border-emerald-500 text-emerald-500 shadow-md group-hover:scale-110"
                          : "border-slate-300 text-slate-400"
                      }`}
                    >
                      {milestone.isCompleted ? <Check size={14} className="stroke-[3]" /> : <span className="w-2 h-2 rounded-none bg-slate-300" />}
                    </div>

                    {/* Node content */}
                    <div>
                      <div className="flex flex-wrap items-center gap-3.5 mb-2">
                        <span className="text-xs uppercase tracking-widest font-bold text-accent">{milestone.date}</span>
                        {milestone.isCompleted ? (
                          <span className="text-[9px] uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1 rounded-none font-semibold">Terminé</span>
                        ) : (
                          <span className="text-[9px] uppercase tracking-widest bg-slate-50 text-slate-500 border border-slate-100 px-3 py-1 rounded-none font-semibold">En cours</span>
                        )}
                      </div>
                      <h4 className="font-serif-luxury text-xl text-primary font-medium mb-2 tracking-tight">{milestone.title}</h4>
                      <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-light max-w-2xl">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 5: Gallery Display */}
          <div id="project-gallery-block">
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-light text-primary mb-10 pb-4 border-b border-slate-200/60 tracking-tight">
              Galerie Narrative Visuelle
            </h2>

            {/* Large active photo frame */}
            <div className="relative aspect-video rounded-none overflow-hidden shadow-2xl bg-slate-100 mb-6 group border border-white/60">
              <img
                src={project.gallery[activeImageIdx]}
                alt={`${project.name} — vue ${activeImageIdx + 1} sur ${project.gallery.length}`}
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Micro thumbnail grid */}
            <div className="grid grid-cols-5 gap-4">
              {project.gallery.map((imgUrl, index) => (
                <button
                  key={index}
                  id={`gallery-thumb-${index}`}
                  onClick={() => setActiveImageIdx(index)}
                  aria-label={`Afficher la vue ${index + 1} de ${project.name}`}
                  aria-pressed={activeImageIdx === index}
                  className={`aspect-[4/3] rounded-none overflow-hidden border-2 transition-all cursor-pointer hover:shadow-lg ${
                    activeImageIdx === index ? "border-accent scale-95 shadow-md" : "border-transparent hover:border-slate-300"
                  }`}
                >
                  <img src={imgUrl} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Apartment Layouts Cards (4 columns) */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit flex flex-col gap-10">
          
          {/* Quick Contact Form CTA */}
          <div className="glass border border-white/60 rounded-none p-8 shadow-2xl">
            <h3 className="font-serif-luxury text-xl text-primary font-bold mb-3 tracking-tight">Ce projet vous intéresse ?</h3>
            <p className="text-slate-500 text-xs font-sans mb-8 leading-relaxed">
              Manifestez votre intérêt pour recevoir les plans privés, les packs de personnalisation d'intérieur et les tarifs préférentiels d'avant-première.
            </p>
            
            <button
              id="project-sidebar-visit-btn"
              onClick={onRequestVisit}
              className="w-full py-4 gold-gradient text-white font-semibold text-xs tracking-widest uppercase rounded-none shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 group cursor-pointer border border-white/20 hover:scale-[1.02] hover:shadow-xl duration-300"
            >
              <span>Demander la brochure & Visite</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Section: Apartment Types Header */}
          <div className="pt-2">
            <h3 className="font-serif-luxury text-2xl text-primary font-medium mb-1 tracking-tight">Résidences Disponibles</h3>
            <p className="text-slate-400 text-xs tracking-widest uppercase">Sélectionnez un modèle d'appartement ci-dessous :</p>
          </div>

          {/* Apartments List Grid */}
          <div className="flex flex-col gap-8">
            {project.apartments.map((apt) => (
              <div
                key={apt.id}
                className="group flex flex-col glass border border-white/40 rounded-none overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Micro cover image */}
                <div className="aspect-[21/9] overflow-hidden bg-slate-100 relative">
                  <img src={apt.images[0]} alt={apt.name} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <span className="absolute top-4 right-4 text-[9px] uppercase tracking-widest bg-[#0D1117] text-accent px-3 py-1 rounded font-bold border border-white/10">
                    {apt.type}
                  </span>
                </div>

                {/* Card Info details */}
                <div className="p-8 flex flex-col justify-between gap-6">
                  <div>
                    <h4 className="font-serif-luxury text-xl font-bold text-primary mb-1.5 tracking-tight group-hover:text-accent transition-colors">
                      {apt.name}
                    </h4>
                    <p className="text-accent text-xs font-bold tracking-widest uppercase mb-4">Superficie {apt.area}</p>
                    
                    <div className="flex gap-4 text-xs text-slate-500 border-t border-slate-900/10 pt-4 font-light">
                      <span><strong>{apt.bedrooms}</strong> Chambres</span>
                      <span className="text-slate-300">|</span>
                      <span><strong>{apt.bathrooms}</strong> Salles de bain</span>
                    </div>
                  </div>

                  <button
                    id={`apt-explore-btn-${apt.id}`}
                    onClick={() => handleNavigateToApartment(apt.id)}
                    className="w-full py-3 bg-white/60 hover:bg-slate-950 text-slate-800 hover:text-white border border-slate-200 hover:border-slate-950 rounded-none text-[10px] uppercase tracking-widest font-bold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer hover:shadow-md"
                  >
                    <span>Voir les détails du plan</span>
                    <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
