import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div id="scroll-progress-bar" className="fixed top-0 left-0 right-0 h-[3px] bg-accent/20 z-50" aria-hidden="true">
      <motion.div className="h-full bg-accent origin-left" style={{ scaleX }} />
    </div>
  );
}
