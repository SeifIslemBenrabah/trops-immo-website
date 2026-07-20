import { useState, useRef, FormEvent } from "react";
import { paths } from "../lib/paths";
import { motion, AnimatePresence } from "motion/react";
import { Phone, Mail, MapPin, Clock, CheckCircle2, Send, AlertCircle } from "lucide-react";
import Seo from "./Seo";

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;
const WEB3FORMS_TARGET_FRAME = "web3forms-hidden-frame";
// Web3Forms redirects the iframe to this URL only on a genuine success; on
// rejection it renders its own (cross-origin) error page instead. Once the
// iframe navigates back to our own origin, its contentWindow becomes
// readable again, which is how we tell success apart from failure below.
const WEB3FORMS_SUCCESS_MARKER = "wf_sent=1";

export default function ContactView() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const resultFrameRef = useRef<HTMLIFrameElement>(null);
  // Tracks whether the hidden iframe's next load event is a real submission
  // response, as opposed to its initial blank-page load on mount.
  const hasSubmittedRef = useRef(false);

  const [generalForm, setGeneralForm] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  // Submitting is a real <form action="..." target="..."> POST into the
  // hidden iframe below, not a fetch() call — Web3Forms doesn't return CORS
  // headers for every origin/plan combination, which silently blocks fetch.
  // Native form submissions aren't subject to CORS at all, so this works
  // unconditionally; the iframe keeps it from navigating the whole page away.
  const handleGeneralSubmit = (e: FormEvent) => {
    if (!WEB3FORMS_ACCESS_KEY) {
      e.preventDefault();
      console.error(
        "VITE_WEB3FORMS_ACCESS_KEY is not set — the contact form cannot send. See .env.example."
      );
      setSubmitError(true);
      return;
    }
    setSubmitError(false);
    setIsSubmitting(true);
    hasSubmittedRef.current = true;
  };

  const handleResultFrameLoad = () => {
    if (!hasSubmittedRef.current) return;
    hasSubmittedRef.current = false;
    setIsSubmitting(false);

    // Only a successful submission redirects the iframe back to our own
    // origin, which is the one case where contentWindow.location is
    // readable here — any Web3Forms-side rejection leaves the iframe on
    // their (cross-origin) response, throwing instead.
    try {
      const frameUrl = resultFrameRef.current?.contentWindow?.location.href;
      if (frameUrl && frameUrl.includes(WEB3FORMS_SUCCESS_MARKER)) {
        setSubmitSuccess(true);
        return;
      }
    } catch {
      // Still cross-origin — Web3Forms didn't redirect, treat as failure below
    }
    setSubmitError(true);
  };

  const resetForm = () => {
    setSubmitSuccess(false);
    setGeneralForm({
      fullName: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div id="contact-view-container" className="pt-28 pb-24 bg-bg-light relative overflow-hidden min-h-screen">
      <Seo
        title="Contacter notre bureau"
        description="Contactez TROPS IMMO pour toute demande d'information ou de visite. Notre cabinet privé vous répond sous deux heures."
        path={paths.contact()}
      />
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-none bg-accent/[0.015] blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] rounded-none bg-accent/[0.01] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-accent block mb-3">Canaux de Conseil</span>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl text-primary font-medium tracking-tight mb-6">
            Contacter notre bureau
          </h1>
          <p className="text-slate-600 font-sans text-sm sm:text-base leading-relaxed">
            Que vous souhaitiez planifier une visite physique, demander des plans d'architecte complets ou consulter un conseiller privé au sujet de nos lancements en avant-première, nous sommes à votre entière disposition.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">

          {/* LEFT COLUMN: Map & Office Details (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-10 h-full">

            {/* Office Info Card */}
            <div className="glass border border-white/40 rounded-none p-8 shadow-xl flex flex-col gap-6 h-full justify-between">
              <h3 className="font-serif-luxury text-xl text-primary font-semibold border-b border-slate-100 pb-1 uppercase tracking-wider">
                Le Siège Social
              </h3>

              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-accent/10 border border-accent/20 rounded-none text-accent mt-0.5 flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="font-serif-luxury text-sm font-bold text-primary mb-1">Adresse du Siège</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">Résidence TROPS IMMO, Haï Khmesti, Bir El Djir, Oran 31000, Algérie</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-accent/10 border border-accent/20 rounded-none text-accent mt-0.5 flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="font-serif-luxury text-sm font-bold text-primary mb-1">Registre Téléphonique</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">0770 40 30 03<br />0770 40 30 33</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-accent/10 border border-accent/20 rounded-none text-accent mt-0.5 flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="font-serif-luxury text-sm font-bold text-primary mb-1">E-mail</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">contact@tropsimmo.dz</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-accent/10 border border-accent/20 rounded-none text-accent mt-0.5 flex-shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="font-serif-luxury text-sm font-bold text-primary mb-1">Horaires</h4>
                    <p className="text-slate-600 text-sm">Dim – Jeu, 9h00 – 17h30</p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="aspect-6/3 border border-slate-200 overflow-hidden">
                <iframe
                  title="Localisation du siège TROPS IMMO"
                  src="https://www.google.com/maps?q=35.734989166259766,-0.5725911259651184&z=17&output=embed"
                  className="w-full h-full grayscale-[40%] contrast-[1.05]"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Form (7 Columns) */}
          <div className="lg:col-span-7 glass border border-white/40 rounded-none p-8 sm:px-12 sm:pt-12 shadow-2xl relative">
            
            <AnimatePresence mode="wait">
              {!submitSuccess ? (
                <motion.div
                  key="form-container"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Form Heading */}
                  <div className="border-b border-slate-200 pb-6 mb-8">
                    <span className="text-xs uppercase tracking-widest font-semibold text-primary">Demande générale</span>
                  </div>

                  {/* GENERAL CONTACT FORM — posts directly into a hidden iframe (see
                      handleGeneralSubmit for why this isn't a fetch() call) */}
                  <form
                    id="contact-general-form"
                    action="https://api.web3forms.com/submit"
                    method="POST"
                    target={WEB3FORMS_TARGET_FRAME}
                    onSubmit={handleGeneralSubmit}
                    className="flex flex-col gap-6"
                  >
                      <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY ?? ""} />
                      <input
                        type="hidden"
                        name="subject"
                        value={`TROPS IMMO — Demande générale : ${generalForm.subject}`}
                      />
                      <input type="hidden" name="from_name" value={generalForm.fullName} />
                      <input
                        type="hidden"
                        name="redirect"
                        value={`${window.location.origin}${paths.contact()}?${WEB3FORMS_SUCCESS_MARKER}`}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="general-fullname" className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Nom complet</label>
                          <input
                            id="general-fullname"
                            name="name"
                            type="text"
                            required
                            placeholder="ex. Dr Amina Ghezali"
                            value={generalForm.fullName}
                            onChange={(e) => setGeneralForm({ ...generalForm, fullName: e.target.value })}
                            className="px-4 py-3 bg-white/50 border border-slate-200/60 rounded-none text-sm focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="general-email" className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Adresse e-mail</label>
                          <input
                            id="general-email"
                            name="email"
                            type="email"
                            required
                            placeholder="ex. amina@ghezali.com"
                            value={generalForm.email}
                            onChange={(e) => setGeneralForm({ ...generalForm, email: e.target.value })}
                            className="px-4 py-3 bg-white/50 border border-slate-200/60 rounded-none text-sm focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="general-subject" className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Sujet</label>
                        <input
                          id="general-subject"
                          type="text"
                          required
                          placeholder="Quel est l'objet de votre demande ?"
                          value={generalForm.subject}
                          onChange={(e) => setGeneralForm({ ...generalForm, subject: e.target.value })}
                          className="px-4 py-3 bg-white/50 border border-slate-200/60 rounded-none text-sm focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="general-message" className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Message</label>
                        <textarea
                          id="general-message"
                          name="message"
                          rows={5}
                          required
                          placeholder="Les détails de votre message..."
                          value={generalForm.message}
                          onChange={(e) => setGeneralForm({ ...generalForm, message: e.target.value })}
                          className="px-4 py-3 bg-white/50 border border-slate-200/60 rounded-none text-sm focus:outline-none focus:border-accent focus:bg-white transition-all text-primary font-medium"
                        />
                      </div>

                      {submitError && (
                        <div
                          role="alert"
                          className="flex items-start gap-3 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-none"
                        >
                          <AlertCircle size={18} className="shrink-0 mt-0.5" aria-hidden="true" />
                          <span>
                            Une erreur est survenue lors de l'envoi de votre message. Merci de réessayer, ou de nous contacter directement par téléphone ou e-mail.
                          </span>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 gold-gradient text-white border border-white/20 rounded-none text-xs uppercase tracking-widest font-semibold shadow-md transition-all flex items-center justify-center mt-1 gap-2 group cursor-pointer disabled:opacity-50 hover:opacity-95"
                      >
                        {isSubmitting ? (
                          <span>Envoi en cours...</span>
                        ) : (
                          <>
                            <span>Envoyer le message</span>
                            <Send size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                          </>
                        )}
                      </button>
                  </form>

                  <iframe
                    ref={resultFrameRef}
                    name={WEB3FORMS_TARGET_FRAME}
                    title="Résultat de l'envoi du formulaire"
                    aria-hidden="true"
                    onLoad={handleResultFrameLoad}
                    style={{ display: "none" }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="success-container"
                  role="status"
                  className="flex flex-col items-center text-center py-12"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-16 h-16 bg-emerald-50 border border-emerald-150 rounded-none flex items-center justify-center text-emerald-500 mb-6 shadow-sm">
                    <CheckCircle2 size={32} className="stroke-[2]" aria-hidden="true" />
                  </div>
                  
                  <span className="text-xs uppercase tracking-[0.3em] text-accent font-bold block mb-2">Soumission Réussie</span>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl text-primary font-medium mb-4">
                    Votre demande a bien été reçue
                  </h3>
                  
                  <p className="text-slate-500 text-sm font-sans max-w-md mb-8 leading-relaxed">
                    Un conseiller privé de TROPS IMMO a été affecté à votre demande. Nous vous contacterons par e-mail ou par téléphone sous deux heures pour planifier les détails.
                  </p>

                  <button
                    onClick={resetForm}
                    className="px-6 py-3 gold-gradient text-white border border-white/20 text-xs uppercase tracking-widest font-semibold rounded-none transition-all cursor-pointer hover:opacity-95 shadow-md"
                  >
                    Retour au formulaire
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </div>
  );
}
