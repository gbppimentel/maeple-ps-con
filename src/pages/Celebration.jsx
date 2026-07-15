import { useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Calendar, MapPin, Clock, Heart } from "lucide-react";
import MobileGate from "@/components/MobileGate";
import PlaylistSection from "@/components/PlaylistSection";
import { inviteContent } from "@/data/inviteContent";

export default function Celebration() {
  const { celebration, concert } = inviteContent;

  useEffect(() => {
    const duration = 4000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        startVelocity: 45,
        origin: { x: 0, y: 0.7 },
        colors: ["#CCFF00", "#FF6B9D", "#FFFFFF", "#9966FF"],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        startVelocity: 45,
        origin: { x: 1, y: 0.7 },
        colors: ["#CCFF00", "#FF6B9D", "#FFFFFF", "#9966FF"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();

    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.5 },
        colors: ["#CCFF00", "#FF6B9D", "#FFFFFF", "#9966FF"],
      });
    }, 300);
  }, []);

  return (
    <MobileGate>
      <div className="relative min-h-screen bg-[#050505] overflow-x-hidden flex items-center justify-center px-6 py-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#CCFF00]/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#FF6B9D]/10 rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10 max-w-md w-full text-center space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="font-heading font-extrabold text-3xl text-white text-glow leading-tight"
          >
            {celebration.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-white/60 text-base"
          >
            {celebration.subtext}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="glass rounded-3xl p-6"
          >
            <h3 className="font-heading font-bold text-white text-base mb-2">
              {celebration.confirmTitle}
            </h3>
            <p className="text-white/60 text-sm">{celebration.confirmText}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="glass rounded-3xl p-6"
          >
            <p className="text-white/60 text-sm mb-4 text-left">
              {celebration.playlistText}
            </p>
            <PlaylistSection />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="glass rounded-3xl p-6 text-left space-y-4"
          >
            <p className="text-center text-[#CCFF00] text-xs uppercase tracking-widest font-semibold mb-2">
              Concert Summary
            </p>
            <SummaryRow icon={Heart} label={concert.title} highlight />
            <SummaryRow icon={Calendar} label={concert.date} />
            <SummaryRow icon={MapPin} label={concert.venue} />
            <SummaryRow icon={Clock} label={concert.time} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-white/60 text-sm leading-relaxed pt-2"
          >
            {celebration.finalMessage}
          </motion.p>
        </div>
      </div>
    </MobileGate>
  );
}

function SummaryRow({ icon: Icon, label, highlight }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
        <Icon
          size={15}
          className={highlight ? "text-[#FF6B9D]" : "text-white/50"}
        />
      </div>
      <p
        className={`text-sm font-body ${
          highlight ? "text-white font-semibold" : "text-white/70"
        }`}
      >
        {label}
      </p>
    </div>
  );
}