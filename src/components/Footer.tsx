import { useNavigate } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Linkedin, Instagram, Facebook, Youtube } from "lucide-react";
import { paths, scrollToTop } from "../lib/paths";
import { PROJECTS_DATA } from "../data/projects";
import LogoMark from "./LogoMark";

export default function Footer() {
  const navigate = useNavigate();
  const project = PROJECTS_DATA[0];

  const handleNavClick = (path: string) => {
    scrollToTop();
    navigate(path);
  };

  const handleApartmentClick = (apartmentId: string) => {
    scrollToTop();
    navigate(paths.apartmentDetails(project.id, apartmentId));
  };

  // Group apartments sharing the same base type (e.g. "F3 A" + "F3 B" -> "F3 A/B 90/101 M²")
  const apartmentGroups = (() => {
    const map = new Map<string, { letters: string[]; areas: string[]; ids: string[] }>();
    const order: string[] = [];

    project.apartments.forEach((apt) => {
      const match = apt.name.match(/^(.+?)\s([A-Z])$/);
      const base = match ? match[1] : apt.name;
      const letter = match ? match[2] : null;

      if (!map.has(base)) {
        map.set(base, { letters: [], areas: [], ids: [] });
        order.push(base);
      }
      const group = map.get(base)!;
      if (letter) group.letters.push(letter);
      group.areas.push(apt.area.replace(/\s*m²$/i, ""));
      group.ids.push(apt.id);
    });

    return order.map((base) => {
      const group = map.get(base)!;
      return { key: base, base, letters: group.letters, areas: group.areas, ids: group.ids };
    });
  })();

  return (
    <footer id="main-footer" className="bg-gradient-to-b from-[#0D1117] to-[#171B22] text-white pt-28 pb-12 border-t border-accent/20 relative overflow-hidden">
      {/* Decorative radial lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-none bg-accent/[0.02] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[300px] h-[300px] rounded-none bg-accent/[0.01] blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/5">
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 flex items-center justify-center">
                <LogoMark className="w-full h-full text-accent" />
              </div>
              <div>
                <span className="block font-serif-luxury font-medium text-lg text-white tracking-[0.18em]">
                  TROPS IMMO
                </span>
                <span className="block text-[8px] uppercase tracking-[0.3em] font-medium text-accent">
                  Haute Couture Immobilier
                </span>
              </div>
            </div>
            
            <p className="text-white/50 text-sm leading-relaxed font-sans font-light">
              Concevoir des chefs-d'œuvre vivants qui définissent des styles de vie exclusifs. TROPS IMMO est un promoteur immobilier aux standards internationaux, engagé envers la pureté architecturale, les matériaux haut de gamme et des services résidentiels inégalés.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-2">
              <a href="#linkedin" aria-label="TROPS IMMO sur LinkedIn" className="p-2 rounded-none bg-white/5 border border-white/10 hover:border-accent hover:bg-accent/10 text-white/70 hover:text-accent transition-all duration-300">
                <Linkedin size={16} aria-hidden="true" />
              </a>
              <a href="#instagram" aria-label="TROPS IMMO sur Instagram" className="p-2 rounded-none bg-white/5 border border-white/10 hover:border-accent hover:bg-accent/10 text-white/70 hover:text-accent transition-all duration-300">
                <Instagram size={16} aria-hidden="true" />
              </a>
              <a href="#facebook" aria-label="TROPS IMMO sur Facebook" className="p-2 rounded-none bg-white/5 border border-white/10 hover:border-accent hover:bg-accent/10 text-white/70 hover:text-accent transition-all duration-300">
                <Facebook size={16} aria-hidden="true" />
              </a>
              <a href="#youtube" aria-label="TROPS IMMO sur YouTube" className="p-2 rounded-none bg-white/5 border border-white/10 hover:border-accent hover:bg-accent/10 text-white/70 hover:text-accent transition-all duration-300">
                <Youtube size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Core Navigation */}
          <div>
            <h3 className="font-serif-luxury text-accent text-base tracking-wider font-medium mb-6 uppercase">
              Entreprise
            </h3>
            <ul className="flex flex-col gap-4 text-sm font-sans font-light text-white/60">
              <li>
                <button onClick={() => handleNavClick(paths.home)} className="hover:text-accent transition-colors text-left cursor-pointer">
                  Page d'accueil
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick(paths.projects)} className="hover:text-accent transition-colors text-left cursor-pointer">
                  Portefeuille Résidentiel
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick(paths.about)} className="hover:text-accent transition-colors text-left cursor-pointer">
                  Notre Héritage & Histoire
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick(paths.about)} className="hover:text-accent transition-colors text-left cursor-pointer">
                  Vision, Mission & Valeurs
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick(paths.contact())} className="hover:text-accent transition-colors text-left cursor-pointer">
                  Canaux de Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Projects Portfolio */}
          <div>
            <h3 className="font-serif-luxury text-accent text-base tracking-wider font-medium mb-6 uppercase">
              Plans Disponibles
            </h3>
            <ul className="flex flex-col gap-4 text-sm font-sans font-light text-white/60">
              {apartmentGroups.map((group) =>
                group.ids.length === 1 ? (
                  <li key={group.key}>
                    <button onClick={() => handleApartmentClick(group.ids[0])} className="hover:text-accent transition-colors text-left cursor-pointer flex items-center justify-between w-full">
                      <span>{group.base}</span>
                      <span className="text-[9px] uppercase tracking-widest bg-white/10 text-white/60 px-2 py-0.5 rounded font-medium font-sans">{group.areas[0]} m²</span>
                    </button>
                  </li>
                ) : (
                  <li key={group.key} className="flex items-center justify-between w-full">
                    <span>
                      {group.base}{" "}
                      {group.ids.map((id, i) => (
                        <span key={id}>
                          {i > 0 && "/"}
                          <button onClick={() => handleApartmentClick(id)} className="hover:text-accent transition-colors cursor-pointer">
                            {group.letters[i]}
                          </button>
                        </span>
                      ))}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest bg-white/10 text-white/60 px-2 py-0.5 rounded font-medium font-sans">{group.areas.join("/")} m²</span>
                  </li>
                )
              )}
              <li className="pt-2">
                <button onClick={() => handleNavClick(paths.contact())} className="text-accent hover:underline text-xs uppercase tracking-widest font-semibold flex items-center gap-1">
                  Planifier une visite privée →
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details & Hours */}
          <div className="flex flex-col gap-5">
            <h3 className="font-serif-luxury text-accent text-base tracking-wider font-medium uppercase mb-1">
              Bureau Principal
            </h3>

            <div className="flex items-start gap-3 text-sm text-white/70">
              <MapPin size={18} className="text-accent flex-shrink-0 mt-0.5" />
              <span>Résidence TROPS IMMO, Haï Khmesti, Bir El Djir, Oran 31000, Algérie</span>
            </div>

            <div className="flex items-center gap-3 text-sm text-white/70">
              <Phone size={18} className="text-accent flex-shrink-0" />
              <span>0770 40 30 03</span>
            </div>

            <div className="flex items-center gap-3 text-sm text-white/70">
              <Mail size={18} className="text-accent flex-shrink-0" />
              <span>contact@tropsimmo.dz</span>
            </div>

            <div className="flex items-start gap-3 text-sm text-white/70">
              <Clock size={18} className="text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Horaires</p>
                <p className="text-white/50 text-xs">Dim – Jeu, 9h00 – 17h30</p>
              </div>
            </div>

            <button
              onClick={() => handleNavClick(paths.contact())}
              className="mt-1 w-fit text-accent hover:underline text-xs uppercase tracking-widest font-semibold"
            >
              Nous contacter →
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40 uppercase tracking-widest font-sans font-medium text-center md:text-left">
          <p>
            © {new Date().getFullYear()} TROPS IMMO. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <span className="text-accent font-semibold tracking-wider">Haute Couture Immobilière</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
