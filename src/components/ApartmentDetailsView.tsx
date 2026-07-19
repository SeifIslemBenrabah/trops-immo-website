import { useState, useEffect } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { PROJECTS_DATA } from "../data/projects";
import { paths } from "../lib/paths";
import { motion } from "motion/react";
import { ArrowLeft, ChevronRight, MessageSquare, Calendar, Compass, Sparkles, Check } from "lucide-react";
import Seo from "./Seo";

interface ApartmentDetailsViewProps {
  onRequestVisit: () => void;
}

export default function ApartmentDetailsView({ onRequestVisit }: ApartmentDetailsViewProps) {
  const { projectId, apartmentId } = useParams<{ projectId: string; apartmentId: string }>();
  const navigate = useNavigate();
  const project = PROJECTS_DATA.find((p) => p.id === projectId);
  const apartment = project?.apartments.find((a) => a.id === apartmentId);

  const [activeImgIdx, setActiveImgIdx] = useState(0);

  useEffect(() => {
    setActiveImgIdx(0);
    window.scrollTo(0, 0);
  }, [apartmentId]);

  if (!project || !apartment) {
    return <Navigate to={paths.projects} replace />;
  }

  const handleBackToProject = () => navigate(paths.projectDetails(project.id));

  return (
    <div id="apartment-details-container" className="pt-32 pb-32 bg-gradient-to-b from-[#FAFAFA] to-[#F6F6F4] relative overflow-hidden min-h-screen">
      <Seo
        title={`${apartment.name} — ${project.name}`}
        description={`${apartment.type} de ${apartment.area}, ${apartment.bedrooms} chambres, au sein de ${project.name}. ${apartment.priceRange}.`}
        path={paths.apartmentDetails(project.id, apartment.id)}
        image={apartment.images[0]}
      />
      {/* Visual background accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-none bg-accent/[0.015] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] rounded-none bg-accent/[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Breadcrumb Navigation / Back Button */}
        <nav aria-label="Fil d'Ariane" className="mb-10 flex flex-wrap items-center gap-2.5 text-xs uppercase tracking-[0.2em] font-bold text-slate-400">
          <button onClick={handleBackToProject} className="hover:text-primary transition-colors cursor-pointer flex items-center gap-1">
            <span>{project.name}</span>
          </button>
          <ChevronRight size={12} className="text-slate-300" aria-hidden="true" />
          <span className="text-accent" aria-current="page">{apartment.name}</span>
        </nav>

        {/* Back Action button */}
        <div className="mb-10">
          <button
            id="apt-back-btn"
            onClick={handleBackToProject}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary hover:text-accent transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            <span>Retour aux détails de {project.name}</span>
          </button>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* LEFT SIDE: Luxury Gallery & Floor Plan (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col gap-16">

            {/* Gallery area */}
            <div>
              <div className="relative aspect-[16/10] rounded-none overflow-hidden bg-slate-900 shadow-2xl border border-white/80 group mb-4">
                <img
                  src={apartment.images[activeImgIdx] || project.coverImage}
                  alt={`${apartment.name} — vue ${activeImgIdx + 1}`}
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-4">
                {apartment.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImgIdx(i)}
                    aria-label={`Afficher la vue ${i + 1} de ${apartment.name}`}
                    aria-pressed={activeImgIdx === i}
                    className={`w-24 aspect-[16/10] rounded-none overflow-hidden border-2 cursor-pointer transition-all ${
                      activeImgIdx === i ? "border-accent scale-95 shadow-md" : "border-transparent hover:border-slate-300"
                    }`}
                  >
                    <img src={img} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* ARCHITECTURAL FLOOR PLAN RENDER */}
            <div className="bg-gradient-to-br from-[#0D1117] to-[#171B22] text-white p-8 sm:p-12 rounded-none border border-white/10 relative overflow-hidden shadow-2xl">
              {/* Technical blueprint grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

              <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent block mb-1">Dessin Architectural</span>
                  <h3 className="font-serif-luxury text-2xl text-white font-light tracking-tight">Plan d'Aménagement sur Mesure</h3>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-none font-bold text-white/60">
                  <Compass size={12} className="text-accent" />
                  <span>{apartment.area}</span>
                </div>
              </div>

              {/* Floor plan render */}
              <div className="relative bg-slate-900/40 border border-accent/15 rounded-none p-3 sm:p-4 flex items-center justify-center overflow-hidden">
                <img
                  src={apartment.floorPlanImage}
                  alt={`Plan d'aménagement de l'appartement ${apartment.name} (${apartment.area})`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto max-h-140 object-contain rounded-none"
                />
              </div>

              <p className="text-white/40 text-center text-[10px] tracking-[0.15em] uppercase mt-8 font-mono">
                *Rendu d'aménagement à titre indicatif. Les matériaux et spécifications présentés sont soumis à modification contractuelle.
              </p>
            </div>

          </div>

          {/* RIGHT SIDE: Specs, Brochures, Forms (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            
            {/* Title & Area Card */}
            <div className="glass border border-white/60 rounded-none p-8 shadow-2xl">
              <span className="text-xs uppercase tracking-widest bg-[#0D1117] text-accent px-4 py-1.5 rounded-none font-bold inline-block mb-5 border border-white/10">
                Plan de type {apartment.type}
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-light text-primary mb-2 tracking-tight">
                {apartment.name}
              </h2>
              <p className="text-slate-400 text-xs uppercase tracking-[0.18em] mb-8 font-medium">Collection {project.name}</p>

              <div className="grid grid-cols-3 gap-4 py-6 border-y border-slate-900/10 mb-8">
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">Superficie</span>
                  <span className="font-serif-luxury text-lg font-bold text-primary block">{apartment.area}</span>
                </div>
                <div className="text-center border-x border-slate-900/10">
                  <span className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">Chambres</span>
                  <span className="font-serif-luxury text-lg font-bold text-primary block">{apartment.bedrooms}</span>
                </div>
                <div className="text-center">
                  <span className="block text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">Salles de bain</span>
                  <span className="font-serif-luxury text-lg font-bold text-primary block">{apartment.bathrooms}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-2 font-bold">Estimation Tarifaire</span>
                <span className="font-serif-luxury text-2xl font-bold text-accent">{apartment.priceRange}</span>
              </div>
            </div>

            {/* Premium Specifications and Features */}
            <div className="glass border border-white/60 rounded-none p-8 shadow-2xl flex flex-col gap-6">
              <h3 className="font-serif-luxury text-xl text-primary font-bold pb-3 border-b border-slate-900/10 flex items-center gap-2">
                <Sparkles size={16} className="text-accent" />
                <span>Équipements Intérieurs Sélectionnés</span>
              </h3>

              <div className="flex flex-col gap-4">
                {apartment.features.map((feat, index) => (
                  <div key={index} className="flex items-start gap-3.5">
                    <div className="p-1.5 bg-accent/10 border border-accent/20 rounded-none mt-0.5 flex-shrink-0">
                      <Check size={12} className="text-accent" />
                    </div>
                    <span className="text-sm text-slate-600 font-sans leading-relaxed font-light">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Brochure & Visit Action buttons */}
            <div className="flex flex-col gap-4">
              
              {/* Request Private Tour (Scrolls / Navigates to form) */}
              <button
                id="apt-details-cta-visit"
                onClick={onRequestVisit}
                className="w-full py-4 gold-gradient text-white border border-white/20 rounded-none text-xs uppercase tracking-widest font-semibold shadow-lg transition-all flex items-center justify-center gap-2 group cursor-pointer hover:scale-[1.02] hover:shadow-xl duration-300"
              >
                <Calendar size={16} />
                <span>Planifier une visite privée</span>
              </button>

              {/* Direct Consultation */}
              <button
                id="apt-details-cta-contact"
                onClick={() => navigate(paths.contact())}
                className="w-full py-4 bg-white/70 hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-none text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer hover:scale-[1.02]"
              >
                <MessageSquare size={16} className="text-emerald-500" aria-hidden="true" />
                <span>Être recontacté</span>
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
