import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "motion/react";
import { Award, Compass, Shield, Users, Landmark, Trees, ArrowRight } from "lucide-react";
import { paths, scrollToTop } from "../lib/paths";
import { PROJECTS_DATA } from "../data/projects";
import Seo from "./Seo";

export default function AboutView() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();
  const project = PROJECTS_DATA[0];

  const values = [
    {
      icon: <Compass className="text-accent" size={24} />,
      title: "Intégrité Architecturale",
      desc: "Nous travaillons exclusivement avec des visionnaires. Chaque ligne, courbe et matériau est audité pour garantir une beauté structurelle absolue et une pérennité physique.",
    },
    {
      icon: <Award className="text-accent" size={24} />,
      title: "Normes Sans Compromis",
      desc: "Des profilés de fenêtres à triple vitrage à l'alignement des veines du marbre de Calacatta, nous n'acceptons rien de moins que la perfection absolue.",
    },
    {
      icon: <Shield className="text-accent" size={24} />,
      title: "Confidentialité & Sécurité",
      desc: "Nos domaines sont construits comme des havres de paix sécurisés. Scanners biométriques à plusieurs niveaux, sécurité privée et réseaux autonomes offrent une tranquillité totale.",
    },
    {
      icon: <Users className="text-accent" size={24} />,
      title: "Patrimoine Générationnel",
      desc: "Nous bâtissons des propriétés conçues pour traverser les siècles, garantissant une valorisation constante du capital et la sécurité du patrimoine pour les générations d'acheteurs.",
    },
  ];

  return (
    <div id="about-view-container" className="pt-28 pb-24 bg-bg-light relative overflow-hidden">
      <Seo
        title="Notre Héritage"
        description="TROPS IMMO incarne l'immobilier haute couture en Algérie : pureté architecturale, intégrité structurelle et finitions haute de gamme, signées Architecte K. ADDA."
        path={paths.about}
      />
      {/* Decorative vector background */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-none bg-accent/[0.01] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[400px] h-[400px] rounded-none bg-accent/[0.015] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section 1: Majestic Header */}
        <div id="about-header-section" className="max-w-3xl mb-20">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-accent block mb-3">Notre Héritage Institutionnel</span>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl text-primary font-medium tracking-tight mb-6">
            L'Art de l'Immobilier Haute Couture
          </h1>
          <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed">
            Fondé sur les valeurs de pureté spatiale et d'intégrité structurelle, TROPS IMMO s'est imposé comme le premier promoteur immobilier d'exception de projets résidentiels haute couture, au service d'un cercle restreint de collectionneurs locaux et internationaux.
          </p>
        </div>

        {/* Section 2: Story & History Layout */}
        <div id="about-story-section" className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32">
          {/* Photos collage */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] rounded-none overflow-hidden shadow-2xl relative bg-slate-100">
              <img
                src="/images/tower/exterior-facade-angle-2.jpg"
                alt={project.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/10" />
            </div>
            {/* Overlay fact badge */}
            <div className="absolute -bottom-6 -right-6 glass-dark text-white p-6 rounded-none border border-white/15 shadow-2xl hidden sm:block">
              <span className="font-serif-luxury text-4xl text-accent block font-medium">R+15</span>
              <span className="text-[10px] text-white/70 uppercase tracking-widest font-semibold mt-1 block">Étages avec Attique</span>
            </div>
          </div>

          {/* Core Philosophy text */}
          <div className="lg:col-span-7 flex flex-col justify-center gap-6 text-slate-600 font-sans text-sm sm:text-base leading-relaxed">
            <h2 className="font-serif-luxury text-2xl sm:text-3xl text-primary font-medium mb-4 pb-2 border-b border-slate-200">
              Notre Parcours & Philosophie
            </h2>
            <p>
              TROPS IMMO a été créé pour combler un vide dans le paysage architectural : la demande de bâtiments résidentiels correspondant aux normes du design international haut de gamme. Nous concevons un promoteur opérant à l'échelle d'une boutique — concentré sur un domaine emblématique à la fois plutôt que sur des volumes de masse.
            </p>
            <p>
              Notre philosophie, « L'Immobilier Haute Couture », se traduit directement par un art de vivre sur mesure. Nous engageons un dialogue approfondi avec nos propriétaires, offrant des modifications personnalisées de plans d'étage, la mise en relation avec des architectes d'intérieur de renom et l'approvisionnement direct de matériaux nobles. Nous ne considérons pas le processus de construction comme de l'ingénierie standard, mais comme la création d'une œuvre d'art.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              <div className="flex gap-3">
                <div className="p-2 bg-accent/10 border border-accent/20 rounded-none h-fit text-accent">
                  <Landmark size={18} />
                </div>
                <div>
                  <h4 className="font-serif-luxury text-sm font-semibold text-primary mb-1">Pureté Architecturale</h4>
                  <p className="text-xs text-slate-500">Chaque concept s'articule autour de volumes épurés et de vues panoramiques continues.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="p-2 bg-accent/10 border border-accent/20 rounded-none h-fit text-accent">
                  <Trees size={18} />
                </div>
                <div>
                  <h4 className="font-serif-luxury text-sm font-semibold text-primary mb-1">Éco-Harmonie</h4>
                  <p className="text-xs text-slate-500">Nous intégrons l'énergie solaire, la pierre thermique naturelle et des jardins botaniques suspendus.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Core Corporate Values */}
        <div ref={ref} id="about-values-section" className="mb-32">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-accent block mb-3 font-sans">Notre Credo</span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-primary font-medium tracking-tight mb-4">
              Valeurs Fondamentales de l'Entreprise
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Ces principes directeurs fondamentaux guident chaque croquis structurel, chaque contrat de construction et chaque remise de clés.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className="glass border border-white/60 rounded-none p-6 shadow-2xl hover:shadow-2xl transition-all"
              >
                <div className="p-3 bg-accent/10 border border-accent/20 rounded-none w-fit mb-6 text-accent">
                  {val.icon}
                </div>
                <h3 className="font-serif-luxury text-base font-bold text-primary mb-3">
                  {val.title}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm font-sans leading-relaxed font-light">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 4: Current Project Spotlight */}
        <div id="about-project-section" className="mb-32">
          <div className="max-w-3xl mb-16">
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-accent block mb-3 font-sans">Notre Projet</span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-primary font-medium tracking-tight">
              {project.name}
            </h2>
          </div>

          <div className="group glass border border-white/60 rounded-none overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2">
            <div className="aspect-[16/10] lg:aspect-auto overflow-hidden bg-slate-100 relative">
              <img
                src={project.coverImage}
                alt={project.name}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-8 sm:p-12 flex flex-col justify-center gap-4">
              <span className="text-slate-400 text-[10px] uppercase tracking-widest block font-semibold">{project.location}</span>
              <p className="text-slate-600 text-sm sm:text-base font-sans leading-relaxed font-light">
                {project.shortDescription}
              </p>
              <button
                onClick={() => {
                  scrollToTop();
                  navigate(paths.projectDetails(project.id));
                }}
                className="mt-4 w-fit px-6 py-3 gold-gradient text-white text-xs uppercase tracking-widest font-semibold rounded-none shadow-md hover:opacity-95 transition-all flex items-center gap-2 group/btn cursor-pointer"
              >
                <span>Découvrir le projet</span>
                <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Section 5: Maître d'œuvre credit */}
        <div id="about-credit-section" className="bg-slate-950 text-white p-8 sm:p-16 rounded-none border border-white/5 relative overflow-hidden">
          {/* Radial visual backlight */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.04),transparent_50%)] pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-accent block mb-3">Conception & Maîtrise d'œuvre</span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-medium tracking-tight text-white mb-6 leading-tight">
              Architecte K. ADDA — AD PRO-BAT
            </h2>
            <p className="text-white/60 text-sm font-sans leading-relaxed">
              La conception architecturale de la résidence est signée par l'Architecte K. ADDA, avec AD PRO-BAT comme maître d'œuvre.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
