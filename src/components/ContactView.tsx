import { useState, FormEvent } from "react";
import { paths } from "../lib/paths";
import { motion, AnimatePresence } from "motion/react";
import { Phone, Mail, MapPin, Clock, CheckCircle2, Send, AlertCircle } from "lucide-react";
import Seo from "./Seo";

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;

export default function ContactView() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [generalForm, setGeneralForm] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleGeneralSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(false);

    if (!WEB3FORMS_ACCESS_KEY) {
      console.error(
        "VITE_WEB3FORMS_ACCESS_KEY is not set — the contact form cannot send. See .env.example."
      );
      setIsSubmitting(false);
      setSubmitError(true);
      return;
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `TROPS IMMO — Demande générale : ${generalForm.subject}`,
          from_name: generalForm.fullName,
          name: generalForm.fullName,
          email: generalForm.email,
          message: generalForm.message,
        }),
      });
      const result = await res.json();
      if (result.success) {
        setSubmitSuccess(true);
      } else {
        setSubmitError(true);
      }
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
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
                    <p className="text-slate-600 text-sm leading-relaxed">Résidence Trops, Boulevard de la Soummam, Oran</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 bg-accent/10 border border-accent/20 rounded-none text-accent mt-0.5 flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h4 className="font-serif-luxury text-sm font-bold text-primary mb-1">Registre Téléphonique</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">+213 41 29 47 63</p>
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
                  src="https://www.google.com/maps?q=Boulevard+de+la+Soummam,+Oran,+Algérie&output=embed"
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

                  {/* GENERAL CONTACT FORM */}
                  <form id="contact-general-form" onSubmit={handleGeneralSubmit} className="flex flex-col gap-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="general-fullname" className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Nom complet</label>
                          <input
                            id="general-fullname"
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
