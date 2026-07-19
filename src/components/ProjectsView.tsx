import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PROJECTS_DATA } from "../data/projects";
import { paths, scrollToTop } from "../lib/paths";
import { motion, useInView } from "motion/react";
import { MapPin, ArrowRight, SlidersHorizontal } from "lucide-react";
import Seo from "./Seo";

type StatusFilter = "Tous" | "Avant-première" | "En cours de construction" | "Livré";

export default function ProjectsView() {
  const [filter, setFilter] = useState<StatusFilter>("Tous");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  const handleNavigateToProject = (projectId: string) => {
    scrollToTop();
    navigate(paths.projectDetails(projectId));
  };

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

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    if (filter === "Tous") return true;
    return mapStatusToFrench(project.status) === filter;
  });

  const filterOptions: StatusFilter[] = ["Tous", "Avant-première", "En cours de construction", "Livré"];

  return (
    <div id="projects-view-container" className="pt-28 pb-24 bg-bg-light relative overflow-hidden min-h-screen">
      <Seo
        title="Le Portefeuille de Référence"
        description="Découvrez les sanctuaires résidentiels d'exception de TROPS IMMO : intégrité spatiale absolue, emplacements de premier ordre et finitions inégalées."
        path={paths.projects}
      />
      {/* Decorative vector background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-none bg-accent/[0.015] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] rounded-none bg-accent/[0.01] blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-accent block mb-3">Héritage Résidentiel</span>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl text-primary font-medium tracking-tight mb-6">
            Le Portefeuille de Référence
          </h1>
          <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed">
            Découvrez nos sanctuaires d'exception. Chaque projet réalisé sous la signature TROPS IMMO incarne une intégrité spatiale absolue, une sécurité d'emplacement de premier ordre et des finitions d'une qualité inégalée.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider">
            <SlidersHorizontal size={14} className="text-accent" />
            <span>Filtrer par état de construction :</span>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                id={`filter-opt-${opt.toLowerCase().replace(" ", "-")}`}
                onClick={() => setFilter(opt)}
                className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-widest rounded-none border transition-all duration-300 cursor-pointer ${
                  filter === opt
                    ? "gold-gradient text-white border-white/20 shadow-md scale-[1.02]"
                    : "glass text-slate-600 border-slate-200/60 hover:border-slate-400"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Listing */}
        {filteredProjects.length > 0 ? (
          <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {filteredProjects.map((project, idx) => {
              const frenchStatus = mapStatusToFrench(project.status);
              const statusBadges = {
                "Avant-première": "bg-accent/15 text-accent border-accent/20",
                "En cours de construction": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
                "Livré": "bg-slate-100 text-slate-700 border-slate-200",
              }[frenchStatus] || "bg-slate-100 text-slate-700 border-slate-200";

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: idx * 0.15 }}
                  className="group flex flex-col glass border border-white/60 rounded-none overflow-hidden shadow-2xl hover:shadow-2xl transition-all duration-300"
                >
                  {/* Photo area */}
                  <div className="relative overflow-hidden aspect-[4/3] w-full bg-slate-100">
                    <img
                      src={project.coverImage}
                      alt={project.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-105"
                    />
                    
                    {/* Dark gradient shadow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Status Badge */}
                    <span className={`absolute top-4 left-4 text-[9px] uppercase tracking-widest font-bold border px-3 py-1.5 rounded-none backdrop-blur-sm z-10 ${statusBadges}`}>
                      {frenchStatus}
                    </span>
                  </div>

                  {/* Info area */}
                  <div className="p-8 flex flex-col flex-grow justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs uppercase tracking-wider mb-2 font-medium">
                        <MapPin size={12} className="text-accent" />
                        <span>{project.location}</span>
                      </div>

                      <h3 className="font-serif-luxury text-2xl font-medium text-primary mb-3">
                        {project.name}
                      </h3>
                      
                      <p className="text-slate-500 text-sm font-sans leading-relaxed line-clamp-3 font-light">
                        {project.shortDescription}
                      </p>
                    </div>

                    {/* Explore button */}
                    <button
                      id={`project-card-btn-${project.id}`}
                      onClick={() => handleNavigateToProject(project.id)}
                      className="w-full py-4 gold-gradient text-white border border-white/20 rounded-none text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer hover:scale-[1.02] hover:shadow-xl"
                    >
                      <span>Explorer le projet</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="py-24 text-center glass border border-white/60 rounded-none shadow-xl">
            <p className="text-slate-400 text-sm font-sans font-light">Aucun projet trouvé correspondant à l'état de construction sélectionné.</p>
          </div>
        )}
      </div>
    </div>
  );
}
