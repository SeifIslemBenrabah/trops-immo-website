import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import LogoMark from "./LogoMark";

interface IntroLoaderProps {
  onExitStart: () => void;
  onComplete: () => void;
}

export default function IntroLoader({ onExitStart, onComplete }: IntroLoaderProps) {
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Trigger completion sequence once the full reveal choreography has played out
    const timer = setTimeout(() => {
      setIsDone(true);
      // Mount the real page right as the slide-up starts, so it's already
      // painted underneath instead of a blank gap being revealed first.
      onExitStart();
      setTimeout(() => {
        onComplete();
      }, 900); // Wait for the AnimatePresence exit transition to complete
    }, 3500);

    return () => {
      clearTimeout(timer);
    };
  }, [onExitStart, onComplete]);

  const titleChars = "TROPS IMMO".split("");

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          id="intro-loader-container"
          className="fixed inset-0 bg-slate-950 z-[999] flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Premium Logo Container */}
          <div className="relative z-10 flex flex-col items-center text-center px-4">
            {/* Elegant Monogram */}
            <motion.div
              id="intro-monogram"
              className="mb-3 relative flex items-center justify-center w-36 h-36"
              initial={{ opacity: 0, scale: 1.2, filter: "blur(8px)" }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                transition: { duration: 1.3, ease: [0.16, 1, 0.3, 1] },
              }}
            >
              <LogoMark id="intro-logo-svg" className="relative w-24 h-24 text-accent" />
            </motion.div>

            {/* Brand Typography — letters reveal individually for a couture, hand-set feel */}
            <motion.h1
              id="intro-brand-name"
              className="font-serif-luxury text-3xl md:text-4xl text-accent tracking-[0.25em] font-light"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.045, delayChildren: 0.75 } },
              }}
            >
              {titleChars.map((char, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  variants={{
                    hidden: { opacity: 0, y: 16, filter: "blur(5px)" },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                >
                  {char === " " ? " " : char}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              className="text-white/40 uppercase tracking-[0.4em] text-[9px] md:text-[10px] mt-2 font-sans font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.9, delay: 1.65, ease: "easeOut" },
              }}
            >
              HAUTE COUTURE IMMOBILIÈRE
            </motion.p>

            {/* Aesthetic bottom divider line, drawing outward from the center */}
            <motion.div
              className="h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent w-48 mt-8"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 192, opacity: 1 }}
              transition={{ duration: 1.3, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
